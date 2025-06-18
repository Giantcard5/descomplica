import {
    verify
} from 'jsonwebtoken';

import {
    PrismaClientSingleton
} from "../../utils/prismaClient";

export class RewardsService extends PrismaClientSingleton {
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

    async getRewards(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET as string);
    
        const store = await this.prisma.store.findUnique({
            where: {
                userId: decoded.sub as string
            }
        });
    
        if (!store) {
            throw new Error('Store not found');
        };

        const rewardsList = await this.getRewardsList();
        const rewardsSummary = await this.getRewardsSummary(store.id);

        return {
            points: rewardsSummary?.points,
            streak: rewardsSummary?.streak,
            longestStreak: rewardsSummary?.longest_streak,
            rewardsList: rewardsList
        };
    }

    async getRewardsList() {
        const rewardsList = await this.prisma.rewardsList.findMany({});

        return rewardsList;
    }

    async getRewardsSummary(id: string) {
        const rewardsSummary = await this.prisma.rewards.findUnique({
            where: {
                storeId: id
            }
        });

        return rewardsSummary;
    }
};

export const rewardsService = RewardsService.getInstance();