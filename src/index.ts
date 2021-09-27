import 'module-alias/register';
import express, { Application, Request, Response, NextFunction } from 'express';
import ExpressHandlebars from 'express-handlebars';
import { IUser } from '@entities/User';
import path from 'path';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import { mongo, Mongoose } from 'mongoose';
import methodOverride from 'method-override';
import { connectToMongo } from './db/db';
import storyRouter from './routes/storyRoutes';
import loginRouter from './routes/loginRoutes';
import setAuth from './middleware/Auth/auth';

declare global {
  namespace Express {
    interface User extends IUser { }
  }
}

dotenv.config();

const connectionString: string = process.env.MONGODB_URL as string;

const connection = connectToMongo(connectionString);

connection.then((connection: Mongoose) => {
  // UserModel.find((err,users) => {
  //     const u: IUser = users[0];
  //     console.log(`mongoose gives ${u}`)
  // });

  // Boot express
  const app: Application = express();
  const port = process.env.PORT;

  setAuth(app);

  app.use(compression());
  app.use(helmet());

  app.use(methodOverride('_method'));

  // TODO: Intentar quitar el 'unsafe-inline'
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        'script-src': ["'self'", 'https://cdnjs.cloudflare.com/'],
        'style-src': [
          "'self'",
          'https://cdnjs.cloudflare.com/',
          'https://fonts.googleapis.com',
          "'unsafe-inline'", // de momento materialize no funciona sin el inline
        ],
      },
    }),
  );

  const engineOptions: ExpressHandlebars.ExphbsOptions = {
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    defaultLayout: 'index',
  };


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const viewsDir = path.join(__dirname, 'views');
  app.set('views', viewsDir);

  app.set('view engine', 'handlebars');
  app.engine('handlebars', ExpressHandlebars(engineOptions));

  app.use(express.static('public'));

  // Application routing
  // app.use('/', (req: Request, res: Response, next: NextFunction) => {
  //   res.status(200).send({ data: 'Hello from Ornio AS' });
  // });


  app.use('/', storyRouter);
  app.use('/', loginRouter);
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('<h1>Resource not found</h1>');
  });

  // app.get('/', (req, res) => {
  //   //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  //   res.render('main', {layout : 'index'});
  //   });

  // Start server
  app.listen(port, () => console.log(`Server is listening on port ${port}!`));
});
