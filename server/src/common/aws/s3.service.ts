/* ---- nestjs ---- */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/* ---- uid ---- */
import { nanoid } from 'nanoid';
import { ulid } from 'ulid';

/* ---- aws-sdk v3 ---- */
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  DeleteObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
} from '@aws-sdk/client-s3';
import {
  CloudFrontClient,
  CreateInvalidationCommand,
  CreateInvalidationCommandInput,
} from '@aws-sdk/client-cloudfront';

/* ---- common ---- */
import { catchingError } from '@/utils';

@Injectable()
export class S3Service {
  private region: string;
  private bucket: string;
  private cloudfrontDistributionId: string;
  private cloudfrontDomainName: string;

  private s3: S3Client;
  private cloudfront: CloudFrontClient;

  constructor(private configService: ConfigService) {
    this.region = configService.get<string>('S3_REGION');
    this.bucket = configService.get<string>('S3_BUCKET');

    this.cloudfrontDistributionId = configService.get<string>('CLOUDFRONT_DISTRIBUTION_ID');
    this.cloudfrontDomainName = configService.get<string>('CLOUDFRONT_DOMAIN_NAME');

    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('SECRET_ACCESS_KEY'),
      },
    });

    this.cloudfront = new CloudFrontClient({
      credentials: {
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('SECRET_ACCESS_KEY'),
      },
      region: this.region,
    });
  }

  signUrl(key: string) {
    try {
      const url = `https://${this.cloudfrontDomainName}/${key}`;

      return { signedUrl: url, key };
    } catch (error) {
      throw catchingError(error);
    }
  }

  signUrls(keys: string[]) {
    try {
      return keys.map((key) => this.signUrl(key));
    } catch (error) {
      throw catchingError(error);
    }
  }

  async uploadFile(file: Express.Multer.File, path: string, name?: string) {
    // remove / from the beginning of the path
    path = path.replace(/^\//, '');

    let key: string;

    if (name) key = `${path}/${name}-${nanoid()}`;
    else key = `${path}/${nanoid()}`;

    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3.send(new PutObjectCommand(input));

      return {
        key,
        url: this.signUrl(key)?.signedUrl,
      };
    } catch (err) {
      throw catchingError(err);
    }
  }

  async uploadFileWithCustomKey(file: Express.Multer.File, key: string) {
    key = key.replace(/^\//, '');

    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3.send(new PutObjectCommand(input));

      return {
        key,
        url: this.signUrl(key)?.signedUrl,
      };
    } catch (err) {
      throw catchingError(err);
    }
  }

  // async uploadBuffer(buffer: Buffer, path: string, name?: string, contentType = 'png') {
  async uploadBuffer(buffer: Buffer, path: string, contentType = 'png') {
    path = path.replace(/^\//, '');

    const key = `${path}/${nanoid(5)}.${ulid()}.${contentType}`; // to avoid overwriting files with the same name

    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    };

    try {
      await this.s3.send(new PutObjectCommand(input));

      return {
        key,
        // name,
        url: this.signUrl(key)?.signedUrl,
      };
    } catch (err) {
      throw catchingError(err);
    }
  }

  async uploadBuffers(buffers: Buffer[], path: string, contentType = 'png') {
    try {
      const data = await Promise.all(buffers.map((buffer) => this.uploadBuffer(buffer, path, contentType)));

      return data;
    } catch (error) {
      throw catchingError(error);
    }
  }

  async uploadBufferWithCustomKey(buffer: Buffer, key: string, contentType = 'png') {
    // remove / from the beginning of the path
    key = key.replace(/^\//, '');

    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    };

    try {
      await this.s3.send(new PutObjectCommand(input));

      return {
        key,
        url: this.signUrl(key)?.signedUrl,
      };
    } catch (err) {
      throw catchingError(err);
    }
  }

  async uploadFiles(files: Express.Multer.File[], path: string) {
    try {
      const data = await Promise.all(files.map((file) => this.uploadFile(file, path)));

      return data;
    } catch (error) {
      throw catchingError(error);
    }
  }

  async deleteFile(key: string) {
    const deleteObjectParams: DeleteObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };

    try {
      // Delete image from s3
      await this.s3.send(new DeleteObjectCommand(deleteObjectParams));

      // Invalidate the cloudfront cache for the image
      const invalidationParams: CreateInvalidationCommandInput = {
        DistributionId: this.cloudfrontDistributionId,
        InvalidationBatch: {
          CallerReference: key,
          Paths: {
            Quantity: 1,
            Items: [`/${key}`],
          },
        },
      };

      await this.cloudfront.send(new CreateInvalidationCommand(invalidationParams));

      // Delete image from database
      // await this.connection.createQueryBuilder().delete().from('image').where('key = :key', { key }).execute();
      // await this.connection.createQueryBuilder(Image, 'images').delete().where('images.key = :key', { key }).execute();

      return 'success';
    } catch (err) {
      throw catchingError(err);
    }
  }

  async deleteFiles(keys: string[]) {
    try {
      const deleteObjectParams: DeleteObjectsCommandInput = {
        Bucket: this.bucket,
        Delete: {
          Objects: keys.filter((key) => key).map((key) => ({ Key: key })),
          Quiet: false,
        },
      };

      // Delete image from s3
      await this.s3.send(new DeleteObjectsCommand(deleteObjectParams));

      // Invalidate the cloudfront cache for the image
      const invalidationParams: CreateInvalidationCommandInput = {
        DistributionId: this.cloudfrontDistributionId,
        InvalidationBatch: {
          CallerReference: ulid(),
          Paths: {
            Quantity: keys.length,
            Items: keys.filter((key) => key).map((key) => `/${key}`),
          },
        },
      };

      await this.cloudfront.send(new CreateInvalidationCommand(invalidationParams));

      return 'success';
    } catch (error) {
      throw catchingError(error);
    }
  }

  async getFile(key: string) {
    try {
      const input: GetObjectCommandInput = {
        Bucket: this.bucket,
        Key: key,
      };

      const { Body } = await this.s3.send(new GetObjectCommand(input));

      const base64 = await Body?.transformToString('base64');

      const buffer = Buffer.from(base64, 'base64');

      return { buffer, key, base64: `data:image/png;base64,${base64}` };
    } catch (error) {
      throw catchingError(error);
    }
  }

  async getFiles(keys: string[]) {
    try {
      const data = await Promise.all(keys.map((key) => this.getFile(key)));

      return data;
    } catch (error) {
      throw catchingError(error);
    }
  }
}
