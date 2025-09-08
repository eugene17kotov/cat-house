'use client';

import { useState } from 'react';
import ContactUsForm from './contact-us-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ContactUsModalProps {
  className?: string;
  children?: React.ReactNode;
  catName?: string;
}

export default function ContactUsModal({
  className,
  children,
  catName,
}: ContactUsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className={cn(className)}>Связаться с нами</Button>
        )}
      </DialogTrigger>
      <DialogContent className='flex max-w-2xl rounded-xl flex-col justify-between gap-0 overflow-auto px-10 pb-10 pt-14 w-[calc(100%-2rem)] sm:w-full'>
        <DialogTitle className='mb-6 text-left text-2xl font-medium'>
          {catName
            ? `Связаться с нами по поводу ${catName}`
            : 'Связаться с нами'}
        </DialogTitle>
        <DialogDescription className='mb-4 text-muted-foreground'>
          {catName
            ? `Заполните форму ниже, чтобы связаться с нами по поводу кота ${catName}. Мы ответим вам в ближайшее время.`
            : 'Заполните форму ниже, чтобы связаться с нами. Мы ответим вам в ближайшее время.'}
        </DialogDescription>

        <ContactUsForm onClose={() => setOpen(false)} catName={catName} />
      </DialogContent>
    </Dialog>
  );
}
