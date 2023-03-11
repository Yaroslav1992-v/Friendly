import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
@Controller('file')
export class FileController {
  constructor(private readonly fileServive: FileService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.fileServive.saveFile(file);
  }
  @Post('deleteByUrls')
  async deleteImages(@Body('data') data: string[]) {
    return await this.fileServive.deleteImages(data);
  }

  @Delete('deleteByUrl/:url')
  async deleteImage(@Param('url') url: string) {
    console.log(url);
    return await this.fileServive.deleteImage(url);
  }
}
