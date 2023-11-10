import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { incomeId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { value, incomeType, dateOfIncome } = body;

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.incomeId) {
      return new NextResponse('Income ID is required', { status: 400 });
    }

    if (!value || !incomeType || !dateOfIncome) {
      return new NextResponse('Missing required field/s', { status: 400 });
    }

    const income = await db.income.update({
      where: {
        id: params.incomeId,
      },
      data: {
        value,
        income_type:incomeType,
        date_of_income: dateOfIncome,
      },
    });

    return NextResponse.json(income);
  } catch (error) {
    console.log('INCOME PATCH', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { incomeId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.incomeId) {
      return new NextResponse('Income ID is required', { status: 400 });
    }

    const income = await db.income.delete({
      where: {
        id: params.incomeId,
      },
    });

    return NextResponse.json(income);
  } catch (error) {
    console.log('INCOME DELETE', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
