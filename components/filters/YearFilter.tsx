'use client'

import { years } from '@/constants';
import qs from 'query-string';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

const YearFilter = () => {

    let currentQuery = {};

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let currentYear = params.get('year');
        let currentMonth = params.get('month');

        if (currentYear) {
            currentQuery.year = currentYear;
        }

        if (currentMonth) {
            currentQuery.month = currentMonth;
        }

        const updatedQuery = {
            ...currentQuery,
            year: e.target.value
        };

        if(currentYear === e.target.value){
            delete updatedQuery.year;
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
        <div className='mt-5'>
            <select onChange={(e) => onChange(e)} className='w-32 p-2 rounded-lg border border-primary dark:bg-background'>
                {
                    years.map(year => (
                        <option key={year.value} value={year.value}>{year.label}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default YearFilter;