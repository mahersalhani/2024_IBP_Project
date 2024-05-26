export interface UploadImages {
  files: Express.Multer.File[];
  path: string;
  quality?: number;
}
