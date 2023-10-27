'use client'

import { Button } from '@/components/ui/button';
import { columnsIncomes } from './columns';
import { DataTableIncomes } from './data-table';
import { useModal } from '@/hooks/useModal';
import { Income } from '@prisma/client';

interface RegisterIncomeProps {
    incomes: Income[];
}

const RegisterIncome = ({
    incomes
}: RegisterIncomeProps) => {

    const { onOpen } = useModal();


    return (
        <>
            <DataTableIncomes columns={columnsIncomes} data={incomes} />
            <Button id='register-income' onClick={() => onOpen('createIncome')} size='lg' variant='primary'>
                Registrar Ingreso
            </Button>
        </>
    );
}

export default RegisterIncome;