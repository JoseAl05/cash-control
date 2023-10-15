import { Income } from '@prisma/client';

interface TotalIncomesProps {
    incomes: Income[];
}

const TotalIncomes = ({
    incomes
}: TotalIncomesProps) => {

    const totalIncome = incomes.reduce((sum, income) => sum + income.value, 0);
    const totalIncomeFormatted = new Intl.NumberFormat('es-CL',{
        style:'currency',
        currency:'CLP'
    }).format(totalIncome);

    return (
        <div className='flex flex-row justify-center gap-x-2'>
            <h1 className='text-3xl font-medium uppercase'>Total Ingresos: </h1>
            <p className='text-3xl font-bold text-green-700'>{totalIncomeFormatted}</p>
        </div>
    );
}

export default TotalIncomes;