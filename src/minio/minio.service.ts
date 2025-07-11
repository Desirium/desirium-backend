import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private bucket = 'desirium';

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_HOST'),
      port: Number(this.configService.get<string>('MINIO_PORT')),
      useSSL: false,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });

    this.initializeBucket();
  }

  private async initializeBucket() {
    try {
      const exists = await this.minioClient.bucketExists(this.bucket);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucket);
        console.log(`Bucket ${this.bucket} created.`);
      }
    } catch (err) {
      console.error('Error initializing bucket:', err);
    }
  }

  getUploadMulter() {
    return multer({ storage: multer.memoryStorage() });
  }

  async uploadFile(file: Express.Multer.File, fileName?: string): Promise<any> {
    fileName = fileName || uuidv4();
    
    if (!file || typeof file !== 'object') {
      throw new Error('Invalid file');
    }

    return await this.minioClient.putObject(
      this.bucket,
      fileName,
      file.buffer,
      file.size
    );
  }

  async getFileUrl(etag: string): Promise<string> {
    return await this.minioClient.presignedUrl('GET', this.bucket, etag);
  }

  async getFile(bucket: string, fileName: string): Promise<any> {
    try {
      return await this.minioClient.getObject(bucket, fileName);
    } catch (err) {
      console.error('Error retrieving file:', err);
      throw new Error('File not found or other error occurred');
    }
  }

  getExtension(filename: string): string {
    return filename.split('.').pop();
  }
} 