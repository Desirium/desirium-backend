import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistService {
    private wishlistRepository;
    constructor(wishlistRepository: Repository<Wishlist>);
    create(createWishlistDto: CreateWishlistDto): Promise<Wishlist>;
    findAll(): Promise<Wishlist[]>;
    findOne(id: number): Promise<Wishlist>;
    findByUserId(userId: number): Promise<Wishlist[]>;
    update(id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist>;
    remove(id: number): Promise<void>;
}
