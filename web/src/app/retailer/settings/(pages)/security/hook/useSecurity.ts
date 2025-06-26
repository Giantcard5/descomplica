import useSWR, { SWRConfiguration } from 'swr';

import { FormSchema } from '../utils/schema';
import { securityService } from '../lib/api-service';

const fetcher = () => securityService.getSecurity();

export function useSecurity(
    config?: SWRConfiguration<any, Error>
) {
    const { data, error, isLoading, mutate } = useSWR(
        'security',
        fetcher,
        config
    );

    const handleSecurity = async (formData: FormSchema) => {
        try {
            const response = await securityService.postSecurity(formData);
            if (response) {
                await mutate();
            };
            return response;
        } catch (error) {
            console.error('Error updating security:', error);
            throw error;
        };
    };

    return {
        data,
        error,
        isLoading,
        handleSecurity
    };
};
