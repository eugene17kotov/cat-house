import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Clock, SortAsc, SortDesc, Text } from 'lucide-react';

export type SortOption = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

interface SortProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export default function Sort({ sortOption, onSortChange }: SortProps) {
  // Predefined sort options with clear labels and matching icons
  const sortOptions = [
    {
      value: 'name-asc',
      label: 'Имя (А-Я)',
      icon: <Text className='h-4 w-4 mr-2' />,
      directionIcon: <SortDesc className='h-4 w-4 ml-2 inline' />,
    },
    {
      value: 'name-desc',
      label: 'Имя (Я-А)',
      icon: <Text className='h-4 w-4 mr-2' />,
      directionIcon: <SortAsc className='h-4 w-4 ml-2 inline' />,
    },
    {
      value: 'date-desc',
      label: 'Возраст (По убыванию)',
      icon: <Clock className='h-4 w-4 mr-2' />,
      directionIcon: <SortDesc className='h-4 w-4 ml-2 inline' />,
    },
    {
      value: 'date-asc',
      label: 'Возраст (По возрастанию)',
      icon: <Clock className='h-4 w-4 mr-2' />,
      directionIcon: <SortAsc className='h-4 w-4 ml-2 inline' />,
    },
  ] as const;

  // Find the currently selected option
  const selectedOption =
    sortOptions.find(option => option.value === sortOption) || sortOptions[0];

  // Handler to ensure sort changes are properly processed
  const handleSortChange = (value: string) => {
    onSortChange(value as SortOption);
  };

  return (
    <Select
      value={sortOption}
      defaultValue='name-asc'
      onValueChange={handleSortChange}
    >
      <SelectTrigger className='flex items-center justify-between w-full lg:w-[250px]'>
        <SelectValue>
          <span className='flex items-center'>
            {selectedOption.icon}
            <span className='truncate'>{selectedOption.label}</span>
            {selectedOption.directionIcon}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map(option => (
          <SelectItem key={option.value} value={option.value}>
            <span className='flex items-center'>
              {option.icon}
              <span className='truncate'>{option.label}</span>
              {option.directionIcon}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
