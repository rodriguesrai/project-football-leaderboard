import { Router } from 'express';
import LoginController from '../controller/LoginController';
import validateLogin from '../middlewares/validateLoginMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const loginController = new LoginController();

const routerLogin = Router();

routerLogin.post(
  '/',
  validateLogin,
  (req, res) => loginController.login(req, res),
);
routerLogin.get(
  '/role',
  authMiddleware,
  (req, res) => loginController.getRole(req, res),
);

export default routerLogin;
