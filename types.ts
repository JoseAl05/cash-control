import { Expense, Income } from '@prisma/client';

export type EditExpenseType = Omit<
  Expense,
  'user_id' | 'createdAt' | 'updatedAt'
>;

export type EditIncomeType = Omit<
  Income,
  'user_id' | 'createdAt' | 'updatedAt'
>;
