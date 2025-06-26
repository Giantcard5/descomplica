import useSWR, { SWRConfiguration } from 'swr';

import { profileService } from '../lib/api-service';
import { FormSchema } from '../utils/schema';

const fetcher = () => profileService.getProfile();

export function useProfile(
    config?: SWRConfiguration<any, Error>
) {
    const { data, error, isLoading, mutate } = useSWR(
        'profile',
        fetcher,
        config
    );

    const handleProfile = async (formData: FormSchema) => {
        try {
            const response = await profileService.postProfile(formData);
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
        handleProfile
    };
};
