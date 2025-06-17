import { PersonalInfoSchema, StoreInfoSchema, PreferencesInfoSchema } from '../(utils)/schema';

import { FetchService } from '@/lib/api/fetch-service';

export class ApiService extends FetchService {
    private static instance: ApiService;

    private constructor() {
        super();
    }

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async registerRetailer(data: {
        personalInfo: PersonalInfoSchema;
        storeInfo: StoreInfoSchema;
        preferencesInfo: PreferencesInfoSchema;
    }) {
        const response = await this.fetch('/api/auth/onboarding', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                type: 'retailer',
            }),
        });

        return response.json();
    }

    async registerIndustry(data: {}) {
        const response = await this.fetch('/api/auth/onboarding', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                type: 'industry',
            }),
        });

        return response.json();
    }
}

export const apiService = ApiService.getInstance();
