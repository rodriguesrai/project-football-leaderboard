import { Request, Response } from 'express';
import LoginService from '../service/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export default class LoginController {
  private loginService = new LoginService();

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.loginService.login(email, password);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    const serviceResponse = await this.loginService.getUserRole(userId as number);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
