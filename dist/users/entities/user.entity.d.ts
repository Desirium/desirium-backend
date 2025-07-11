import { Wishlist } from '../../wishlist/entities/wishlist.entity';
export declare class User {
    id: number;
    walletAddress: string;
    name: string;
    surname: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    linkedin: string;
    description: string;
    image: string;
    wishlists: Wishlist[];
}
