import session from 'express-session';
import { Application } from 'express';
import crypto from 'crypto';
import MongoStore from 'connect-mongo';
import Passport from 'passport';
import { Strategy } from 'passport-local';
import { ConnectMongoOptions } from 'connect-mongo/build/main/lib/MongoStore';
import { UserModel } from '@db/Models/UserModel';
import { IUser } from '@entities/User';
import { Schema, model, connect, ConnectOptions, Mongoose, ObjectId } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

function validPassword(password: string, hash: string, salt: string) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

export default function setAuth(app: Application) {
  const secret = process.env.SESSION_SECRET as string;

  const cmo = { mongoUrl: process.env.MONGODB_URL };

  const store = MongoStore.create(cmo);

  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: true,
      // cookie: { secure: true, httpOnly: true, sameSite: 'strict' },
      store,
    }),
  );

  Passport.use(
    new Strategy(function(username: string, password: string, cb) {
      UserModel.findOne({ name: username })
        .then((user: IUser | null) => {
          if (!user) {
            return cb(null, false);
          }

          // Function defined at bottom of app.js
          const isValid = validPassword(password, user.hash, user.salt);

          if (isValid) {
            return cb(null, user);
          }
          return cb(null, false);
        })
        .catch((err) => {
          cb(err);
        });
    }),
  );

  Passport.serializeUser<ObjectId>(function(user: any, cb: (err: any, id?: ObjectId) => void) {
    cb(null, user.id);
  });

  Passport.deserializeUser<ObjectId>(function(id: ObjectId, cb) {
    UserModel.findById(id, function(err: any, user: IUser): void {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });

  app.use(Passport.initialize());
  app.use(Passport.session());
}

export function ensureAuthentication(req: Request, res: Response, next: NextFunction) {

  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect("/login");
  }
}
