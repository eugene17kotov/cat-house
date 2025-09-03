'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/ui/theme-toggle';
import ContactUsModal from '@/components/contact-us-modal';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import { Send } from 'lucide-react';

export function Header() {
  return (
    <header className='sticky top-0 z-50 border-b bg-background/40 backdrop-blur px-4'>
      <div className='flex items-center md:justify-between py-4'>
        <Link href='/' className='items-center gap-x-2.5 hidden md:flex'>
          <Image
            src='/logo.png'
            alt='logo'
            className='w-auto'
            width={40}
            height={40}
          />
          <p className='font-bold  text-lg'>Котодом</p>
        </Link>

        <div className='flex w-full md:w-auto items-center justify-between md:justify-end gap-3'>
          <ContactUsModal>
            <Button
              variant='outline'
              size='lg'
              className='bg-primary text-primary-foreground hover:bg-primary/20 transition-all duration-300'
            >
              Связаться с нами
            </Button>
          </ContactUsModal>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-10 w-10 rounded-full hover:bg-primary/10 transition-colors'
                  asChild
                >
                  <Link
                    href='https://t.me/murrmafia'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Telegram группа MurrMafia'
                  >
                    <div className='relative'>
                      <Send className='w-6 h-6 text-primary' />
                      <div className='absolute -inset-3 border border-primary/20 rounded-full'></div>
                    </div>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='bottom' align='center'>
                <p>Telegram группа MurrMafia</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
