'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { months } from '@/constants';

const MonthFilter = () => {

    let currentQuery = {};

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const onClick = (monthValue: string) => {

        let currentMonth = params.get('month');
        let currentYear = params.get('year');

        if (currentMonth) {
            currentQuery.month = currentMonth;
        }
        if (currentYear) {
            currentQuery.year = currentYear;
        }

        const updatedQuery = {
            ...currentQuery,
            month: monthValue
        };

        if (currentMonth === monthValue.toString()) {
            delete updatedQuery.month;
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: updatedQuery
        }, {
            skipNull: true
        });

        router.push(url);
    }

    return (
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
            {
                months.map(month => (
                    <div
                        key={month.value}
                        onClick={() => onClick(month.value)}
                        className={
                            cn(`
                                inline-flex
                                items-center
                                justify-center
                                p-1
                                rounded-md
                                text-white
                                text-md
                                font-medium
                                ring-offset-background
                                cursor-pointer
                                bg-[#007BFF]
                                transition-colors
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-ring
                                focus-visible:ring-offset-2
                                disabled:pointer-events-none
                                disabled:opacity-50
                                hover:bg-[#007BFF]/70
                            `,
                                params.get('month') === month.value && params.get('month') ? 'bg-black/90 text-white dark:bg-white dark:text-black' : ''
                            )}
                    >
                        {month.label}
                    </div>
                ))
            }
        </div>
    );
}

export default MonthFilter;