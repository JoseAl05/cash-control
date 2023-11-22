'use client'

import * as XLSX from "xlsx";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableExpenses } from './data-table';
import { columnsExpenses } from './columns';
import { useModal } from '@/hooks/useModal';
import { Expense } from '@prisma/client';
import axios from 'axios';
import Papa from "papaparse";
import format from 'date-fns/format';

interface RegisterExpenseProps {
    expenses: Expense[];
}

const RegisterExpense = ({
    expenses,
}: RegisterExpenseProps) => {
    const { onOpen } = useModal();

    const todayDate = new Date();
    const formattedTodayDate = format(todayDate, 'dd-MM-yyyy');

    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = "xlsx";

    const dataToExport = expenses.map(expense => (
        {
            Gasto: expense.value,
            Descripcion: expense.description,
            Fecha_Gasto: expense.date_of_expense
        }
    ))


    const exportDataToCSV = () => {

        const csv = Papa.unparse(dataToExport);

        const csvBlob = new Blob([csv], { type: "text/csv" });

        const csvUrl = URL.createObjectURL(csvBlob);

        const link = document.createElement("a");
        link.href = csvUrl;
        link.download = `${formattedTodayDate}_Resumen_gastos.csv`;

        link.click();

        URL.revokeObjectURL(csvUrl);
    }

    const exportDataToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Gastos");
        XLSX.writeFile(wb, `${formattedTodayDate}_Resumen_gastos.${fileExtension}`);

    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className='bg-background p-3 rounded-lg outline transition hover:bg-black hover:outline-none hover:text-white dark:outline-none dark:hover:bg-primary-foreground'>Opciones</DropdownMenuTrigger>
                <DropdownMenuContent className='text-center'>
                    <DropdownMenuLabel className='text-xl font-bold'>Gastos</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem id='register-expense' onClick={() => { onOpen('createExpense') }} className='py-3'>
                        Registrar Gasto
                    </DropdownMenuItem>
                    <DropdownMenuLabel className='text-xl font-bold'>Descargas</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem id='download-expense-csv' onClick={exportDataToCSV} className='py-3'>
                        Descargar CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem id='download-expense-excel' onClick={exportDataToExcel} className='py-3'>
                        Descargar Excel
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DataTableExpenses columns={columnsExpenses} data={expenses} />


        </>
    );
}

export default RegisterExpense;