import { FetchService } from '@/lib/api/fetch-service';

import { AvailableRewardProps } from '../_types/tabs';

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

    async redeemReward(rewardId: string): Promise<boolean> {
        try {
            const response = await this.fetch('/api/rewards/redeem', {
                method: 'POST',
                body: JSON.stringify({ rewardId })
            });

            if (response.status === 200) {
                return true;
            }

            throw new Error('Failed to redeem reward');
        } catch (error) {
            console.error('Redeem reward error:', error);
            return false;
        }
    }
}

export const rewardsService = RewardsService.getInstance();
