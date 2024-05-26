import { z } from 'zod';
import { FILE_SIZE_LIMIT } from '@/constants';

export const ProductFormSchema = z.object({
  name: z.string({ message: 'required' }).min(3, 'short_field').max(255, 'long_field'),
  description: z.string({ message: 'required' }).min(3, 'short_field').max(255, 'long_field'),
  slug: z.string(),
  coverImage: z.object(
    {
      dataURL: z.string().optional(),
      key: z.string().optional(),
      file: z.instanceof(File).refine((file) => file.size < FILE_SIZE_LIMIT, {
        message: 'file_size_limit',
      }),
    },
    { message: 'required' }
  ),
  price: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number()),
  isPublished: z.boolean().optional(),
  quantity: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number()),
});

export type ProductFormData = z.infer<typeof ProductFormSchema>;
