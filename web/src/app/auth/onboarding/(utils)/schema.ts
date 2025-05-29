import { z } from 'zod';

export const retailerFormSchema = z.object({
    // Personal info
    dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    bio: z.string().min(1, { message: 'Bio is required' }),
    
    // Store info
    name: z.string().min(1, { message: 'Store name is required' }),
    size: z.string().min(1, { message: 'Store size is required' }),
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
    country: z.enum(['us', 'br', 'other'], { message: 'Country is required' }),
    employees: z.string().min(1, { message: 'Number of employees is required' }),
    address: z.string().min(1, { message: 'Store address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipCode: z.string().min(1, { message: 'Zip code is required' }),
    description: z.string().min(1, { message: 'Store description is required' }),

    // Preferences info
    language: z.string().min(1, { message: 'Language is required' }),
    theme: z.enum(['light', 'dark', 'system'], { message: 'Theme is required' }),
    dateFormat: z.enum(['dd_mm_yyyy', 'mm_dd_yyyy', 'yyyy_mm_dd'], { message: 'Date format is required' }),
    notification: z.enum(['real-time', 'daily', 'weekly', 'never'], { message: 'Notification preferences are required' }),
});

export const personalInfoSchema = retailerFormSchema.pick({
    dateOfBirth: true,
    phoneNumber: true,
    bio: true,
});

export const storeInfoSchema = retailerFormSchema.pick({
    name: true,
    size: true,
    type: true,
    country: true,
    employees: true,
    address: true,
    city: true,
    state: true,
    zipCode: true,
    description: true,
});

export const preferencesInfoSchema = retailerFormSchema.pick({
    language: true,
    theme: true,
    dateFormat: true,
    notification: true,
}); 

export type RetailerFormSchema = z.infer<typeof retailerFormSchema>;

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
export type StoreInfoSchema = z.infer<typeof storeInfoSchema>;
export type PreferencesInfoSchema = z.infer<typeof preferencesInfoSchema>;