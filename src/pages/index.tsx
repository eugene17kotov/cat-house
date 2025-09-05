'use client';

import { fetchAndParseData } from '@/hooks/use-data';
import { Resource } from '@/lib/data';
import { useEffect, useState } from 'react';

import Hero from '@/components/sections/hero';
import ItemList from '@/components/sections/items-list';
import { motion } from 'framer-motion';

interface Category {
  title: string;
  items: Resource[];
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredItems, setFilteredItems] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const fetchedResources = await fetchAndParseData();

        // Process categories (group by color)
        const groupedCategories = fetchedResources.reduce((acc, resource) => {
          if (!acc[resource.color]) {
            acc[resource.color] = [];
          }
          acc[resource.color].push(resource);
          return acc;
        }, {} as Record<string, Resource[]>);

        const formattedCategories = Object.entries(groupedCategories).map(
          ([title, items]) => ({
            title,
            items,
          }),
        );

        const eligibleItems = fetchedResources;

        // Sort items by age (highest first)
        const sortedItems = eligibleItems.sort((a, b) => {
          return b.age - a.age; // Sort by age descending (oldest first)
        });

        setCategories(formattedCategories);
        setFilteredItems(sortedItems);
      } catch (error) {
        console.error('Error fetching README:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      className='container mx-auto max-w-7xl px-4'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Hero />
      </motion.div>

      <motion.div variants={itemVariants} className='my-6 md:my-12'>
        <ItemList items={filteredItems} categories={categories} />
      </motion.div>
    </motion.div>
  );
}
