import { Router } from 'express';
import LoginController from '../controller/LoginController';
import validateLogin from '../middlewares/validateLoginMiddleware';

const loginController = new LoginController();

const routerLogin = Router();

routerLogin.post(
  '/',
  validateLogin,
  (req, res) => loginController.login(req, res),
);

export default routerLogin;
