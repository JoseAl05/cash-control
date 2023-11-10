import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useModal } from '@/hooks/useModal';
import { CircleDashed, DollarSign, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { incomeTypes } from '@/constants';
import { AlertDialogCancel } from '../ui/alert-dialog';

interface EditIncomeModalProps {
    incomeId: string;
    value: number;
    incomeType: string;
    dateOfIncome: Date;
}

const formSchema = z.object({
    value: z.coerce
        .number({
            required_error: 'Valor Requerido.',
        })
        .int({
            message: 'El valor debe ser un numero.'
        }),
    incomeType: z.string({
        required_error: 'Se requiere un tipo de ingreso'
    }).min(1, {
        message: 'Seleccione una opción.'
    }),
    dateOfIncome: z.date({
        required_error: 'Se requiere una fecha del ingreso que obtuvo.'
    })
})

const EditIncomeModal = ({
    incomeId,
    value,
    incomeType,
    dateOfIncome
}: EditIncomeModalProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const { isOpen, onClose, type, onOpen } = useModal();

    const isModalOpen = isOpen && type === 'editIncome';

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: value,
            incomeType: incomeType,
            dateOfIncome: dateOfIncome
        },
    })

    const isSubmitting = form.formState.isSubmitting;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log(values);
        await axios.patch(`/api/income/${incomeId}`, values);

        form.reset();
        onClose();
        window.location.reload();
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open={isModalOpen}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden dark:bg-[#313338]'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold text-black dark:text-white'>
                        Modificar Ingreso.
                    </DialogTitle>
                </DialogHeader>
                <div className='p-6'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='text-black dark:text-white'>
                            <FormField
                                control={form.control}
                                name='value'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-lg'>Valor Gastado.</FormLabel>
                                        <div className='flex flex-row items-center'>
                                            <DollarSign size={20} className='absolute' />
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    placeholder='Ingrese la cantidad que gastó'
                                                    value={value}
                                                    className='pl-6 pb-2'
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='incomeType'
                                render={({ field }) => (
                                    <FormItem className='mt-5'>
                                        <FormLabel className='text-lg'>Tipo de Ingreso.</FormLabel>
                                        <Select
                                            name='incomeType'
                                            disabled={isSubmitting}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {incomeTypes.map(incomeType => (
                                                    <SelectItem
                                                        key={incomeType.value}
                                                        value={incomeType.value}
                                                    >
                                                        {incomeType.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>Seleccione un tipo de ingreso.</FormDescription>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfIncome"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col mt-5">
                                        <FormLabel className='text-lg'>Fecha del Gasto.</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        id='calendar'
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Seleccione una fecha.</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={dateOfIncome}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Seleccione la fecha en la que realizó el gasto.
                                        </FormDescription>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className='sm:justify-between py-4 gap-x-2'>
                                {
                                    isSubmitting ? (
                                        <>
                                            <Button variant='primary' disabled>
                                                <CircleDashed size={20} className='mx-2 animate-spin' />
                                                Modificando...
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <Button variant='primary' type='submit'>
                                                Modificar
                                            </Button>
                                        </>
                                    )
                                }
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditIncomeModal;