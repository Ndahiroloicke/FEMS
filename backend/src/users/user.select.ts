/**
 * Prisma select that intentionally omits passwordHash, resetToken and
 * resetTokenExpiresAt so they are never serialized in any API response.
 */
export const safeUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;
