'use client'

import { ColumnDef } from '@tanstack/react-table'
import ExpenseActions from './ExpenseActions';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from '@/components/ui/button';

export type Expense = {
    id: string;
    description: string;
    value: number;
    date_of_expense: Date;
}

export const columnsExpenses: ColumnDef<Expense>[] = [
    {
        accessorKey: 'description',
        header: 'Descripcion',
    },
    {
        accessorKey: 'value',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='text-sm sm:text-lg'
                >
                    Gasto
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
        accessorKey: 'date_of_expense',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className='text-sm sm:text-lg'
                >
                    Fecha de Gasto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const day = row.original.date_of_expense.getDate();
            const month = row.original.date_of_expense.getMonth() + 1;
            const year = row.original.date_of_expense.getFullYear();

            return `${day}/${month}/${year}`;
        }
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => <ExpenseActions expense={row.original} />
    }
]
