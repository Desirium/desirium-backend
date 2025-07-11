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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const minio_service_1 = require("../minio/minio.service");
let UsersService = class UsersService {
    constructor(usersRepository, minioService) {
        this.usersRepository = usersRepository;
        this.minioService = minioService;
    }
    async create(createUserDto) {
        const { walletAddress } = createUserDto;
        if (!walletAddress) {
            throw new common_1.BadRequestException('wallet_address is required');
        }
        const existingUser = await this.findByWalletAddress(walletAddress);
        if (existingUser) {
            return existingUser;
        }
        const newUser = this.usersRepository.create({
            walletAddress,
        });
        return await this.usersRepository.save(newUser);
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findByWalletAddress(walletAddress) {
        return await this.usersRepository.findOne({ where: { walletAddress } });
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        return await this.usersRepository.save(user);
    }
    async updateUserImage(id, file) {
        const user = await this.findOne(id);
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const filename = `${id}.${this.minioService.getExtension(file.originalname)}`;
        try {
            const uploadedFile = await this.minioService.uploadFile(file, filename);
            const imageUrl = await this.minioService.getFileUrl(uploadedFile.etag);
            user.image = imageUrl;
            await this.usersRepository.save(user);
            return { image: imageUrl };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to upload image');
        }
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        minio_service_1.MinioService])
], UsersService);
//# sourceMappingURL=users.service.js.map