import useSWR, { SWRConfiguration } from 'swr';

import { storeService } from '../lib/api-service';
import { FormSchema } from '../utils/schema';

const fetcher = () => storeService.getStore();

export function useStore(
    config?: SWRConfiguration<any, Error>
) {
    const { data, error, isLoading, mutate } = useSWR(
        'store',
        fetcher,
        config
    );

    const handleStore = async (formData: FormSchema) => {
        try {
            const response = await storeService.postStore(formData);
            if (response) {
                await mutate();
            };
            return response;
        } catch (error) {
            console.error('Error updating store:', error);
            throw error;
        };
    };

    return {
        data,
        error,
        isLoading,
        handleStore
    };
};
