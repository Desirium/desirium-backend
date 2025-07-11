import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MinioService } from '../minio/minio.service';
export declare class UsersService {
    private usersRepository;
    private minioService;
    constructor(usersRepository: Repository<User>, minioService: MinioService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByWalletAddress(walletAddress: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    updateUserImage(id: number, file: Express.Multer.File): Promise<{
        image: string;
    }>;
    remove(id: number): Promise<void>;
}
