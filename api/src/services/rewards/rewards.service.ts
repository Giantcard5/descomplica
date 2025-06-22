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

        const rewardsSummary = await this.getRewardsSummary(store.id);
        const rewardsList = await this.getRewardsList(rewardsSummary?.points || 0);

        return {
            points: rewardsSummary?.points,
            streak: rewardsSummary?.streak,
            longestStreak: rewardsSummary?.longest_streak,
            rewardsList: rewardsList,
            achievements: [
                {
                    title: 'First Submission',
                    description: 'Submit your first data entry',
                    completed: true,
                    type: 'submission'
                },
                {
                    title: 'Weekly Streak',
                    description: 'Submit data for 7 consecutive days',
                    completed: true,
                    type: 'streak'
                },
                {
                    title: 'Data Champion',
                    description: 'Submit 25 total entries',
                    completed: false,
                    value: 24,
                    total: 25,
                    type: 'champion'
                },
                {
                    title: 'Variety Master',
                    description: 'Submit data using all 3 methods',
                    completed: true,
                    type: 'variety'
                },
                {
                    title: 'Monthly Dedication',
                    description: 'Submit data every day for a month',
                    completed: false,
                    value: 7,
                    total: 30,
                    type: 'master'
                },
                {
                    title: 'High Accuracy',
                    description: 'Maintain 95%+ data accuracy for 10 submissions',
                    completed: false,
                    value: 7,
                    total: 10,
                    type: 'accuracy'
                },
            ],
            upcomingRewards: [
                {
                    title: 'Double Points Weekend',
                    description: 'Earn 2x points on all submissions this weekend',
                    type: 'ticket',
                    days: 3,
                },
                {
                    title: 'Monthly Dedication',
                    description: 'Submit data every day for a month',
                    type: 'master',
                    days: 30,
                },
                {
                    title: 'High Accuracy',
                    description: 'Maintain 95%+ data accuracy for 10 submissions',
                    type: 'accuracy',
                    days: 10,
                }
            ]
        };
    }

    async getRewardsList(userPoints: number) {
        const rewardsList = await this.prisma.rewardsList.findMany({});

        return rewardsList.map(reward => ({
            ...reward,
            redeemable: reward.points <= userPoints
        }));
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