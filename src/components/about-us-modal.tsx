'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import AboutUsInfo from './about-us-info';

interface ContactUsModalProps {
  className?: string;
  children?: React.ReactNode;
  buttonTitle?: string;
}

export default function AboutUsModal({
  className,
  children,
  buttonTitle = 'O нас',
}: ContactUsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant='outline' className={cn(className)}>
            {buttonTitle !== 'O нас' && <Info className='mr-1 h-4 w-4' />}
            <p>{buttonTitle}</p>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='flex max-w-2xl rounded-xl flex-col justify-between gap-0 overflow-auto px-4 md:px-10 pb-8 pt-8 w-[calc(100%-2rem)] sm:w-full'>
        <DialogTitle className='mb-6 text-left text-2xl font-medium'>
          O нас
        </DialogTitle>
        <DialogDescription className='mb-4 text-muted-foreground'>
          Команда спасения кошек с завода ЖБИ на ул. Шеногина
        </DialogDescription>

        <AboutUsInfo />
      </DialogContent>
    </Dialog>
  );
}
