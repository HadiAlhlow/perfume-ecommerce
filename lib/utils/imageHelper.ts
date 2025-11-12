/**
 * Helper function to convert Prisma JSON images field to array
 */
export function parseImages(images: any): string[] {
  if (Array.isArray(images)) {
    return images;
  }
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [images];
    }
  }
  return [];
}

