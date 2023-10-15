import { Expense } from '@prisma/client';

interface TotalExpensesProps {
    expenses: Expense[];
}

const TotalExpenses = ({
    expenses
}: TotalExpensesProps) => {

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);
    const totalExpensesFormatted = new Intl.NumberFormat('es-CL',{
        style:'currency',
        currency:'CLP'
    }).format(totalExpenses);

    return (
        <div className='flex flex-row justify-center gap-x-2 mt-10'>
            <h1 className='text-3xl font-medium uppercase'>Total Gastos: </h1>
            <p className='text-4xl font-bold text-red-700'>{totalExpensesFormatted}</p>
        </div>
    );
}

export default TotalExpenses;