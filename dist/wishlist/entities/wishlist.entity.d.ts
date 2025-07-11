import { User } from '../../users/entities/user.entity';
export declare class Wishlist {
    id: number;
    userId: number;
    walletAddress: string;
    image: string;
    user: User;
}
