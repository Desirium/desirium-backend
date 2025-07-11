import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  surname?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
  description?: string;
  image?: string;
} 