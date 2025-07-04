import { IProfile } from '../types';

import { FetchService } from '@/lib/api/fetch-service';

class ProfileService extends FetchService {
    private static instance: ProfileService;

    private constructor() {
        super();
    }

    static getInstance(): ProfileService {
        if (!ProfileService.instance) {
            ProfileService.instance = new ProfileService();
        }
        return ProfileService.instance;
    }

    async getProfile(): Promise<IProfile> {
        try {
            const response = await this.fetch('/api/profile', {
                method: 'GET',
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Profile Profile error:', error);
            throw error;
        }
    }

    async postProfile(profile: IProfile): Promise<{
        message: string;
        status: boolean;
    }> {
        try {
            const response = await this.fetch('/api/profile', {
                method: 'POST',
                body: JSON.stringify(profile),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Profile Profile error:', error);
            throw error;
        }
    }
}

export const profileService = ProfileService.getInstance();
