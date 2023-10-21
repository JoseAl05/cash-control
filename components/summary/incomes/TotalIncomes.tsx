import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Income } from '@prisma/client';
import { DollarSign } from 'lucide-react';

interface TotalIncomesProps {
    incomes: Income[];
}

const TotalIncomes = ({
    incomes
}: TotalIncomesProps) => {

    const totalIncome = incomes.reduce((sum, income) => sum + income.value, 0);
    const totalIncomeFormatted = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(totalIncome);

    return (
        <Card className='w-full'>
            <CardHeader className="flex flex-row items-center justify-center space-y-0 space-x-5 pb-2">
                <CardTitle className="text-2xl font-medium">
                    Total Ingresos
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
                <p className="text-3xl text-center font-bold text-green-700">{totalIncomeFormatted}</p>
            </CardContent>
        </Card>
    );
}

export default TotalIncomes;