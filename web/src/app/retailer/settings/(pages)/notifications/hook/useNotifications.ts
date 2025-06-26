import useSWR, { SWRConfiguration } from 'swr';

import { notificationsService } from '../lib/api-service';
import { FormSchema } from '../utils/schema';

const fetcher = () => notificationsService.getNotifications();

export function useNotifications(
    config?: SWRConfiguration<any, Error>
) {
    const { data, error, isLoading, mutate } = useSWR(
        'notifications',
        fetcher,
        config
    );

    const handleNotifications = async (formData: FormSchema) => {
        try {
            const response = await notificationsService.postNotifications(formData);
            if (response) {
                await mutate();
            };
            return response;
        } catch (error) {
            console.error('Error updating notifications:', error);
            throw error;
        };
    };

    return {
        data,
        error,
        isLoading,
        handleNotifications
    };
};
