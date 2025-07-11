import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private minioService: MinioService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { walletAddress } = createUserDto;

    if (!walletAddress) {
      throw new BadRequestException('wallet_address is required');
    }

    // Check if user already exists
    const existingUser = await this.findByWalletAddress(walletAddress);
    if (existingUser) {
      return existingUser;
    }

    // Create new user
    const newUser = this.usersRepository.create({
      walletAddress,
    });

    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByWalletAddress(walletAddress: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { walletAddress } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Update only provided fields
    Object.assign(user, updateUserDto);
    
    return await this.usersRepository.save(user);
  }

  async updateUserImage(id: number, file: Express.Multer.File): Promise<{ image: string }> {
    const user = await this.findOne(id);
    
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const filename = `${id}.${this.minioService.getExtension(file.originalname)}`;

    try {
      const uploadedFile = await this.minioService.uploadFile(file, filename);
      const imageUrl = await this.minioService.getFileUrl(uploadedFile.etag);
      
      // Update user with new image URL
      user.image = imageUrl;
      await this.usersRepository.save(user);
      
      return { image: imageUrl };
    } catch (error) {
      throw new BadRequestException('Failed to upload image');
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
} 