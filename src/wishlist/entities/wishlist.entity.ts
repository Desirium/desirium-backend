import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('wishlist')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'wallet_address' })
  walletAddress: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, user => user.wishlists)
  @JoinColumn({ name: 'user_id' })
  user: User;
} 