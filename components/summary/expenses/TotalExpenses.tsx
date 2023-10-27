import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@prisma/client';
import { DollarSign } from 'lucide-react';

interface TotalExpensesProps {
    expenses: Expense[];
}

const TotalExpenses = ({
    expenses
}: TotalExpensesProps) => {

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);
    const totalExpensesFormatted = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(totalExpenses);

    return (
        <Card className='w-full'>
            <CardHeader className="flex flex-row items-center justify-center space-y-0 space-x-5 pb-2">
                <CardTitle className="text-2xl font-medium">
                    Total Gastos
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' color='green'/>
            </CardHeader>
            <CardContent>
                <p className="text-3xl text-center font-bold text-red-700">{totalExpensesFormatted}</p>
            </CardContent>
        </Card>
    );
}

export default TotalExpenses;