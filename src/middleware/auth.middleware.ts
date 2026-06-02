import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest } from '../types/auth.types';

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    const token =
      authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as {
      userId: string;
    };

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
};