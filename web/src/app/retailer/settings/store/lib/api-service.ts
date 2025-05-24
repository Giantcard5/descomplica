interface IStore {
    name: string;
    type: string;
    size: number;
    employees: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: 'br' | 'us' | 'other';
    description: string;
};

class StoreService {
    private static instance: StoreService;
    private readonly API_URL: string;

    private constructor() {
        this.API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    }

    static getInstance(): StoreService {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService();
        }
        return StoreService.instance;
    }

    private async fetch(url: string, options: RequestInit = {}) {
        try {
            const response = await fetch(url, {
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

    async getStore(): Promise<IStore> {
        try {
            const response = await this.fetch(`${this.API_URL}/api/settings/store`, {
                method: 'GET'
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Store Store error:', error);
            throw error;
        }
    }

    async postStore(Store: IStore): Promise<IStore> {
        try {
            const response = await this.fetch(`${this.API_URL}/api/settings/store`, {
                method: 'POST',
                body: JSON.stringify(Store),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Store Store error:', error);
            throw error;
        }
    }
}

export const storeService = StoreService.getInstance();