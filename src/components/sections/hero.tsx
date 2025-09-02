'use client';

import { motion } from 'framer-motion';

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
      className='flex flex-col items-center justify-center space-y-2 text-center'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <motion.div variants={itemVariants}>
        <img src='/logo.svg' alt='cat-house logo' className='max-h-36' />
      </motion.div>
      <motion.h1
        className='text-4xl font-bold tracking-tighter sm:text-5xl'
        variants={itemVariants}
      >
        cat-house
      </motion.h1>
      <motion.p
        className='max-w-[900px] text-muted-foreground'
        variants={itemVariants}
      >
        A curated list of awesome cats cared by cat-house.
      </motion.p>
    </motion.div>
  );
}
