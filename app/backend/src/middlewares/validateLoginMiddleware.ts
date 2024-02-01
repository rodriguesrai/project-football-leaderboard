import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: 'All fields must be filled' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Invalid email or password' });
  }

  if (password.length < 6) {
    return res
      .status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Invalid email or password' });
  }
  next();
}

export default validateLogin;
