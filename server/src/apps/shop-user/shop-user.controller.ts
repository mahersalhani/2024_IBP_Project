import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BadRes, CurrentUser, OkRes, ShopJwtAuthGuard, ShopUserRes, ValidationErrorRes } from '@/common';

import { UpdateProfileDto } from './dto';
import { ShopUserService } from './shop-user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('ShopUser')
@Controller('shop-user')
export class ShopUserController {
  constructor(private readonly shopUserService: ShopUserService) {}

  @Put('update-profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShopJwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Profile updated', type: OkRes })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Wrong data', type: ValidationErrorRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: BadRes })
  async updateProfile(
    @UploadedFile(
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
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @CurrentUser() user: ShopUserRes,
    @Body() body: UpdateProfileDto,
  ) {
    return this.shopUserService.updateProfile(user, { ...body, avatar: image });
  }
}
