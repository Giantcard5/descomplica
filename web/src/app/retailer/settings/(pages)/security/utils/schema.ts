import { z } from 'zod';

export const formSchema = z.object({
    current_password: z.string().min(1, { message: 'Current password is required' }),
    new_password: z.string().min(1, { message: 'New password is required' }),
    confirm_password: z.string().min(1, { message: 'Confirm password is required' }),
});

export type FormSchema = z.infer<typeof formSchema>;
