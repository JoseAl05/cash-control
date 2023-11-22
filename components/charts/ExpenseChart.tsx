'use client'

import { Expense, Income } from '@prisma/client';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface ExpenseChartProps {
    expenses: Expense[];
    incomes: Income[];
}

const ExpenseChart = ({
    expenses,
    incomes
}: ExpenseChartProps) => {


    const formattedData = expenses.map(expense => (
        {
            valueExpense:expense.value,
            description:expense.description,
            dateOfExpense:`${expense.date_of_expense.getDate()}/${expense.date_of_expense.getMonth()}/${expense.date_of_expense.getFullYear()}`
        }
    ));

    return (
        <LineChart width={1000} height={300} data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="dateOfExpense" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
}

export default ExpenseChart;