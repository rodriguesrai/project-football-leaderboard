import { Request, Response } from 'express';
import LoginService from '../service/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  private loginService = new LoginService();

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.loginService.login(email, password);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
