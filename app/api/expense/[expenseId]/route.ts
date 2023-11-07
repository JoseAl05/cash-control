import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { expenseId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { value, description, dateOfExpense } = body;

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.expenseId) {
      return new NextResponse('Expense Id is required', { status: 400 });
    }

    if (!value || !description || !dateOfExpense) {
      return new NextResponse('Missing required field/s', { status: 400 });
    }

    const expense = await db.expense.update({
      where: {
        id: params.expenseId,
      },
      data: {
        value,
        description,
        date_of_expense: dateOfExpense,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.log('EXPENSE PATCH', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { expenseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.expenseId) {
      return new NextResponse('Expense Id is required', { status: 400 });
    }

    const expense = await db.expense.delete({
      where: {
        id: params.expenseId,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.log('EXPENSE DELETE', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
