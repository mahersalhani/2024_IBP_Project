import { customAlphabet } from 'nanoid';

export const customNanoid = (size = 21) => {
  return customAlphabet('_~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', size)();
};

export const customLowerCaseNanoid = (size = 21) => {
  return customAlphabet('_~0123456789abcdefghijklmnopqrstuvwxyz', size)();
};

export const skuNanoid = (size = 10) => {
  return customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', size)();
};

export const numberNanoid = (size = 10) => {
  return customAlphabet('0123456789', size)();
};
