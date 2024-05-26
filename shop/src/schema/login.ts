import * as z from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email('enter_valid_email'),
  password: z.string().min(8, 'password_short').max(64, 'password_long'),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
