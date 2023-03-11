import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {
    v2.config({
      cloud_name: configService.get('CLOUD_NAME'),
      api_key: configService.get('CLOUD_KEY'),
      api_secret: configService.get('CLOUD_SECRET'),
    });
  }
  async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadOptions = {
      upload_preset: 'ksjzo3yu',
    };
    return 'dfs';
    // const result = await v2.uploader.upload(image.path, uploadOptions);
  }
  async deleteImage(url: string) {
    try {
      await v2.uploader.destroy(url);
      return {
        message: `Image with ID ${url} has been deleted from Cloudinary.`,
      };
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to delete image with ID ${url}.`);
    }
  }
  async deleteImages(urls: string[]) {
    try {
      const results = await Promise.all(
        urls.map(async (url) => {
          await v2.uploader.destroy(url);
          return `Image with ID ${url} has been deleted from Cloudinary.`;
        }),
      );
      return {
        message: results.join('\n'),
      };
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to delete images with IDs ${urls.join(', ')}.`);
    }
  }
  getImageIdFromUrl(url: string): string {
    const regex = /v\d+\/(.+)\.\w+/; // match the image ID between "v" and the file extension
    const match = url.match(regex);

    if (match) {
      return match[1]; // return the matched string (i.e. the image ID)
    } else {
      throw new Error(`Invalid Cloudinary URL: ${url}`);
    }
  }
}
