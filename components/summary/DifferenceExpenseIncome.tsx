'use client'

import { Expense, Income } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DifferenceExpenceIncomeProps {
    incomes: Income[];
    expenses: Expense[];
}

const DifferenceExpenseIncome = ({
    incomes,
    expenses
}: DifferenceExpenceIncomeProps) => {

    const totalIncome = incomes.reduce((sum, income) => sum + income.value, 0);
    const totalIncomeFormatted = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(totalIncome);

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);
    const totalExpensesFormatted = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(totalExpenses);

    const differenceExpenseIncome = totalIncome - totalExpenses
    const differenceExpenseIncomeFormatted = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(differenceExpenseIncome);

    return (
        <Card className='w-1/2 mt-5 mx-auto'>
            <CardHeader className='flex flex-row items-center justify-center space-y-0 space-x-3 pb-2'>
                <CardTitle className='text-2xl font-medium'>
                    Diferencia
                </CardTitle>
                {
                    differenceExpenseIncome > totalIncome && (
                        <DollarSign className='h-4 w-4 text-muted-foreground' color='red' />
                    )
                }
                {
                    differenceExpenseIncome < totalIncome && differenceExpenseIncome !== 0 && (
                        <DollarSign className='h-4 w-4 text-muted-foreground' color='green' />
                    )
                }
                {
                    differenceExpenseIncome === 0 && (
                        <DollarSign className='h-4 w-4 text-muted-foreground' color='yellow' />
                    )
                }
            </CardHeader>
            <CardContent>
                <p
                    className={cn(
                        'text-3xl text-center font-bold',
                        differenceExpenseIncome > totalIncome && 'text-red-700',
                        differenceExpenseIncome < totalIncome && 'text-green-700',
                        differenceExpenseIncome === 0 && 'text-yellow-300'
                    )}
                >
                    {differenceExpenseIncomeFormatted}
                </p>
            </CardContent>
        </Card>
    );
}

export default DifferenceExpenseIncome;