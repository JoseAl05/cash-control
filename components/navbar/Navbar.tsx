

import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from '../theme-toggle/ModeToggle';
import Link from 'next/link';
import { Banknote } from 'lucide-react';

const Navbar = () => {
    return (
        <div className='fixed z-10 w-full bg-[#e2edf7] shadow-sm dark:bg-[#3f60a2]'>
            <nav className='border-b-[1px] p-3'>
                <div className='flex flex-col items-center justify-between gap-x-3 md:flex-row lg:flex-row'>
                    <Link href='/' className='text-2xl text-white font-bold uppercase mx-10'>
                        <Banknote className='h-20 w-20' color='black' fill='green' />
                    </Link>
                    <div className='flex flex-row items-center justify-center gap-x-5 text-foreground text-xl dark:text-white'>
                        <Link href='/gastos' className='transition-all hover:scale-110'>
                            Gastos
                        </Link>
                        <Link href='/ingresos' className='transition-all hover:scale-110'>
                            Ingresos
                        </Link>
                    </div>
                    <div className='flex flex-row justify-center items-center gap-x-3 pt-5 lg:pt-0'>
                        <ModeToggle />
                        <UserButton />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;