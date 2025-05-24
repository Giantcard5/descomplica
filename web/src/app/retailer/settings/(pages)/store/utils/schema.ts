import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    type: z.enum([
        'grocery',
        'pharmacy',
        'convenience',
        'hardware',
        'clothing',
        'electronics',
        'bakery',
        'butcher',
        'pet',
        'stationery',
        'beauty',
        'florist',
        'bookstore',
        'toy',
        'automotive',
        'sports',
        'furniture',
        'jewelry',
        'service',
        'other',
    ], { message: 'Store type is required' }),
    size: z.number().min(1, { message: 'Size is required' }),
    employees: z.number().min(1, { message: 'Employees is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipCode: z.string().min(1, { message: 'Zip Code is required' }),
    country: z.enum(['br', 'us', 'other'], { message: 'Country is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
});

export type FormSchema = z.infer<typeof formSchema>;