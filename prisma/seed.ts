import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'floral' },
      update: {},
      create: {
        name: 'Floral',
        slug: 'floral',
        description: 'Delicate and romantic floral fragrances',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'woody' },
      update: {},
      create: {
        name: 'Woody',
        slug: 'woody',
        description: 'Warm and earthy woody fragrances',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fresh' },
      update: {},
      create: {
        name: 'Fresh',
        slug: 'fresh',
        description: 'Crisp and invigorating fresh fragrances',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'oriental' },
      update: {},
      create: {
        name: 'Oriental',
        slug: 'oriental',
        description: 'Exotic and sensual oriental fragrances',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'citrus' },
      update: {},
      create: {
        name: 'Citrus',
        slug: 'citrus',
        description: 'Bright and energizing citrus fragrances',
      },
    }),
  ]);

  console.log('Created categories:', categories);

  // Create sample products
  const floralCategory = categories[0];
  const woodyCategory = categories[1];
  const freshCategory = categories[2];
  const orientalCategory = categories[3];
  const citrusCategory = categories[4];

  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'rose-elegance' },
      update: {},
      create: {
        name: 'Rose Elegance',
        slug: 'rose-elegance',
        description: 'A sophisticated blend of rose petals, jasmine, and vanilla. Perfect for special occasions.',
        price: 89.99,
        images: ['/placeholder.jpg'] as any,
        categoryId: floralCategory.id,
        stock: 50,
        featured: true,
        rating: 4.5,
        reviewCount: 23,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'sandalwood-dreams' },
      update: {},
      create: {
        name: 'Sandalwood Dreams',
        slug: 'sandalwood-dreams',
        description: 'Rich sandalwood with hints of cedar and amber. A warm, comforting fragrance.',
        price: 95.99,
        images: ['/placeholder.jpg'] as any,
        categoryId: woodyCategory.id,
        stock: 30,
        featured: true,
        rating: 4.8,
        reviewCount: 15,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'ocean-breeze' },
      update: {},
      create: {
        name: 'Ocean Breeze',
        slug: 'ocean-breeze',
        description: 'Fresh aquatic notes with marine accords. Refreshing and energizing.',
        price: 79.99,
        images: ['/placeholder.jpg'] as any,
        categoryId: freshCategory.id,
        stock: 40,
        featured: true,
        rating: 4.3,
        reviewCount: 18,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'mystic-amber' },
      update: {},
      create: {
        name: 'Mystic Amber',
        slug: 'mystic-amber',
        description: 'Exotic amber with spices and vanilla. Mysterious and alluring.',
        price: 109.99,
        images: ['/placeholder.jpg'] as any,
        categoryId: orientalCategory.id,
        stock: 25,
        featured: true,
        rating: 4.7,
        reviewCount: 12,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'citrus-burst' },
      update: {},
      create: {
        name: 'Citrus Burst',
        slug: 'citrus-burst',
        description: 'Vibrant blend of lemon, bergamot, and grapefruit. Uplifting and energizing.',
        price: 69.99,
        images: ['/placeholder.jpg'] as any,
        categoryId: citrusCategory.id,
        stock: 60,
        featured: true,
        rating: 4.6,
        reviewCount: 20,
      },
    }),
  ]);

  console.log('Created products:', products);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

