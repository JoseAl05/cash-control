import DeleteFilters from '@/components/buttons/DeleteFilters';
import MonthFilter from '@/components/filters/MonthFilter';
import YearFilter from '@/components/filters/YearFilter';
import Navbar from '@/components/navbar/Navbar';
import RegisterExpense from '@/components/summary/expenses/RegisterExpense';
import TotalExpenses from '@/components/summary/expenses/TotalExpenses';
import { columnsExpenses } from '@/components/summary/expenses/columns'
import { DataTableExpenses } from '@/components/summary/expenses/data-table'
import RegisterIncome from '@/components/summary/incomes/RegisterIncome';
import TotalIncomes from '@/components/summary/incomes/TotalIncomes';
import { columnsIncomes } from '@/components/summary/incomes/columns';
import { DataTableIncomes } from '@/components/summary/incomes/data-table';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';



export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {

  let queryIncome = {};
  let queryExpense = {};

  const user = await currentUser();

  if (searchParams.month && !searchParams.year) {
    const parsedMonth = parseInt(searchParams.month);
    const year = new Date().getFullYear();
    const initialDate = new Date(year, parsedMonth - 1, 1);
    const lastDate = new Date(year, parsedMonth, 0)

    queryIncome = {
      date_of_income: {
        gte: initialDate,
        lte: lastDate
      }
    };

    queryExpense = {
      date_of_expense: {
        gte: initialDate,
        lte: lastDate
      }
    };
  }

  if (searchParams.year && !searchParams.month) {
    const parsedYear = parseInt(searchParams.year);
    const month = 0;

    const initialDate = new Date(parsedYear, month, 1);
    const lastDate = new Date(parsedYear, month + 12, 0);

    queryIncome = {
      date_of_income: {
        gte: initialDate,
        lte: lastDate
      }
    };
    queryExpense = {
      date_of_expense: {
        gte: initialDate,
        lte: lastDate
      }
    };
  }

  if (searchParams.year && searchParams.month) {
    const parsedMonth = parseInt(searchParams.month);
    const parsedYear = parseInt(searchParams.year);

    const initialDate = new Date(parsedYear, parsedMonth - 1, 1);
    const lastDate = new Date(parsedYear, parsedMonth, 0);

    queryIncome = {
      date_of_income: {
        gte: initialDate,
        lte: lastDate
      }
    };
    queryExpense = {
      date_of_expense: {
        gte: initialDate,
        lte: lastDate
      }
    };
  }

  if (!user) {
    return redirectToSignIn();
  }

  const expenses = await db.expense.findMany({
    where: {
      user_id: user.id,
      AND: [queryExpense]
    }
  });

  const incomes = await db.income.findMany({
    where: {
      user_id: user.id,
      AND: [queryIncome]
    }
  });

  return (
    <main>
      <Navbar />
      <div className="flex h-full flex-row items-baseline justify-around p-24">
        <div className='flex flex-col items-center my-auto gap-y-2'>
          <MonthFilter />
          <YearFilter />
          <DeleteFilters />
          <TotalExpenses expenses={expenses} />
          <TotalIncomes incomes={incomes} />
        </div>
      </div>
      <div className='flex flex-row items-baseline justify-around py-10'>
        <div className='flex flex-col items-center gap-5'>
          <h1 className='text-3xl text-black font-bold dark:text-white'>Resumen Gastos</h1>
          <RegisterExpense expenses={expenses} />
        </div>
        <div className='flex flex-col items-center gap-5'>
          <h1 className='text-3xl text-black font-bold dark:text-white'>Resumen Ingresos</h1>
          <RegisterIncome incomes={incomes} />
        </div>
      </div>
    </main>
  )
}
