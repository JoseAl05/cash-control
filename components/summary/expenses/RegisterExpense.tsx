'use client'

import { Button } from '@/components/ui/button';
import { DataTableExpenses } from './data-table';
import { columnsExpenses } from './columns';
import { useModal } from '@/hooks/useModal';
import { Expense } from '@prisma/client';
import axios from 'axios';

interface RegisterExpenseProps {
    expenses: Expense[];
}

const RegisterExpense = ({
    expenses
}: RegisterExpenseProps) => {
    const { onOpen } = useModal();

    return (
        <>
            <DataTableExpenses columns={columnsExpenses} data={expenses} />
            <Button id='register-expense' onClick={() => { onOpen('createExpense') }} size='lg' variant='primary'>
                Registrar Gasto
            </Button>
        </>
    );
}

export default RegisterExpense;