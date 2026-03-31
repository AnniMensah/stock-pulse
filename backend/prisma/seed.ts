import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create sample shop owner
  const user = await prisma.user.upsert({
    where: { email: 'shop@madina.gh' },
    update: {},
    create: {
      email: 'shop@madina.gh',
      password: hashedPassword,
      role: 'shop_owner',
      kycStatus: 'verified'
    }
  });

  // Sample Ghana products
  await prisma.product.createMany({
    data: [
      {
        name: 'Indomie Instant Noodles 70g',
        barcode: '1234567890123',
        stock: 100,
        threshold: 20,
        price: 2.5,
        category: 'Noodles',
        ownerId: user.id
      },
      {
        name: 'Voltic Water 500ml',
        barcode: '9876543210987',
        stock: 50,
        threshold: 10,
        price: 1.0,
        category: 'Beverages',
        ownerId: user.id
      },
      {
        name: 'Gari 1kg',
        barcode: '5555555555555',
        stock: 30,
        threshold: 5,
        price: 8.0,
        category: 'Staples',
        ownerId: user.id
      }
    ],
    skipDuplicates: true
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

