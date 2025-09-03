export interface Resource {
  id: number;
  name: string;
  gender: 'male' | 'female';
  primary_image: string;
  all_images: string[];
  description: string;
  color: string;
  age: number;
}

type CatBase = Omit<Resource, 'primary_image' | 'all_images'>;

type CatWithCount = CatBase & {
  imagesCount: number;
};

const CATS_DATA: CatWithCount[] = [
  {
    id: 1,
    name: 'Балерун',
    gender: 'male',
    description:
      'Очень ласковый, ручной, любит компанию человека, но при этом самостоятельный взрослый кот, который не будет навязываться. Ладит с котами (самцами), но дерётся с кошками. Отдается либо одним питомцем, либо вторым котиком, строго к мальчику. Здоров. Кастрирован.',
    color: 'Табби с белым',
    age: 4,
    imagesCount: 4,
  },
  {
    id: 2,
    name: 'Мурзик',
    gender: 'male',
    description:
      'Ласковый, ручной котик. Хорошо ладит с котами и кошками. Кастрирован. Готов поехать на доживание в семью. Лейкоз положительный, отдается либо одним котом либо к лейкозным',
    color: 'Табби',
    age: 16,
    imagesCount: 3,
  },
];

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
