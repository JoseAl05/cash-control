
import { UserButton, currentUser } from '@clerk/nextjs';
import { ModeToggle } from '../theme-toggle/ModeToggle';
import Link from 'next/link';
import { Banknote } from 'lucide-react';

const Navbar = async () => {

    const user = await currentUser();

    return (
        <div className='relative z-10 w-auto lg:w-full bg-[#e2edf7] shadow-sm dark:bg-[#3f60a2] lg:fixed'>
            <nav className='border-b-[1px] p-3'>
                <div className='flex flex-col items-center justify-between gap-x-3 md:flex-row lg:flex-row'>
                    <Link href='/' className='text-2xl text-white font-bold uppercase mx-10'>
                        <Banknote className='h-20 w-20' color='black' fill='green' />
                    </Link>
                    <div className='flex flex-row justify-center items-center gap-x-3 pt-5 lg:pt-0'>
                        <ModeToggle />
                        {
                            user ? (
                                <UserButton afterSignOutUrl='/'/>
                            ) : (
                                <Link href='/sign-in' className='bg-[#3f60a2] hover:bg-[#4c7ad3] transition-all duration-300 ease-in-out rounded-lg px-5 py-2 text-white font-bold uppercase'>
                                    Ingresar
                                </Link>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;