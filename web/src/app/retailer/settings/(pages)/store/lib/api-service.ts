import { FetchService } from '@/lib/api/fetch-service';

import { IStore } from '../types';

class StoreService extends FetchService {
    private static instance: StoreService;

    private constructor() {
        super();
    }

    static getInstance(): StoreService {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService();
        }
        return StoreService.instance;
    }

    async getStore(): Promise<IStore> {
        try {
            const response = await this.fetch('/api/store', {
                method: 'GET',
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Store Store error:', error);
            throw error;
        }
    }

    async postStore(Store: IStore): Promise<{
        message: string;
        status: boolean;
    }> {
        try {
            const response = await this.fetch('/api/store', {
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
