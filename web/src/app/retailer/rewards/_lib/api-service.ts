import { FetchService } from '@/lib/api/fetch-service';

class RewardsService extends FetchService {
    private static instance: RewardsService;

    private constructor() {
        super();
    }

    static getInstance(): RewardsService {
        if (!RewardsService.instance) {
            RewardsService.instance = new RewardsService();
        }
        return RewardsService.instance;
    }

    async getRewards() {
        try {
            const response = await this.fetch('/api/rewards');
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Rewards error:', error);
        }
    }
}

export const rewardsService = RewardsService.getInstance();
