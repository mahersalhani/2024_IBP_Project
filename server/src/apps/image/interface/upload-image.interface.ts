export interface UploadImage {
  file: Express.Multer.File;
  path: string;

  width?: number;
  height?: number;
  quality?: number;
}
