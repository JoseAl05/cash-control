'use client'

import * as XLSX from "xlsx";
import Papa from "papaparse";
import format from 'date-fns/format';
import { Button } from '@/components/ui/button';
import { columnsIncomes } from './columns';
import { DataTableIncomes } from './data-table';
import { useModal } from '@/hooks/useModal';
import { Income } from '@prisma/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface RegisterIncomeProps {
    incomes: Income[];
}

const RegisterIncome = ({
    incomes
}: RegisterIncomeProps) => {

    const { onOpen } = useModal();

    const todayDate = new Date();
    const formattedTodayDate = format(todayDate, 'dd-MM-yyyy');

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = 'xlsx';

    const dataToExport = incomes.map(income => (
        {
            Ingreso: income.value,
            Tipo_de_Ingreso: income.income_type,
            Fecha_Ingreso: income.date_of_income
        }
    ))

    const exportDataToCSV = () => {

        const csv = Papa.unparse(dataToExport);

        const csvBlob = new Blob([csv], { type: 'text/csv' });

        const csvUrl = URL.createObjectURL(csvBlob);

        const link = document.createElement('a');
        link.href = csvUrl;
        link.download = `${formattedTodayDate}_Resumen_ingresos.csv`;

        link.click();

        URL.revokeObjectURL(csvUrl);
    }

    const exportDataToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Ingresos');
        XLSX.writeFile(wb, `${formattedTodayDate}_Resumen_ingresos.${fileExtension}`);

    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className='
                        bg-background
                        p-3
                        rounded-lg
                        outline
                        transition
                        hover:bg-black
                        hover:outline-none
                        hover:text-white
                        dark:outline-none
                        dark:hover:bg-primary-
                        '
                >
                    Opciones
                </DropdownMenuTrigger>
                <DropdownMenuContent className='text-center'>
                    <DropdownMenuLabel className='text-xl font-bold'>Ingresos</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem id='register-income' onClick={() => { onOpen('createIncome') }} className='py-3'>
                        Registrar Ingreso
                    </DropdownMenuItem>
                    <DropdownMenuLabel className='text-xl font-bold'>Descargas</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem id='download-income-csv' onClick={exportDataToCSV} className='py-3'>
                        Descargar CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem id='download-income-excel' onClick={exportDataToExcel} className='py-3'>
                        Descargar Excel
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DataTableIncomes columns={columnsIncomes} data={incomes} />
        </>
    );
}

export default RegisterIncome;