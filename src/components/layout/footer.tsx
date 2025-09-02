import { Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0'>
          <div className='flex flex-col items-center md:items-start space-y-4 md:space-y-2'>
            <Link href='/' className='flex items-center space-x-2'>
              <img
                src='/logo.png'
                alt='logo'
                className='h-8 w-auto transition-transform'
              />
              <span className='text-lg font-bold'>cat-house</span>
            </Link>
            <p className='text-sm text-muted-foreground text-center md:text-left max-w-xs'>
              A curated list of awesome cats cared by cat-house.
            </p>
          </div>
          <div className='flex flex-col items-center md:items-end space-y-4'>
            <p className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} cat-house. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
