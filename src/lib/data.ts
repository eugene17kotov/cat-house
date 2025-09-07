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

export const CATS_DATA: CatWithCount[] = [
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
      'Ласковый, ручной котик. Хорошо ладит с котами и кошками. Кастрирован. Готов поехать на доживание в семью.',
    color: 'Табби',
    age: 16,
    imagesCount: 3,
  },
  {
    id: 3,
    name: 'Маша',
    gender: 'female',
    description:
      'Ласковая, здоровая кошка ищет свою семью. Очень тактильная, пушистая, нежная кошка. Ладит с другими котами и кошками',
    color: 'Черепаховый',
    age: 5,
    imagesCount: 2,
  },
  {
    id: 4,
    name: 'Принцесса',
    gender: 'female',
    description:
      'Осторожная кошечка, понадобится терпение, чтобы дать ей время привыкнуть к человеку. Станет тихим спокойным компаньоном.',
    color: 'Белая с пятнами',
    age: 3,
    imagesCount: 1,
  },
  {
    id: 5,
    name: 'Клякса',
    gender: 'female',
    description:
      'Пугашка, потребуется дать время на привыкание к людям и, возможно, социализация.',
    color: 'Черепаховый',
    age: 3,
    imagesCount: 3,
  },
  {
    id: 6,
    name: 'Цуцука',
    gender: 'female',
    description:
      'Активная кошка, любит общаться с человеком, очень социальная и игривая. Любит помяукать время от времени, достаточно говорливая, не даст заскучать.',
    color: 'Табби',
    age: 2,
    imagesCount: 3,
  },
  {
    id: 7,
    name: 'Жигуль',
    gender: 'male',
    description:
      'Ласковый, общительный, молодой котик в поисках своей семьи. Черный, с коричневым отливом, очень красивый кот станет преданным членом Вашей семьи. Ладит с другими животными, здоров.',
    color: 'Черный',
    age: 3,
    imagesCount: 3,
  },
];
