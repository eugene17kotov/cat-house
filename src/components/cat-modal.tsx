import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import ContactUsModal from './contact-us-modal';
import CatImage from './cat-image';

interface CatModalProps {
  isOpen: boolean;
  onClose: () => void;
  cat: {
    id: number;
    name: string;
    description: string;
    primary_image: string;
    all_images: string[];
    color: string;
    age: number;
    gender: 'male' | 'female';
  } | null;
}

export default function CatModal({ isOpen, onClose, cat }: CatModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!cat) return null;

  // Функция для правильного склонения слова "год"
  const getAgeText = (age: number): string => {
    if (age === 1) return '1 год';
    if (age >= 2 && age <= 4) return `${age} года`;
    return `${age} лет`;
  };

  // Функция для получения иконки гендера
  const getGenderIcon = (gender: 'male' | 'female') => {
    return gender === 'male' ? '/mars.svg' : '/venus.svg';
  };

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      prev === cat.all_images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? cat.all_images.length - 1 : prev - 1,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-hidden'>
        <DialogHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
          <div>
            <DialogTitle className='text-2xl font-bold'>{cat.name}</DialogTitle>
            <DialogDescription className='sr-only text-muted-foreground mt-1'>
              Подробная информация о коте и галерея фотографий
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto'>
          {/* Галерея изображений */}
          <div className='space-y-4'>
            {/* Главное изображение */}
            <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100'>
              <CatImage
                src={cat.all_images[currentImageIndex]}
                alt={`${cat.name} - фото ${currentImageIndex + 1}`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />

              {/* Навигация по изображениям */}
              {cat.all_images.length > 1 && (
                <>
                  <Button
                    variant='secondary'
                    size='icon'
                    onClick={prevImage}
                    className='absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white'
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='secondary'
                    size='icon'
                    onClick={nextImage}
                    className='absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white'
                  >
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </>
              )}

              {/* Индикатор текущего изображения */}
              {cat.all_images.length > 1 && (
                <div className='absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm'>
                  {currentImageIndex + 1} / {cat.all_images.length}
                </div>
              )}
            </div>

            {/* Миниатюры */}
            {cat.all_images.length > 1 && (
              <div className='grid grid-cols-4 gap-2'>
                {cat.all_images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'aspect-square overflow-hidden rounded-md border-2 transition-all relative',
                      currentImageIndex === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-gray-200 hover:border-gray-300',
                    )}
                  >
                    <CatImage
                      src={image}
                      alt={`${cat.name} - миниатюра ${index + 1}`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 25vw, (max-width: 1200px) 12.5vw, 8vw'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о коте */}
          <div className='space-y-6'>
            {/* Основная информация */}
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <Badge variant='secondary' className='text-sm'>
                  {cat.color}
                </Badge>
                <div className='flex items-center text-muted-foreground'>
                  <Clock className='h-4 w-4 mr-1' />
                  <span className='text-sm'>{getAgeText(cat.age)}</span>
                </div>
                <CatImage
                  src={getGenderIcon(cat.gender)}
                  alt={cat.gender === 'male' ? 'Самец' : 'Самка'}
                  width={16}
                  height={16}
                  className='mr-1'
                />
              </div>

              <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>Описание</h3>
                <p className='text-muted-foreground leading-relaxed'>
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className='flex gap-3 mt-auto'>
              <ContactUsModal className='flex-1' catName={cat.name}>
                <Button className='w-full'>Связаться с нами</Button>
              </ContactUsModal>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
