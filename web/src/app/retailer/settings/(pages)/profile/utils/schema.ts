import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    photoUrl: z.string().min(1, { message: 'Photo URL is required' }),
    bio: z.string().min(1, { message: 'Bio is required' }),
});

export type FormSchema = z.infer<typeof formSchema>;