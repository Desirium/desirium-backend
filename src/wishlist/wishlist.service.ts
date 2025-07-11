import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const { userId, walletAddress, image } = createWishlistDto;

    if (!walletAddress || !userId) {
      throw new BadRequestException('user_id and wallet_address are required');
    }

    const newWishlist = this.wishlistRepository.create({
      userId,
      walletAddress,
      image,
    });

    return await this.wishlistRepository.save(newWishlist);
  }

  async findAll(): Promise<Wishlist[]> {
    return await this.wishlistRepository.find();
  }

  async findOne(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    return wishlist;
  }

  async findByUserId(userId: number): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({ where: { userId } });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    
    // Update only provided fields
    Object.assign(wishlist, updateWishlistDto);
    
    return await this.wishlistRepository.save(wishlist);
  }

  async remove(id: number): Promise<void> {
    const wishlist = await this.findOne(id);
    await this.wishlistRepository.remove(wishlist);
  }
} 