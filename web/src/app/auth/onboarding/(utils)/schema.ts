import { z } from 'zod';

export const retailerFormSchema = z.object({
    personalFullName: z.string().min(1, { message: 'Full name is required' }),
    personalDateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
    personalPhone: z.string().min(1, { message: 'Phone number is required' }),
    personalBio: z.string().min(1, { message: 'Bio is required' }),
    
    storeName: z.string().min(1, { message: 'Store name is required' }),
    storeSize: z.string().min(1, { message: 'Store size is required' }),
    storeType: z.enum([
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
    storeCountry: z.enum(['us', 'br', 'other'], { message: 'Country is required' }),
    storeEmployees: z.string().min(1, { message: 'Number of employees is required' }),
    storeAddress: z.string().min(1, { message: 'Store address is required' }),
    storeCity: z.string().min(1, { message: 'City is required' }),
    storeState: z.string().min(1, { message: 'State is required' }),
    storeZip: z.string().min(1, { message: 'Zip code is required' }),
    storeDescription: z.string().min(1, { message: 'Store description is required' }),
    
    preferencesLanguage: z.string().min(1, { message: 'Language is required' }),
    preferencesTheme: z.enum(['light', 'dark', 'system'], { message: 'Theme is required' }),
    preferencesDateFormat: z.enum(['dd_mm_yyyy', 'mm_dd_yyyy', 'yyyy_mm_dd'], { message: 'Date format is required' }),
    preferencesNotification: z.enum(['real-time', 'daily', 'weekly', 'never'], { message: 'Notification preferences are required' }),
});

export const personalInfoSchema = retailerFormSchema.pick({
    personalFullName: true,
    personalDateOfBirth: true,
    personalPhone: true,
    personalBio: true,
});

export const storeInfoSchema = retailerFormSchema.pick({
    storeName: true,
    storeSize: true,
    storeType: true,
    storeCountry: true,
    storeEmployees: true,
    storeAddress: true,
    storeCity: true,
    storeState: true,
    storeZip: true,
    storeDescription: true,
});

export const preferencesInfoSchema = retailerFormSchema.pick({
    preferencesLanguage: true,
    preferencesTheme: true,
    preferencesDateFormat: true,
    preferencesNotification: true,
}); 

export type RetailerFormSchema = z.infer<typeof retailerFormSchema>;

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
export type StoreInfoSchema = z.infer<typeof storeInfoSchema>;
export type PreferencesInfoSchema = z.infer<typeof preferencesInfoSchema>;