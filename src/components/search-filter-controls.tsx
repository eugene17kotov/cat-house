import Sort, { SortOption } from '@/components/sort';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { motion } from 'framer-motion';
import type React from 'react';
import { useCallback } from 'react';
import { Palette, Users } from 'lucide-react';

interface SearchFilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryOptions: { label: string; value: string }[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  genderOptions: { label: string; value: string }[];
  selectedGenders: string[];
  setSelectedGenders: (genders: string[]) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export function SearchFilterControls({
  searchQuery,
  setSearchQuery,
  categoryOptions,
  selectedCategories,
  setSelectedCategories,
  genderOptions,
  selectedGenders,
  setSelectedGenders,
  sortOption,
  onSortChange,
}: SearchFilterControlsProps) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery],
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <motion.div
      className='flex w-full flex-col md:flex-row justify-between items-center gap-4'
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        },
      }}
    >
      <Input
        type='text'
        placeholder='Поиск по именам...'
        value={searchQuery}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        showClearButton={true}
        className='w-full md:w-80'
      />
      <div className='w-full md:w-auto flex flex-col md:flex-row items-center gap-4'>
        <MultiSelect
          options={categoryOptions}
          value={selectedCategories}
          onValueChange={setSelectedCategories}
          placeholder='Выбрать окрас'
          icon={Palette}
          className='w-full md:w-64'
        />
        <MultiSelect
          options={genderOptions}
          value={selectedGenders}
          onValueChange={setSelectedGenders}
          placeholder='Выбрать пол'
          icon={Users}
          className='w-full md:w-48'
        />
        <Sort sortOption={sortOption} onSortChange={onSortChange} />
      </div>
    </motion.div>
  );
}
