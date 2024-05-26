import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { TempImage } from '@/database';
import { OkRes } from '@/common';
import { S3Service } from '@/common/aws';
import { catchingError, resizeImage, changeImageQuality } from '@/utils';

import { UploadImage, UploadImages } from './interface';

@Injectable()
export class ImageService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly connection: DataSource,
  ) {}

  async uploadImage(data: UploadImage) {
    try {
      let file = data.file.buffer;

      if (data.width && data.height) file = await resizeImage(file, Number(data.width), Number(data.height));

      file = await changeImageQuality(file, Number(data.quality) || 70);

      const imageData = await this.s3Service.uploadBuffer(file, data.path, 'webp');

      const image = new TempImage({ key: imageData.key });
      await this.connection.manager.save(image);

      return {
        id: image.id,
        ...imageData,
      };
    } catch (error) {
      throw catchingError(error);
    }
  }

  async uploadImages(data: UploadImages) {
    const { files, path } = data;

    try {
      const imagesData = await this.s3Service.uploadFiles(files, path);

      const images = imagesData.map((image) => new TempImage({ key: image.key }));
      await this.connection.manager.save(images);

      return imagesData;
    } catch (error) {
      throw catchingError(error);
    }
  }

  async deleteImage(key: string) {
    try {
      await this.s3Service.deleteFile(key);

      const image = await this.connection.manager.findOne(TempImage, { where: { key } });
      if (image) await this.connection.manager.remove(image);

      return new OkRes('Image deleted successfully');
    } catch (error) {
      throw catchingError(error);
    }
  }

  async deleteImages(keys: string[]) {
    try {
      await this.s3Service.deleteFiles(keys);

      await this.connection
        .createQueryBuilder()
        .delete()
        .from(TempImage)
        .where('key IN (:...keys)', { keys })
        .execute();

      return new OkRes('Images deleted successfully');
    } catch (error) {
      throw catchingError(error);
    }
  }
}
