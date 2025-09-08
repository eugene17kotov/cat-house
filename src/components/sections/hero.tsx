'use client';

import { motion } from 'framer-motion';
import AboutUsModal from '../about-us-modal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function Hero() {
  return (
    <motion.div
      className='flex flex-col items-center justify-center space-y-2 md:space-y-4 text-center'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <motion.div variants={itemVariants}>
        <img src='/logo.svg' alt='Заводские кошки лого' className='max-h-36' />
      </motion.div>
      <motion.h1
        className='text-4xl font-bold tracking-tighter sm:text-5xl'
        variants={itemVariants}
      >
        Заводские кошки
      </motion.h1>
      <motion.p
        className='max-w-[900px] text-muted-foreground'
        variants={itemVariants}
      >
        Подборка замечательных котиков для вашего дома.
      </motion.p>
      <motion.p
        className='max-w-[500px] text-muted-foreground/80 text-sm'
        variants={itemVariants}
      >
        Сайт находится в разработке. Количество котиков доступных для вашего
        выбора на сайте будет увеличиваться. Следите за обновлениями
      </motion.p>

      <motion.div>
        <AboutUsModal
          className='hidden md:flex w-auto min-w-[180px] items-center text-white hover:text-white bg-blue-500/90 hover:bg-blue-500  px-8 py-3'
          buttonTitle='Узнать о нас больше'
        />
      </motion.div>
    </motion.div>
  );
}
