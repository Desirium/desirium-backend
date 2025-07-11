import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name?: string;
    surname?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    linkedin?: string;
    description?: string;
    image?: string;
}
export {};
