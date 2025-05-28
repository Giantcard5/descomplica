import { 
    PersonalInfoSchema, 
    StoreInfoSchema, 
    PreferencesInfoSchema 
} from "../(utils)/schema";

export class ApiService {
    private static instance: ApiService;
    private readonly API_URL: string;

    constructor() {
        this.API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    };

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    };

    async fetch(url: string, options: RequestInit = {}) {
        try {
            const response = await fetch(this.API_URL + url, {
                ...options,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            return response;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Failed to fetch') {
                    throw new Error(
                        'Unable to connect to the server. Please check your internet connection and try again.'
                    );
                };

                throw error;
            }
            throw new Error('An unexpected error occurred');
        };
    };

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
    };

    async registerIndustry(data: { }) {
        const response = await this.fetch('/api/auth/onboarding', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                type: 'industry',
            }),
        });

        return response.json();
    };
};

export const apiService = ApiService.getInstance();