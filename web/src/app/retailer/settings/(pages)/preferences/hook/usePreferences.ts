import useSWR, { SWRConfiguration } from 'swr';

import { preferencesService } from '../lib/api-service';
import { FormSchema } from '../utils/schema';

const fetcher = () => preferencesService.getPreferences();

export function usePreferences(
    config?: SWRConfiguration<any, Error>
) {
    const { data, error, isLoading, mutate } = useSWR(
        'preferences',
        fetcher,
        config
    );

    const handlePreferences = async (formData: FormSchema) => {
        try {
            const response = await preferencesService.postPreferences(formData);
            if (response) {
                await mutate();
            };
            return response;
        } catch (error) {
            console.error('Error updating preferences:', error);
            throw error;
        };
    };

    return {
        data,
        error,
        isLoading,
        handlePreferences
    };
};
