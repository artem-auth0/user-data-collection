import { NextResponse } from 'next/server'

/**
 * Validates if the requested page number is within the valid range given total items and limit.
 * If total = 0 and page = 1, returns empty data. If page is out of range, returns a 400 error.
 */
export function validatePageRange(page: number, total: number, limit: number) {
  const totalPages = Math.ceil(total / limit);

  if (total === 0) {
    // No records at all
    if (page > 1) {
      return {
        errorResponse: NextResponse.json({ error: 'Page number exceeds total pages' }, { status: 400 })
      };
    }
    // page = 1 with no data is valid, returns empty data later
    return { totalPages };
  }

  if (page > totalPages) {
    return {
      errorResponse: NextResponse.json({ error: 'Page number exceeds total pages' }, { status: 400 })
    };
  }

  return { totalPages };
}

/**
 * Validates the gender parameter, returning an error response if invalid.
 */
export function validateGender(gender?: string) {
  if (gender && gender !== 'male' && gender !== 'female') {
    return {
      errorResponse: NextResponse.json({ error: 'Invalid gender parameter' }, { status: 400 })
    };
  }
  return {};
}

/**
 * Validates and returns pagination parameters (page and limit).
 * Returns an error response if invalid.
 */
export function validatePagination(pageParam: string, limitParam: string) {
  const page = parseInt(pageParam, 10);
  const limit = parseInt(limitParam, 10);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      )
    };
  }

  return { page, limit };
}