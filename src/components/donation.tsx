import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FishSymbol, Coffee } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

export default function Donation() {
  return (
    <Link
      href='https://www.sberbank.com/sms/pbpn?requisiteNumber=79999982596'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Button
        className='
          fixed bottom-4 right-4 z-50 h-20
          flex flex-col gap-2 
          rounded-3xl p-4 
          bg-[#ffe433]/90 hover:bg-[#ffe433] 
          text-black font-semibold 
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-[#ffe433] focus:ring-opacity-50
        '
        // onClick={() => {
        //   toast.info(
        //     'Данный функционал в разработке. Спасибо за ваше желание помочь!',
        //   );
        // }}
      >
        <div className='flex items-center gap-2'>
          <Image
            src='/bmc-logo-contour-only.svg'
            alt='Buy me a coffee'
            width={10}
            height={10}
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
