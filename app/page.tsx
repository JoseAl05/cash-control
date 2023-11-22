import DateFilter from '@/components/filters/DateFilter';
import Navbar from '@/components/navbar/Navbar';
import DifferenceExpenseIncome from '@/components/summary/DifferenceExpenseIncome';
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

  if (searchParams?.initialDate && searchParams?.endDate) {

    const initialDate = new Date(searchParams.initialDate);
    const endDate = new Date(searchParams.endDate);

    queryIncome = {
      date_of_income: {
        gte: initialDate,
        lte: endDate
      }
    };

    queryExpense = {
      date_of_expense: {
        gte: initialDate,
        lte: endDate
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
    },
  });

  const qExpenses = await db.expense.count({
    where: {
      user_id: user.id,
      AND: [queryExpense]
    },
  })

  const incomes = await db.income.findMany({
    where: {
      user_id: user.id,
      AND: [queryIncome]
    }
  });

  const qIncomes = await db.income.count({
    where: {
      user_id: user.id,
      AND: [queryIncome]
    }
  })

  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-full gap-4 pt-52 mx-auto lg:flex-row lg:max-w-screen-xl lg:pt-32">
        <TotalIncomes
          incomes={incomes}
        />
        <TotalExpenses
          expenses={expenses}
        />
      </div>
      <DifferenceExpenseIncome
        incomes={incomes}
        expenses={expenses}
      />
      <div className='flex flex-col items-center justify-around py-10 lg:flex-row lg:items-baseline'>
        <div className='flex flex-col items-center gap-5'>
          <div className='border-2 border-slate-700 bg-white rounded-lg p-5 dark:border-slate-300 dark:bg-background'>
            <h1 className='text-4xl text-black font-bold dark:text-white'>Resumen Ingresos</h1>
            <div className='flex flex-col items-center'>
              <p className='text-slate-700 py-5 dark:text-slate-300'>Cantidad de ingresos registrados</p>
              <p className='text-3xl text-black dark:text-white'>{qIncomes}</p>
            </div>
          </div>
          <RegisterIncome
            incomes={incomes}
          />
        </div>
        <div className='flex flex-col gap-y-2'>
          <DateFilter />
        </div>
        <div className='flex flex-col items-center gap-5 my-20 lg:my-0'>
          <div className='border-2 border-slate-700 bg-white rounded-lg p-5 dark:border-slate-300 dark:bg-background'>
            <h1 className='text-4xl text-black font-bold dark:text-white'>Resumen Gastos</h1>
            <div className='flex flex-col items-center'>
              <p className='text-slate-700 py-5 dark:text-slate-300'>Cantidad de gastos registrados</p>
              <p className='text-3xl text-black dark:text-white'>{qExpenses}</p>
            </div>
          </div>
          <RegisterExpense
            expenses={expenses}
          />
        </div>
      </div>
    </main>
  )
}
