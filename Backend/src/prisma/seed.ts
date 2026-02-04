import { PrismaClient } from '@prisma/client';
import { hashValue } from '../common/utils/crypto.util';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hashValue('password123');

  const seller = await prisma.user.upsert({
    where: { email: 'seller@ethiopet.com' },
    update: {},
    create: {
      email: 'seller@ethiopet.com',
      passwordHash,
      role: 'SELLER',
      sellerProfile: { create: { displayName: 'Ethio Seller', isVerified: true } },
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@ethiopet.com' },
    update: {},
    create: {
      email: 'buyer@ethiopet.com',
      passwordHash,
      role: 'BUYER',
    },
  });

  await prisma.pet.createMany({
    data: [
      { sellerId: seller.id, name: 'Abyssinian Kitten', breed: 'Abyssinian', ageMonths: 4, price: 1200, location: 'Addis Ababa', featured: true },
      { sellerId: seller.id, name: 'Shepherd Puppy', breed: 'German Shepherd', ageMonths: 6, price: 2500, location: 'Addis Ababa', featured: false },
    ],
    skipDuplicates: true,
  });

  console.log('Seed completed', { buyer: buyer.email, seller: seller.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
