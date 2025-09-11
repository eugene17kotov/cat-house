import { Github, Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-4 md:py-6'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0'>
          <div className='flex flex-col items-center md:items-start space-y-4 md:space-y-2'>
            <Link href='/' className='flex items-center space-x-2'>
              <img
                src='/logo.png'
                alt='logo'
                className='h-8 w-auto transition-transform'
              />
              <span className='text-lg font-bold'>Заводские кошки</span>
            </Link>
            <p className='text-sm text-muted-foreground text-center md:text-left max-w-xs'>
              Подборка замечательных котиков для вашего дома.
            </p>
          </div>
          <div className='flex items-center space-x-4'>
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
                      href='https://t.me/kotodom_shenogina'
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='Telegram группа Заводские кошки'
                    >
                      <div className='relative'>
                        <Send className='w-6 h-6 text-primary' />
                        <div className='absolute -inset-3 border border-primary/20 rounded-full'></div>
                      </div>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='top' align='center'>
                  <p>Telegram группа Заводские кошки</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='flex flex-col items-center md:items-end space-y-4'>
            <p className='text-sm text-muted-foreground'>
              © 2021-{new Date().getFullYear()} Заводские кошки. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
