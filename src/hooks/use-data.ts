export interface Resource {
  id: number;
  name: string;
  primary_image: string;
  all_images: string[];
  description: string;
  color: string;
  age: number;
}

// Локальные данные котиков
const CATS_DATA: Resource[] = [
  {
    id: 1,
    name: 'Мурка',
    primary_image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    all_images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
    ],
    description: 'Ласковая и игривая кошка с красивыми зелеными глазами',
    color: 'Серый',
    age: 3,
  },
  {
    id: 2,
    name: 'Барсик',
    primary_image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
    all_images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    ],
    description: 'Большой и мягкий кот, любит спать на солнышке',
    color: 'Рыжий',
    age: 5,
  },
  {
    id: 3,
    name: 'Снежинка',
    primary_image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400',
    all_images: [
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    ],
    description: 'Белая кошка с длинной шерстью, очень чистоплотная',
    color: 'Белый',
    age: 2,
  },
  {
    id: 4,
    name: 'Черныш',
    primary_image:
      'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400',
    all_images: [
      'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
    ],
    description: 'Элегантный черный кот с золотыми глазами',
    color: 'Черный',
    age: 4,
  },
  {
    id: 5,
    name: 'Рыжик',
    primary_image:
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400',
    all_images: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    ],
    description: 'Энергичный рыжий кот, любит играть с мячиком',
    color: 'Рыжий',
    age: 1,
  },
  {
    id: 6,
    name: 'Серая',
    primary_image:
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400',
    all_images: [
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
    ],
    description: 'Спокойная серая кошка, идеальна для семьи с детьми',
    color: 'Серый',
    age: 6,
  },
];

export async function fetchAndParseData(): Promise<Resource[]> {
  // Имитируем асинхронный запрос
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(CATS_DATA);
    }, 500);
  });
}
