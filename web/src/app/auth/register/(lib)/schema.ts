import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    type: z.enum(['retailer', 'industry'], { message: 'Account type is required' }),
});

export type FormSchema = z.infer<typeof formSchema>;