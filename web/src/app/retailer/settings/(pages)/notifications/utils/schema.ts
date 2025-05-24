import { z } from 'zod';

export const formSchema = z.object({
    email_submision: z.boolean(),
    email_compaing: z.boolean(),
    email_rewards_and_points: z.boolean(),
    email_newsletter: z.boolean(),
    submission: z.boolean(),
    compaing: z.boolean(),
    rewards_and_points: z.boolean(),
    notification_frequency: z.enum(['real-time', 'daily', 'weekly', 'never']),

});

export type FormSchema = z.infer<typeof formSchema>;