import * as z from 'zod';

export const SignupFormSchema = z.object({
  email: z.string().email('enter_valid_email'),
  password: z.string().min(8, 'password_short').max(64, 'password_long'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type SignupFormData = z.infer<typeof SignupFormSchema>;
