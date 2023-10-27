'use client'

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useModal } from '@/hooks/useModal';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CircleDashed, DollarSign, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const formSchema = z.object({
    value: z.coerce
        .number({
            required_error: 'Valor Requerido.',
        })
        .int({
            message: 'El valor debe ser un numero.'
        }),
    description: z.string().min(5, { message: 'La descripcion debe tener al menos 5 carácteres' }),
    dateOfExpense: z.date({
        required_error: 'Se requiere una fecha del gasto que realizó'
    })

})

export const revalidate = 0;

const ExpenseModal = () => {

    const { isOpen, onClose, type, onOpen } = useModal();

    const isModalOpen = isOpen && type === 'createExpense';

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: 0,
            description: ''
        },
    })

    const isSubmitting = form.formState.isSubmitting;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        await axios.post('/api/expense', values);

        form.reset();
        onClose();
        window.location.reload();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden dark:bg-[#313338]'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold text-black dark:text-white'>
                        Registrar Gasto.
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
                                name='description'
                                render={({ field }) => (
                                    <FormItem className='pt-5'>
                                        <FormLabel className='text-lg'>Descripcion del Gasto.</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Indique pequeña descripcion de lo que gastó'
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Ingrese el nombre del producto o una pequeña descripcion de lo que gastó.
                                        </FormDescription>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfExpense"
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
                                                    selected={field.value}
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
                            <DialogFooter className='px-6 py-4'>
                                {
                                    isSubmitting ? (
                                        <>
                                            <Button variant='primary' disabled>
                                                <CircleDashed size={20} className='mx-2 animate-spin' />
                                                Registrando...
                                            </Button>
                                        </>
                                    ) : (
                                        <Button variant='primary' type='submit'>
                                            Registrar
                                        </Button>
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

export default ExpenseModal;