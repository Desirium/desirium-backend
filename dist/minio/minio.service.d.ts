import { ConfigService } from '@nestjs/config';
import * as multer from 'multer';
export declare class MinioService {
    private configService;
    private minioClient;
    private bucket;
    constructor(configService: ConfigService);
    private initializeBucket;
    getUploadMulter(): multer.Multer;
    uploadFile(file: Express.Multer.File, fileName?: string): Promise<any>;
    getFileUrl(etag: string): Promise<string>;
    getFile(bucket: string, fileName: string): Promise<any>;
    getExtension(filename: string): string;
}
