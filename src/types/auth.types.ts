import type { Request } from 'express';

export interface AuthPayload {
  userId: string;
  // Add more fields if needed
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}