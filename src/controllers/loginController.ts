import { Request, Response, NextFunction } from 'express';
import { UserModel } from '@db/Models/UserModel';
import { genPassword } from './../middleware/Auth/authUtils';
import { validationResult } from 'express-validator';

export default class LoginController {


  public registerPageValidation(req: Request, res: Response, next: NextFunction){


    const errors = validationResult(req);
    if (!errors.isEmpty()){
      
      res.render('register.handlebars', { loginError: true, loginErrorMsg: errors.array()[0].msg });
    }
    else 
      next();
    
  }


  public async loginPage(req: Request, res: Response, next: NextFunction) {

    res.render('login.handlebars', { loginFailed: req.query.loginFailed });
  }

  public async registerPage(req: Request, res: Response, next: NextFunction) {


    res.render('register.handlebars');
  }



  public async onRegister(req: Request, res: Response, next: NextFunction) {

    const saltHash = genPassword(req.body.password);

    const newUser = new UserModel({
      name: req.body.username,
      hash: saltHash.hash,
      salt: saltHash.salt,
    });
    
    newUser.save();

    res.redirect('/login');
  }
}
