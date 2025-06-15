import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    bio: z
        .string()
        .min(1, { message: 'Bio is required' })
        .max(200, { message: 'Bio must be less than 200 characters' }),
});

export type FormSchema = z.infer<typeof formSchema>;
