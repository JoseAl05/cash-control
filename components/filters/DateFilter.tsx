'use client'


import { useEffect, useState } from 'react'
import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import qs from 'query-string';

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { usePathname, useRouter } from 'next/navigation'

interface Query {
    initialDate?: string;
    endDate?: string;
}

const DateFilter = () => {

    const router = useRouter();
    const pathname = usePathname();



    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined
    });

    const setQuery = () => {
        let currentQuery: Query = {}
        if (date?.from) {
            currentQuery.initialDate = date.from.toDateString();
        }

        if (date?.to) {
            currentQuery.endDate = date.to.toDateString();
        }

        const updatedQuery = {
            ...currentQuery
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: updatedQuery
        }, {
            skipNull: true
        });

        router.push(url);
    }

    const cleanFilters = () => {
        router.push('/');
        setDate(undefined);
    }

    return (
        <div className='flex flex-col items-center gap-y-5'>
            <h2 className='text-lg text-center'>Seleccione un rango de fechas.</h2>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id='date'
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Seleccione dos fechas</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='center'>
                    <Calendar
                        initialFocus
                        mode='range'
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
            <div className='flex flex-row justify-center items-center gap-x-5'>
                <Button onClick={setQuery}>
                    Aplicar Filtro
                </Button>
                <Button variant='destructive' onClick={cleanFilters} className='my-10'>
                    Limpiar filtros
                </Button>
            </div>
        </div>
    )
}

export default DateFilter;