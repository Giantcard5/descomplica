import { Award, Trophy, Gift, Calendar, CheckCircle, Star } from 'lucide-react';

import { NextRewardProps } from '../_types/next-rewards';
import { AvaliableRewardProps } from '../_types/tabs';
import { AchievementProps } from '../_types/tabs';
import { UpcomingRewardProps } from '../_types/upcoming';

export const mockNextReward: NextRewardProps = {
    points: 1250,
    totalPoints: 1500,
    title: '$25 Store Credit',
    description: 'Redeem 1,500 points for store credit',
    type: 'credit'
};

export const mockAvaliableRewards: AvaliableRewardProps[] = [
    {
        title: '$25 Store Credit',
        description: 'Redeem for credit at participating stores',
        points: 1500,
        type: 'credit'
    },
    {
        title: 'Premium Analytics',
        description: '1-month access to premium analytics tools',
        points: 2000,
        type: 'analystic'
    },
    {
        title: 'Priority Support',
        description: '3-months of priority customer support',
        points: 2500,
        type: 'support'
    },
    {
        title: '$50 Store Credit',
        description: 'Redeem for credit at participating stores',
        points: 3000,
        type: 'credit'
    },
    {
        title: 'Industry Event Ticket',
        description: 'Free ticket to upcoming industry event',
        points: 5000,
        type: 'ticket'
    },
    {
        title: 'Exclusive Training',
        description: 'Access to exclusive retail training program',
        points: 7500,
        type: 'training'
    },
];

export const mockAchievements: AchievementProps[] = [
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
];

export const mockUpcomingRewards: UpcomingRewardProps[] = [
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
];
