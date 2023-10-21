import { Button } from '@/components/ui/button';
import Link from 'next/link';

const IncomesPage = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-y-5 h-screen'>
            <h1 className='text-5xl'>
                En Construcción
            </h1>
            <Link href='/'>
                <Button variant='primary' size='lg'>
                    Ir al Home.
                </Button>
            </Link>
        </div>
    );
}

export default IncomesPage;