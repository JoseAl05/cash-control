import ExpenseChart from '@/components/charts/ExpenseChart';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from 'next/link';

const ExpensesPage = async () => {

    const expenses = await db.expense.findMany();
    const incomes = await db.income.findMany();

    return (
        <div className='flex flex-col items-center justify-center gap-y-5 h-screen'>
            <h1 className='text-5xl'>
                Gastos
            </h1>
            <ExpenseChart
                expenses={expenses}
                incomes={incomes}
            />
        </div>
    );
}

export default ExpensesPage;