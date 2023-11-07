'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Expense } from '@prisma/client';
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
import { Row } from '@tanstack/react-table';
import { Payment } from './columns';

interface ExpenseActionsProps {
    expenseId: string;
    value: number;
    description: string;
    dateOfExpense: Date;
}

const ExpenseActions = ({
    expenseId,
    value,
    description,
    dateOfExpense
}: ExpenseActionsProps) => {

    const router = useRouter();
    const { onOpen, isOpen } = useModal();

    const deleteExpense = async () => {
        const isLoading = toast.loading('Eliminando...');

        await axios.delete(`/api/expense/${expenseId}`)
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

            <EditExpenseModal
                expenseId={expenseId}
                value={value}
                description={description}
                dateOfExpense={dateOfExpense}
            />

            <div className='flex justify-center gap-x-2'>
                <AlertDialog>
                    <AlertDialogTrigger className='bg-red-700 rounded-lg p-2 text-sm'>Eliminar</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro que quiere eliminar el siguiente gasto?: {value}.</AlertDialogTitle>
                            <AlertDialogDescription>
                                Está acción no se puede deshacer.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button onClick={deleteExpense} variant='destructive'>Eliminar</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button id='edit-expense' onClick={() => { onOpen('editExpense') }} size='sm' variant='primary'>
                    Modificar
                </Button>

            </div>
        </>
    );
}

export default ExpenseActions;