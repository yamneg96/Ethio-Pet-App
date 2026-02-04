import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(userId: string, petId: string) {
    const exists = await this.prisma.favorite.findUnique({
      where: { userId_petId: { userId, petId } },
    });
    if (exists) throw new BadRequestException('Already in favorites');

    return this.prisma.favorite.create({ data: { userId, petId } });
  }

  async removeFavorite(userId: string, petId: string) {
    return this.prisma.favorite.delete({ where: { userId_petId: { userId, petId } } });
  }

  async listFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        pet: {
          include: {
            images: true,
            seller: { select: { id: true, email: true, role: true, sellerProfile: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
