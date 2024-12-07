import { ALLOWED_FIELDS, getDefaultFields } from '@/app/api/users/utils'
import { Prisma } from '@prisma/client'

/**
 * Builds a Prisma select clause based on requested fields.
 * Returns default fields if none or no valid fields are specified.
 */
export function buildSelectClause(fields?: string): Prisma.UserSelect {
  if (!fields) {
    return getDefaultFields();
  }

  const requestedFields = fields.split(',').map((f) => f.trim()) as (keyof Prisma.UserSelect)[];
  const select: Prisma.UserSelect = {};

  for (const field of requestedFields) {
    if (!ALLOWED_FIELDS.has(field)) continue; // Skip unknown fields

    if (field === 'location') {
      select.location = { select: { city: true, country: true } };
    } else {
      select[field] = true;
    }
  }

  // If no valid fields were selected, fallback to default
  return Object.keys(select).length === 0 ? getDefaultFields() : select;
}

/**
 * Builds a Prisma where clause based on gender, city, and country filters.
 */
export function buildWhereClause(gender?: string, city?: string, country?: string): Prisma.UserWhereInput {
  return {
    ...(gender && { gender }),
    ...(city || country
      ? {
          location: {
            ...(city && { city }),
            ...(country && { country }),
          },
        }
      : {}),
  };
}