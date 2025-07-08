import { z } from 'zod';

export const formSchema = z.object({
    language: z.enum(['en', 'pt_BR', 'es']),
    dateFormat: z.enum(['dd_mm_yyyy', 'mm_dd_yyyy', 'yyyy_mm_dd']),
    reduceMotion: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema>;
