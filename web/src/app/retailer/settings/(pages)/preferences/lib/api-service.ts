import { FetchService } from '@/lib/api/fetch-service';

import { IPreferences } from '../types';

class PreferencesService extends FetchService {
    private static instance: PreferencesService;

    private constructor() {
        super();
    }

    static getInstance(): PreferencesService {
        if (!PreferencesService.instance) {
            PreferencesService.instance = new PreferencesService();
        }
        return PreferencesService.instance;
    }

    async getPreferences(): Promise<IPreferences> {
        try {
            const response = await this.fetch('/api/settings/preferences', {
                method: 'GET',
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Preferences error:', error);
            throw error;
        }
    }

    async postPreferences(preferences: IPreferences): Promise<{
        message: string;
        status: boolean;
    }> {
        try {
            const response = await this.fetch('/api/settings/preferences', {
                method: 'POST',
                body: JSON.stringify(preferences),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Preferences error:', error);
            throw error;
        }
    }
}

export const preferencesService = PreferencesService.getInstance();
