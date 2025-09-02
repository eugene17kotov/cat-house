import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FishSymbol, Coffee } from 'lucide-react';

export default function Donation() {
  return (
    <Link href='#' target='_blank' rel='noopener noreferrer'>
      <Button
        className='
          fixed bottom-4 right-4 z-50 h-20
          flex flex-col gap-2 
          rounded-full p-4 
          bg-[#ffe433]/90 hover:bg-[#ffe433] 
          text-black font-semibold 
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-[#ffe433] focus:ring-opacity-50
        '
      >
        <div className='flex items-center gap-2'>
          <Coffee
            width={30}
            height={30}
            className='transition-transform duration-300 ease-in-out group-hover:rotate-12'
          />
          <p className='hidden line-through sm:inline'>Buy me a coffee</p>
        </div>
        <div className='flex items-center gap-2'>
          <FishSymbol
            width={30}
            height={30}
            className='transition-transform duration-300 ease-in-out group-hover:rotate-12'
          />
          <p className='hidden bold sm:inline'>Купи котикам еды</p>
        </div>
      </Button>
    </Link>
  );
}
