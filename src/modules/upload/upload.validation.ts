import z from 'zod';

const upload = z.object({ folderName: z.string() });

export const uploadValidation = { upload };

export type TUploadInput = z.infer<typeof upload>;
