import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const { value, incomeType, dateOfIncome } = await req.json();
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const income = await db.income.create({
      data: {
        value,
        income_type: incomeType,
        date_of_income: dateOfIncome,
        user_id: user.id,
      },
    });

    return NextResponse.json(income);
  } catch (error) {
    console.log('INCOME POST', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
