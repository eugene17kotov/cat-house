'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, XCircle, ChevronDown, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

const multiSelectVariants = cva(
  'm-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110',
  {
    variants: {
      variant: {
        default:
          'border-foreground/10 bg-card text-foreground hover:bg-card/80',
        secondary:
          'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive hover:bg-destructive/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Выбрать опции".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(function MultiSelect(
  {
    options,
    onValueChange,
    variant,
    defaultValue = [],
    placeholder = 'Выбрать опции',
    maxCount = 3,
    modalPopover = false,
    ...props
  },
  ref,
) {
  const [selectedValues, setSelectedValues] =
    React.useState<string[]>(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsPopoverOpen(true);
    } else if (event.key === 'Backspace' && !event.currentTarget.value) {
      const newSelectedValues = [...selectedValues];
      newSelectedValues.pop();
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    }
  };

  const toggleOption = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter(value => value !== option)
      : [...selectedValues, option];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const handleTogglePopover = () => {
    setIsPopoverOpen(prev => !prev);
  };

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const toggleAll = () => {
    if (selectedValues.length === options.length) {
      handleClear();
    } else {
      const allValues = options.map(option => option.value);
      setSelectedValues(allValues);
      onValueChange(allValues);
    }
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      modal={modalPopover}
    >
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          {...props}
          onClick={handleTogglePopover}
          variant='outline'
          className='h-auto w-full md:max-w-96'
        >
          {selectedValues.length > 0 ? (
            <div className='flex w-full items-center justify-between'>
              <div className='flex flex-wrap items-center'>
                {selectedValues.slice(0, maxCount).map(value => {
                  const option = options.find(o => o.value === value);
                  const IconComponent = option?.icon;
                  return (
                    <Badge
                      key={value}
                      className={cn(multiSelectVariants({ variant }))}
                    >
                      {IconComponent && (
                        <IconComponent className='mr-2 size-4' />
                      )}
                      {option?.label}
                      <div
                        role='button'
                        tabIndex={0}
                        onClick={event => {
                          event.stopPropagation();
                          toggleOption(value);
                        }}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            event.stopPropagation();
                            toggleOption(value);
                          }
                        }}
                        aria-label={`Удалить ${option?.label} из выбора`}
                        className='-m-0.5 ml-2 size-4 cursor-pointer rounded-sm p-0.5 hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/50'
                      >
                        <XCircle className='size-3' />
                      </div>
                    </Badge>
                  );
                })}
                {selectedValues.length > maxCount && (
                  <Badge
                    className={cn(
                      'border-foreground/10 bg-transparent text-foreground hover:bg-transparent',
                      multiSelectVariants({ variant }),
                    )}
                  >
                    {`+ ${selectedValues.length - maxCount} больше`}
                    <div
                      role='button'
                      tabIndex={0}
                      onClick={event => {
                        event.stopPropagation();
                        clearExtraOptions();
                      }}
                      onKeyDown={event => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          event.stopPropagation();
                          clearExtraOptions();
                        }
                      }}
                      aria-label='Очистить лишние опции'
                      className='-m-0.5 ml-2 size-4 cursor-pointer rounded-sm p-0.5 hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/50'
                    >
                      <XCircle className='size-3' />
                    </div>
                  </Badge>
                )}
              </div>
              <div className='flex items-center justify-between'>
                <div
                  role='button'
                  tabIndex={0}
                  onClick={event => {
                    event.stopPropagation();
                    handleClear();
                  }}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      event.stopPropagation();
                      handleClear();
                    }
                  }}
                  aria-label={`Очистить все ${selectedValues.length} выбранных опций`}
                  className='mx-2 flex size-4 cursor-pointer items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1'
                >
                  <XIcon className='size-4' />
                </div>
                <Separator
                  orientation='vertical'
                  className='flex h-full min-h-6'
                />
                <ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
              </div>
            </div>
          ) : (
            <div className='mx-auto flex w-full items-center justify-between'>
              <span className='mx-3 text-sm text-muted-foreground'>
                {placeholder}
              </span>
              <ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0'
        align='end'
        side='bottom'
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <Command>
          <CommandInput placeholder='Поиск...' onKeyDown={handleInputKeyDown} />
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key='all'
                onSelect={toggleAll}
                className='cursor-pointer'
              >
                <div
                  className={cn(
                    'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.length === options.length
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible',
                  )}
                >
                  <CheckIcon className='size-4' />
                </div>
                <span>(Выбрать все)</span>
              </CommandItem>
              {options.map(option => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className='cursor-pointer'
                  >
                    <div
                      className={cn(
                        'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className='size-4' />
                    </div>
                    {option.icon && (
                      <option.icon className='mr-2 size-4 text-muted-foreground' />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className='flex items-center justify-between'>
                {selectedValues.length > 0 && (
                  <>
                    <CommandItem
                      onSelect={handleClear}
                      className='flex-1 cursor-pointer justify-center'
                    >
                      Очистить
                    </CommandItem>
                    <Separator
                      orientation='vertical'
                      className='flex h-full min-h-6'
                    />
                  </>
                )}
                <CommandItem
                  onSelect={() => setIsPopoverOpen(false)}
                  className='max-w-full flex-1 cursor-pointer justify-center'
                >
                  Закрыть
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
