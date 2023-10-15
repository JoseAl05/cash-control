import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from '../theme-toggle/ModeToggle';

const Navbar = () => {
    return (
        <div className='fixed z-10 w-full bg-[#007BFF] shadow-sm'>
            <nav className='border-b-[1px] p-3'>
                <div className='flex flex-col items-center justify-between gap-x-3 md:flex-row lg:flex-row'>
                    <h1 className='text-2xl text-white font-bold uppercase mx-10'>Cash Control</h1>
                    <div className='flex flex-col items-center justify-center gap-x-5 text-white text-lg md:flex-row lg:flex-row'>
                        <a href='#' className='transition-all hover:scale-110'>
                            Gastos
                        </a>
                        <a href='#' className='transition-all hover:scale-110'>
                            Ingresos
                        </a>
                        <ModeToggle />
                        <UserButton />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;