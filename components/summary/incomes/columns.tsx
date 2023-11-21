'use client'

import { ColumnDef } from '@tanstack/react-table'
import IncomeActions from './IncomeActions';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Income = {
    id:string;
    value: number;
    income_type: string;
    date_of_income: Date;
}

export const columnsIncomes: ColumnDef<Income>[] = [
    {
        accessorKey: 'value',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='text-sm sm:text-lg'
                >
                    Ingreso
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('value'))
            const formatted = new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP'
            }).format(amount);
            return <div className='text-right font-medium'>{formatted}</div>
        }
    },
    {
        accessorKey: 'income_type',
        header: 'Tipo de Ingreso',

    },
    {
        accessorKey: 'date_of_income',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='text-sm sm:text-lg'
                >
                    Fecha Ingreso
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const day = row.original.date_of_income.getDate();
            const month = row.original.date_of_income.getMonth() + 1;
            const year = row.original.date_of_income.getFullYear();

            return `${day}/${month}/${year}`;
        }
    },
    {
        id: 'actions',
        cell: ({row}) => <IncomeActions income={row.original}/>
    }
]
