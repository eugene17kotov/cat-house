import { Resource } from '@/lib/data';
import { CATS_DATA } from '@/lib/data';

/**
 * Генерує шляхи для картинок кота за його id і кількістю фото
 */
function getCatImages(id: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/cats/${id}/${i + 1}.jpg`);
}

const RESOURCES: Resource[] = CATS_DATA.map(cat => {
  const images = getCatImages(cat.id, cat.imagesCount);
  return {
    ...cat,
    primary_image: images[0],
    all_images: images.length > 0 ? images : [],
  };
});

export async function fetchAndParseData(): Promise<Resource[]> {
  return new Promise(resolve => {
    setTimeout(() => resolve(RESOURCES), 500);
  });
}
