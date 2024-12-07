import { NextResponse } from 'next/server';
import { validateGender, validatePageRange, validatePagination } from '@/app/api/users/validators'
import { buildSelectClause, buildWhereClause } from '@/app/api/users/queryBuilders'
import { extractQueryParams } from '@/app/api/users/utils'
import { fetchUsersAndCount } from '@/app/api/users/dataAccess'


/**
 * Handles the GET request for /api/users.
 */
export async function GET(request: Request) {
  const { gender, city, country, pageParam, limitParam, fields } = extractQueryParams(request);

  const pagination = validatePagination(pageParam, limitParam);
  if ('errorResponse' in pagination) {
    return pagination.errorResponse;
  }

  const { page, limit } = pagination;

  const genderValidation = validateGender(gender);
  if ('errorResponse' in genderValidation) {
    return genderValidation.errorResponse;
  }

  const where = buildWhereClause(gender, city, country);
  const select = buildSelectClause(fields);

  try {
    const { users, total } = await fetchUsersAndCount(where, select, page, limit);
    const pageRangeValidation = validatePageRange(page, total, limit);

    if ('errorResponse' in pageRangeValidation) {
      return pageRangeValidation.errorResponse;
    }

    const { totalPages } = pageRangeValidation;

    const response = {
      page,
      limit,
      total,
      totalPages,
      data: users
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}