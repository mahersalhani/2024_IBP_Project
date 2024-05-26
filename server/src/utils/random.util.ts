import * as crypto from 'crypto';

export const randomString = (length = 4): string => {
  return crypto.randomBytes(length).toString('hex');
};
