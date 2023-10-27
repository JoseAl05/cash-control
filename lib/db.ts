import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url:
          process.env.NODE_ENV === 'development'
            ? process.env.DATABASE_URL_DEV
            : process.env.DATABASE_URL_PROD,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
