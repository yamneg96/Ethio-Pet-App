import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../common/utils/redis.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(private readonly prisma: PrismaService, private readonly redisService: RedisService) {}

  async listPets(query: { breed?: string; location?: string; featured?: boolean; page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const cacheKey = `pets:list:${query.breed || 'all'}:${query.location || 'all'}:${query.featured ?? 'all'}:${page}:${limit}`;

    const redis = await this.redisService.getClient();
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const pets = await this.prisma.pet.findMany({
      where: {
        breed: query.breed,
        location: query.location,
        featured: query.featured,
        deletedAt: null,
      },
      include: {
        images: true,
        seller: { select: { id: true, email: true, role: true, sellerProfile: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    await redis.set(cacheKey, JSON.stringify(pets), 'EX', 60);
    return pets;
  }

  async getPetById(id: string) {
    const pet = await this.prisma.pet.findFirst({
      where: { id, deletedAt: null },
      include: {
        images: true,
        seller: { select: { id: true, email: true, role: true, sellerProfile: true } },
      },
    });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  async createPet(sellerId: string, dto: CreatePetDto) {
    const pet = await this.prisma.pet.create({
      data: {
        name: dto.name,
        breed: dto.breed,
        ageMonths: dto.ageMonths,
        price: dto.price,
        location: dto.location,
        description: dto.description,
        featured: dto.featured || false,
        sellerId,
        images: dto.imageUrls?.length
          ? { create: dto.imageUrls.map((url, idx) => ({ url, isPrimary: idx === 0 })) }
          : undefined,
      },
    });
    return pet;
  }

  async updatePet(id: string, sellerId: string, dto: UpdatePetDto) {
    const existing = await this.prisma.pet.findFirst({ where: { id, sellerId, deletedAt: null } });
    if (!existing) throw new NotFoundException('Pet not found');
    return this.prisma.pet.update({ where: { id }, data: dto });
  }

  async deletePet(id: string, sellerId: string) {
    const existing = await this.prisma.pet.findFirst({ where: { id, sellerId, deletedAt: null } });
    if (!existing) throw new NotFoundException('Pet not found');
    return this.prisma.pet.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
