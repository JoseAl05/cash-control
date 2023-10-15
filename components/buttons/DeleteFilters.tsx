'use client'

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const DeleteFilters = () => {

    const router = useRouter();

    const cleanFilters = () => {
        router.push('/');
    }

    return (
        <Button size='sm' variant='destructive' onClick={cleanFilters}>
            Limpiar filtros
        </Button>
    );
}

export default DeleteFilters;