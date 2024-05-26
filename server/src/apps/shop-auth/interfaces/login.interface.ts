import { User } from '@/database';
import { Response } from 'express';

export interface ILogin {
  user: User;
  res: Response;
}
