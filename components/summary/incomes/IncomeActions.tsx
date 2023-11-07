'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Income } from '@prisma/client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import EditExpenseModal from '@/components/modal/EditExpenseModal';
import EditIncomeModal from '@/components/modal/EditIncomeModal';

interface IncomeActionsProps {
    income: Income;
}

const IncomeActions = ({
    income
}: IncomeActionsProps) => {

    const router = useRouter();
    const { onOpen,isOpen } = useModal();

    const deleteIncome = async () => {
        const isLoading = toast.loading('Eliminando...');

        await axios.delete(`/api/income/${income.id}`)
            .then(() => {
                toast.dismiss(isLoading);
                toast.success('Item eliminado con éxito!');
                router.refresh();
            })
            .catch(() => {
                toast.error('Error al eliminar item. Por favor intentelo denuevo.');
            })
            .finally(() => {
                toast.dismiss(isLoading);
            })
    }

    return (
        <>
            {
                isOpen && (
                    <EditIncomeModal
                        incomeId={income.id}
                        value={income.value}
                        incomeType={income.income_type}
                        dateOfIncome={income.date_of_income}
                    />
                )
            }
            <div className='flex justify-center gap-x-2'>
                <AlertDialog>
                    <AlertDialogTrigger className='bg-red-700 rounded-lg p-2 text-sm'>Eliminar</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro que quiere eliminar este item?.</AlertDialogTitle>
                            <AlertDialogDescription>
                                Está acción no se puede deshacer.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button onClick={deleteIncome} variant='destructive'>Eliminar</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button id='edit-income' onClick={() => { onOpen('editIncome') }} size='sm' variant='primary'>
                    Modificar
                </Button>

            </div>
        </>
    );
}

export default IncomeActions;