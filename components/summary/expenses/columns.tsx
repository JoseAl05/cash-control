'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    description: string;
    value: number;
    date_of_expense: Date;
}

export const columnsExpenses: ColumnDef<Payment>[] = [
    {
        accessorKey: 'description',
        header: 'Descripcion',
    },
    {
        accessorKey: 'value',
        header: 'Gasto',
        cell:({row}) => {
            const amount = parseFloat(row.getValue('value'))
            const formatted = new Intl.NumberFormat('es-CL',{
                style:'currency',
                currency:'CLP'
            }).format(amount);
            return <div className='text-right font-medium'>{formatted}</div>
        }
    },
    {
        accessorKey: 'date_of_expense',
        header: 'Fecha Gasto',
        cell: ({ row }) => {
            const day = row.original.date_of_expense.getDate();
            const month = row.original.date_of_expense.getMonth() + 1;
            const year = row.original.date_of_expense.getFullYear();

            return `${day}/${month}/${year}`;
        }
    }
]
