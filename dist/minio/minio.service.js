"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Minio = require("minio");
const multer = require("multer");
const uuid_1 = require("uuid");
let MinioService = class MinioService {
    constructor(configService) {
        this.configService = configService;
        this.bucket = 'desirium';
        this.minioClient = new Minio.Client({
            endPoint: this.configService.get('MINIO_HOST'),
            port: Number(this.configService.get('MINIO_PORT')),
            useSSL: false,
            accessKey: this.configService.get('MINIO_ACCESS_KEY'),
            secretKey: this.configService.get('MINIO_SECRET_KEY'),
        });
        this.initializeBucket();
    }
    async initializeBucket() {
        try {
            const exists = await this.minioClient.bucketExists(this.bucket);
            if (!exists) {
                await this.minioClient.makeBucket(this.bucket);
                console.log(`Bucket ${this.bucket} created.`);
            }
        }
        catch (err) {
            console.error('Error initializing bucket:', err);
        }
    }
    getUploadMulter() {
        return multer({ storage: multer.memoryStorage() });
    }
    async uploadFile(file, fileName) {
        fileName = fileName || (0, uuid_1.v4)();
        if (!file || typeof file !== 'object') {
            throw new Error('Invalid file');
        }
        return await this.minioClient.putObject(this.bucket, fileName, file.buffer, file.size);
    }
    async getFileUrl(etag) {
        return await this.minioClient.presignedUrl('GET', this.bucket, etag);
    }
    async getFile(bucket, fileName) {
        try {
            return await this.minioClient.getObject(bucket, fileName);
        }
        catch (err) {
            console.error('Error retrieving file:', err);
            throw new Error('File not found or other error occurred');
        }
    }
    getExtension(filename) {
        return filename.split('.').pop();
    }
};
exports.MinioService = MinioService;
exports.MinioService = MinioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MinioService);
//# sourceMappingURL=minio.service.js.map