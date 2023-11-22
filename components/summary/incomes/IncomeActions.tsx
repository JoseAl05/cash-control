'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
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
import { CircleDashed } from 'lucide-react';
import { EditIncomeType } from '@/types';

interface IncomeActionsProps {
    income: EditIncomeType;
}

const IncomeActions = ({
    income
}: IncomeActionsProps) => {

    const router = useRouter();
    const { onOpen, isOpen } = useModal();
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteIncome = async () => {
        const isLoading = toast.loading('Eliminando...');
        setIsDeleting(true);

        await axios.delete(`/api/income/${income.id}`)
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
                toast.dismiss(isLoading);
                setIsDeleting(false);
            })
    }

    return (
        <div className='flex justify-center gap-x-2'>
            <AlertDialog>
                <AlertDialogTrigger className='bg-red-700 rounded-lg p-2 text-sm text-white'>Eliminar</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro que quiere eliminar el siguiente gasto?: {income.value}.</AlertDialogTitle>
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

                                <Button onClick={deleteIncome} variant='destructive'>Eliminar</Button>
                            )
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger className='bg-blue-700 rounded-lg p-2 text-sm text-white' onClick={() => { onOpen('editIncome') }}>Modificar</AlertDialogTrigger>
                <AlertDialogContent>
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
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default IncomeActions;