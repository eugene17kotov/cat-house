'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/ui/theme-toggle';
import ContactUsModal from '@/components/contact-us-modal';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className='sticky top-0 z-50 border-b bg-background/40 backdrop-blur px-4'>
      <div className='flex items-center justify-between py-4'>
        <Link href='/' className='flex items-center gap-x-2.5'>
          <img
            src='logo.png'
            alt='logo'
            className='hidden md:block h-10 w-auto'
          />
          <p className='font-bold'>cat-house</p>
        </Link>

        <div className='flex items-center gap-3'>
          <ContactUsModal>
            <Button
              variant='outline'
              size='lg'
              className='bg-primary text-primary-foreground hover:bg-primary/20 transition-all duration-300'
            >
              Связаться с нами
            </Button>
          </ContactUsModal>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
