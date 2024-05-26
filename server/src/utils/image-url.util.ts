import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const addImageURL = (image: string): string => {
  const domain = configService.get('CLOUDFRONT_DOMAIN_NAME');

  return `https://${domain}/${image}`;
};

export const removeDomainFromSrc = (src: string): string => {
  // Extract domain from the URL
  const domainToRemove = src.match(/^https?:\/\/[^/]+/)[0];

  // Remove domain from the URL
  const imageUrlWithoutDomain = src.replace(domainToRemove, '');

  // Remove leading slash if present
  const imageUrlWithoutDomainTrimmed = imageUrlWithoutDomain.replace(/^\//, '');

  return imageUrlWithoutDomainTrimmed;
};

type ImageFormat = 'auto' | 'jpeg' | 'webp' | 'avif' | 'png' | 'svg' | 'gif';
interface ImageConfig {
  color?: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormat;
}
export const imageConfig = (image: string, config: ImageConfig): string => {
  const { color, width, height, quality, format } = config;

  // URLSearchParams
  const searchParams = new URLSearchParams();

  // Add color
  if (color) searchParams.append('color', color);

  // Add width
  if (width) searchParams.append('width', width.toString());

  // Add height
  if (height) searchParams.append('height', height.toString());

  // Add quality
  if (quality) searchParams.append('quality', quality.toString());

  // Add format
  if (format) searchParams.append('format', format);
  else searchParams.append('format', 'auto');

  // Add search params to the image URL
  const imageUrlWithConfig = `${image}?${searchParams.toString()}`;

  return imageUrlWithConfig;
};
