import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { parseImages } from '@/lib/utils/imageHelper';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: {
        slug: id,
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        variants: true,
        reviews: {
          take: 10,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Convert images JSON to array for frontend
    const productWithImages = {
      ...product,
      images: parseImages(product.images),
    };

    return NextResponse.json(productWithImages);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

