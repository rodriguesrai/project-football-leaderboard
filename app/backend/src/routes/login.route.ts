import { Router } from 'express';
import LoginController from '../controller/LoginController';
import validateLogin from '../middlewares/validateLogin';

const loginController = new LoginController();

const routerLogin = Router();

routerLogin.post(
  '/',
  validateLogin,
  (req, res) => loginController.login(req, res),
);

export default routerLogin;
