import z from 'zod';

// validation helper
export const zSlug = (errorMessage: string) => {
  return z
    .string('Slug is required')
    .trim()
    .nonempty('Slug can not be empty')
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, errorMessage);
};
