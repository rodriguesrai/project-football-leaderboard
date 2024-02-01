import { Response, Request, NextFunction } from 'express';
import verifyGenerateToken from '../utils/verifyGenerateToken';

interface AuthenticatedRequest extends Request {
  userId?: number;
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const decoded = await verifyGenerateToken.verify(token);
    if (!decoded.id) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { authMiddleware, AuthenticatedRequest };
