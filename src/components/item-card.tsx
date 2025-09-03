import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUpRight, Bookmark, Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import CatModal from './cat-modal';
import CatImage from './cat-image';

type LayoutType = 'compact' | 'grid';

interface ItemCardProps {
  id: number;
  title: string;
  description: string;
  primary_image: string;
  all_images: string[];
  gender: 'male' | 'female';
  color: string;
  age: number;
  isBookmarked: boolean;
  onBookmark: (id: number) => void;
  layoutType: LayoutType;
}

// Standard animation settings to ensure consistency
const standardAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { type: 'spring', stiffness: 300, damping: 30 },
};

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  description,
  primary_image,
  all_images,
  color,
  age,
  gender,
  isBookmarked,
  onBookmark,
  layoutType = 'grid',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Get styling based on layout type
  const styles = useMemo(() => {
    switch (layoutType) {
      case 'compact':
        return {
          card: 'h-[390px] group border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300',
          container: 'gap-1',
          title:
            'text-sm font-bold group-hover:text-primary transition-colors duration-300',
          badge: 'text-xs px-2 py-0 h-5 mt-1',
          description:
            'text-xs opacity-80 group-hover:opacity-100 transition-opacity duration-300 min-h-[2.5rem] line-clamp-4 overflow-hidden text-ellipsis',
          date: 'text-xs opacity-60',
          button: 'text-xs py-1 h-7',
          bookmarkBtn: 'h-7 w-7',
          icon: 'h-3.5 w-3.5',
          headerPadding: 'p-3 pb-1',
          contentPadding: 'px-3 py-1.5',
          footerPadding: 'px-3 pb-3 pt-1.5',
          headerHeight: 'h-[70px]',
          contentHeight: 'h-[80px]',
          footerHeight: 'h-[34px]',
        };

      case 'grid':
      default:
        return {
          card: 'h-[430px] group border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md dark:hover:shadow-2xl dark:hover:shadow-neutral-900/20 transition-all duration-300',
          container: 'gap-3',
          title:
            'text-lg font-bold group-hover:text-primary transition-colors duration-300',
          badge: 'text-xs',
          description:
            'text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 min-h-[4.5rem] line-clamp-4 overflow-hidden text-ellipsis',
          date: 'text-xs opacity-70',
          button: 'text-sm',
          bookmarkBtn: 'h-10 w-10',
          icon: 'h-4 w-4',
          headerPadding: 'p-4 pb-2',
          contentPadding: 'px-4 py-2',
          footerPadding: 'px-4 pt-2 pb-4',
          headerHeight: 'h-[70px]',
          contentHeight: 'h-[100px]',
          footerHeight: 'h-[40px]',
        };
    }
  }, [layoutType]);

  return (
    <motion.div layout {...standardAnimations} className={styles.container}>
      <Card className={cn(`overflow-hidden relative`, styles.card)}>
        {/* Decorative gradient highlight effect */}
        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none'>
          <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-primary/10' />
        </div>

        {/* Primary Image */}
        <div className='relative h-40 md:h-48 overflow-hidden'>
          <CatImage
            src={primary_image}
            alt={title}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
        </div>

        <div className='flex flex-col h-full'>
          <CardHeader
            className={cn(
              styles.headerPadding,
              styles.headerHeight,
              'transition-all duration-300',
            )}
          >
            {layoutType === 'compact' ? (
              // Compact layout - Title and info in separate rows
              <div className='space-y-2'>
                <CardTitle className={styles.title}>{title}</CardTitle>
                <div className='flex items-center gap-3 text-xs'>
                  <Badge
                    variant='secondary'
                    className={cn(
                      'shrink-0 transition-all duration-300 w-fit',
                      styles.badge,
                    )}
                  >
                    {color}
                  </Badge>
                  <div className='flex items-center'>
                    <Clock className='size-5 mr-1 opacity-70' />
                    <span>{getAgeText(age)}</span>
                  </div>
                  <CatImage
                    src={getGenderIcon(gender)}
                    alt={gender === 'male' ? 'Самец' : 'Самка'}
                    width={20}
                    height={20}
                    className='mr-1'
                  />
                </div>
              </div>
            ) : (
              // Grid layout - Title and info side by side
              <div className='flex justify-between items-start gap-2'>
                <CardTitle className={styles.title}>{title}</CardTitle>
                <div className='flex flex-col items-end gap-2'>
                  <Badge
                    variant='secondary'
                    className={cn(
                      'shrink-0 transition-all duration-300',
                      styles.badge,
                    )}
                  >
                    {color}
                  </Badge>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center'>
                      <Clock className='size-5 mr-1 opacity-70' />
                      <span className='text-sm'>{getAgeText(age)}</span>
                    </div>
                    <CatImage
                      src={getGenderIcon(gender)}
                      alt={gender === 'male' ? 'Самец' : 'Самка'}
                      width={20}
                      height={20}
                      className='mr-1'
                    />
                  </div>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent
            className={cn(
              styles.contentPadding,
              styles.contentHeight,
              'transition-all duration-300',
            )}
          >
            <p className={cn('text-muted-foreground', styles.description)}>
              {description}
            </p>
          </CardContent>

          <CardFooter
            className={cn(
              'flex gap-2 items-center',
              styles.footerPadding,
              styles.footerHeight,
              'transition-all duration-300',
            )}
          >
            <AnimatePresence mode='popLayout'>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileTap={{ scale: 0.95 }}
                key={`bookmark-${isBookmarked}-${layoutType}`}
              >
                <Button
                  variant={isBookmarked ? 'default' : 'outline'}
                  size={layoutType === 'compact' ? 'sm' : 'icon'}
                  onClick={() => onBookmark(id)}
                  className={cn(
                    'transition-all duration-300 flex-shrink-0',
                    styles.bookmarkBtn,
                    isBookmarked
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600',
                  )}
                >
                  <Bookmark
                    className={cn(
                      styles.icon,
                      'transition-transform duration-300',
                      isBookmarked ? 'scale-110' : '',
                    )}
                  />
                </Button>
              </motion.div>
            </AnimatePresence>

            <Button
              className={cn(
                'w-full group overflow-hidden relative',
                styles.button,
                'transition-all duration-300',
              )}
              variant='outline'
              size={layoutType === 'compact' ? 'sm' : 'default'}
              onClick={() => setIsModalOpen(true)}
            >
              <span className='relative z-10 flex items-center'>
                Узнать больше
                <span className='inline-block transition-transform duration-300 group-hover:translate-x-1'>
                  <ArrowUpRight className={cn('ml-1', styles.icon)} />
                </span>
              </span>
              <span className='absolute inset-0 bg-primary/10 dark:bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></span>
            </Button>
          </CardFooter>
        </div>
      </Card>

      {/* Модальное окно с подробной информацией */}
      <CatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cat={{
          id,
          name: title,
          description,
          primary_image,
          all_images,
          color,
          age,
          gender,
        }}
      />
    </motion.div>
  );
};

export default ItemCard;
