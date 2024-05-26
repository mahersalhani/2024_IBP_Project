import {
  Controller,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { BadRes, OkRes } from '@/common';

import { DeleteImageDto, DeleteImagesDto, UploadImageDto, UploadImagesDto } from './dto';
import { UploadImageRes } from './res';

import { ImageService } from './image.service';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Upload Image' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: UploadImageRes, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 500, type: BadRes, description: 'Error while uploading image' })
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }), // only image files
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 50,
            message(maxSize) {
              return `File size should be less than ${maxSize / 1024 / 1024}MB`;
            },
          }), // 5MB
        ],
      }),
    )
    image: Express.Multer.File,
    @Body() body: UploadImageDto,
  ) {
    return this.imageService.uploadImage({ file: image, ...body });
  }

  @Post('multiple')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiOperation({ summary: 'Upload Multiple Images' })
  @ApiResponse({ status: 201, type: [UploadImageRes], description: 'Images uploaded successfully' })
  @ApiResponse({ status: 500, type: BadRes, description: 'Error while uploading images' })
  async uploadImages(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }), // only image files
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message(maxSize) {
              return `File size should be less than ${maxSize / 1024 / 1024}MB`;
            },
          }), // 5MB
        ],
      }),
    )
    images: Express.Multer.File[],
    @Body() body: UploadImagesDto,
  ) {
    return this.imageService.uploadImages({ files: images, path: body.path, quality: body.quality });
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Image' })
  @ApiResponse({ status: 200, type: OkRes, description: 'Image deleted successfully' })
  @ApiResponse({ status: 500, type: BadRes, description: 'Error while deleting image' })
  async deleteImage(@Body() body: DeleteImageDto) {
    return this.imageService.deleteImage(body.key);
  }

  @Delete('multiple')
  @ApiOperation({ summary: 'Delete Multiple Images' })
  @ApiResponse({ status: 200, type: OkRes, description: 'Images deleted successfully' })
  @ApiResponse({ status: 500, type: BadRes, description: 'Error while deleting images' })
  async deleteImages(@Body() body: DeleteImagesDto) {
    return this.imageService.deleteImages(body.keys);
  }
}
