import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const expenses = await db.expense.findMany({
        where:{
            user_id:user.id
        }
    })

    return NextResponse.json(expenses);
  } catch (error) {
    console.log('EXPENSE GET', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { value, description, dateOfExpense } = await req.json();
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const expense = await db.expense.create({
      data: {
        value,
        description,
        date_of_expense:dateOfExpense,
        user_id: user.id,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.log('EXPENSE POST', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
