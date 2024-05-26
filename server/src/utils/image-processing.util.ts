// import * as sharp from 'sharp';
import * as sharp from 'sharp';
import { FitEnum } from 'sharp';

export const convertBase64ToBuffer = (base64: string) => {
  return Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
};

export const resizeImage = async (buffer: Buffer, width: number, height: number, fit: keyof FitEnum = 'fill') => {
  return await sharp(buffer).resize(width, height, { fit }).toBuffer();
};

export const addBackground = async (buffer: Buffer, hex: string) => {
  return await sharp(buffer).flatten({ background: hex }).toBuffer();
};

export const getImageMetadata = async (buffer: Buffer) => {
  return await sharp(buffer).metadata();
};

export const customBackground = async (hexColor: string, width: number, height: number) => {
  const imageData = Buffer.from(`
  <svg width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="${hexColor}" />
  </svg>`);

  const backgroundResized = await sharp(imageData)
    .resize({ width, height }) // Adjust the dimensions as needed
    .toBuffer();

  return backgroundResized;
};

export const changeImageQuality = async (buffer: Buffer, quality: number) => {
  return await sharp(buffer).webp({ quality }).toBuffer();
};
