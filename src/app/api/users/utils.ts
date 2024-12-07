import { Prisma, PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export const ALLOWED_FIELDS: Set<keyof Prisma.UserSelect> = new Set([
  'id', 'name', 'email', 'gender', 'createdAt', 'location'
]);

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

/**
 * Returns the default fields to select when none are specified.
 */
export function getDefaultFields(): Prisma.UserSelect {
  return {
    id: true,
    name: true,
    email: true,
    gender: true,
    createdAt: true,
  };
}

/**
 * Extracts query parameters from the request URL.
 */
export function extractQueryParams(request: Request) {
  const { searchParams } = new URL(request.url);

  const gender = searchParams.get('gender') || undefined;
  const city = searchParams.get('city') || undefined;
  const country = searchParams.get('country') || undefined;
  const pageParam = searchParams.get('page') || String(DEFAULT_PAGE);
  const limitParam = searchParams.get('limit') || String(DEFAULT_LIMIT);
  const fields = searchParams.get('fields') || undefined;

  return { gender, city, country, pageParam, limitParam, fields };
}