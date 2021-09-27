import { Router, Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-unresolved
import LoginController from '@controllers/loginController';
import Passport from 'passport';
import { body } from 'express-validator';

const loginRouter: Router = Router();
const loginController: LoginController = new LoginController();

loginRouter.get('/login', loginController.loginPage);
loginRouter.post(
  '/login',
  Passport.authenticate('local', {
    failureRedirect: '/login?loginFailed=true',
    successRedirect: '/',
  }),
  (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) next(err);
  },
);

// TODO: Make logout a POST request
loginRouter.get('/logout', loginController.logout);

loginRouter.get('/register', loginController.registerPage);
loginRouter.post(
  '/register',
  body('username').not().isEmail().withMessage('Username must not be an email'),
  body('username').not().isEmpty().withMessage('Username must not be empty'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  loginController.registerPageValidation,
  loginController.onRegister,
);

export default loginRouter;
