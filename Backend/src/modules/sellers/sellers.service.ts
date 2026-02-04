import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSellerProfileDto } from './dto/update-seller-profile.dto';

@Injectable()
export class SellersService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicProfile(sellerId: string) {
    const seller = await this.prisma.user.findFirst({
      where: { id: sellerId, role: 'SELLER', isDeleted: false },
      select: {
        id: true,
        email: true,
        role: true,
        sellerProfile: true,
        pets: { where: { deletedAt: null } },
      },
    });
    if (!seller) throw new NotFoundException('Seller not found');
    return seller;
  }

  async updateMyProfile(userId: string, dto: UpdateSellerProfileDto) {
    const profile = await this.prisma.sellerProfile.upsert({
      where: { userId },
      update: dto,
      create: { userId, displayName: dto.displayName || 'Seller' },
    });
    return profile;
  }
}
