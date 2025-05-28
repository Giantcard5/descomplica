import { z } from 'zod';

export const formSchema = z.object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export type FormSchema = z.infer<typeof formSchema>;