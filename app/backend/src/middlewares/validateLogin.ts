import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: 'All fields must be filled' });
  }
  next();
}

export default validateLogin;
