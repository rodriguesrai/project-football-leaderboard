import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/Token';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const sign = (payload: TokenPayload): string => jwt.sign(payload, secret, { expiresIn: '1d' });

const verify = (token: string): TokenPayload => jwt.verify(token, secret) as TokenPayload;

export default {
  sign,
  verify,
};
