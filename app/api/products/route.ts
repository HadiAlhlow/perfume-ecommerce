import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { parseImages } from '@/lib/utils/imageHelper';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const search = searchParams.get('search');

    const where: any = {};
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }
    if (featured) {
      where.featured = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert images JSON to array for frontend
    const productsWithImages = products.map((product) => ({
      ...product,
      images: parseImages(product.images),
    }));

    return NextResponse.json(productsWithImages);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

