import { prisma } from '@/app/api/users/utils'
import { Prisma } from '@prisma/client'

/**
 * Fetches users and total count from the database based on where and select clauses.
 */
export async function fetchUsersAndCount(
  where: Prisma.UserWhereInput,
  select: Prisma.UserSelect,
  page: number,
  limit: number
) {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total };
}