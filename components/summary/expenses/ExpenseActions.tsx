'use client'

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { Expense } from '@prisma/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CircleDashed, DollarSign, CalendarIcon } from 'lucide-react';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EditExpenseModal from '@/components/modal/EditExpenseModal';
import { Payment } from './columns';

interface ExpenseActionsProps {
    expense: Expense;
}


const ExpenseActions = ({
    expense
}: ExpenseActionsProps) => {

    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const { isOpen, onClose, type, onOpen } = useModal();


    const deleteExpense = async () => {
        const isLoading = toast.loading('Eliminando...');
        setIsDeleting(true);

        await axios.delete(`/api/expense/${expense.id}`)
            .then(() => {
                toast.dismiss(isLoading);
                setIsDeleting(false);
                toast.success('Item eliminado con éxito!');
                router.refresh();
            })
            .catch(() => {
                setIsDeleting(false);
                toast.error('Error al eliminar item. Por favor intentelo denuevo.');
            })
            .finally(() => {
                setIsDeleting(false);
                toast.dismiss(isLoading);
            })

    }


    return (
        <div className='flex justify-center gap-x-2'>
            <AlertDialog>
                <AlertDialogTrigger className='bg-red-700 rounded-lg p-2 text-sm'>Eliminar</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro que quiere eliminar el siguiente gasto?: {expense.value}.</AlertDialogTitle>
                        <AlertDialogDescription>
                            Está acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        {
                            isDeleting ? (
                                <Button variant='destructive' disabled={isDeleting}>
                                    <CircleDashed size={20} className='mx-2 animate-spin' />
                                    Eliminando...
                                </Button>
                            ) : (
                                <Button onClick={deleteExpense} variant='destructive'>Eliminar</Button>
                            )
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger className='bg-blue-700 rounded-lg p-2 text-sm' onClick={() => { onOpen('editExpense') }}>Modificar</AlertDialogTrigger>
                <AlertDialogContent>
                    {
                        isOpen && (
                            <EditExpenseModal
                                expenseId={expense.id}
                                value={expense.value}
                                description={expense.description}
                                dateOfExpense={expense.date_of_expense}
                            />
                        )
                    }
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default ExpenseActions;