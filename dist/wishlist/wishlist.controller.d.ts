import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    create(createWishlistDto: CreateWishlistDto): Promise<import("./entities/wishlist.entity").Wishlist>;
    findAll(): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    findOne(id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
    findByUserId(userId: number): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    update(id: number, updateWishlistDto: UpdateWishlistDto): Promise<import("./entities/wishlist.entity").Wishlist>;
    remove(id: number): Promise<void>;
}
