'use client'

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const DeleteFilters = () => {

    const router = useRouter();

    const cleanFilters = () => {
        router.push('/');
    }

    return (
        <Button size='lg' variant='destructive' onClick={cleanFilters} className='my-10'>
            Limpiar filtros
        </Button>
    );
}

export default DeleteFilters;