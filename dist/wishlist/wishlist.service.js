"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
let WishlistService = class WishlistService {
    constructor(wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }
    async create(createWishlistDto) {
        const { userId, walletAddress, image } = createWishlistDto;
        if (!walletAddress || !userId) {
            throw new common_1.BadRequestException('user_id and wallet_address are required');
        }
        const newWishlist = this.wishlistRepository.create({
            userId,
            walletAddress,
            image,
        });
        return await this.wishlistRepository.save(newWishlist);
    }
    async findAll() {
        return await this.wishlistRepository.find();
    }
    async findOne(id) {
        const wishlist = await this.wishlistRepository.findOne({ where: { id } });
        if (!wishlist) {
            throw new common_1.NotFoundException(`Wishlist with ID ${id} not found`);
        }
        return wishlist;
    }
    async findByUserId(userId) {
        return await this.wishlistRepository.find({ where: { userId } });
    }
    async update(id, updateWishlistDto) {
        const wishlist = await this.findOne(id);
        Object.assign(wishlist, updateWishlistDto);
        return await this.wishlistRepository.save(wishlist);
    }
    async remove(id) {
        const wishlist = await this.findOne(id);
        await this.wishlistRepository.remove(wishlist);
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map