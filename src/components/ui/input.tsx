import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onClear, showClearButton = false, ...props }, ref) => {
    const [showClear, setShowClear] = React.useState(false);

    React.useEffect(() => {
      setShowClear(!!props.value && props.value.toString().length > 0);
    }, [props.value]);

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    if (showClearButton && onClear) {
      return (
        <div className='relative w-full'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground' />
          <input
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent pl-10 py-2 pr-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              className,
            )}
            ref={ref}
            {...props}
          />
          {showClear && (
            <button
              type='button'
              onClick={handleClear}
              className='absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors'
              aria-label='Очистить поле'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
