import { Award, TrendingUp, Trophy, Gift, Calendar, CheckCircle, Star } from 'lucide-react';

export const mockHeaderRewards = [
    {
        title: 'Total Points',
        icon: <Award className="h-5 w-5" />,
        content: '1,250',
        description: '+150 points this month',
    },
    {
        title: 'Current Streak',
        icon: <TrendingUp className="h-5 w-5" />,
        content: '7 days',
        description: 'Your longest streak: 14 days',
    },
    {
        title: 'Leaderboard Rank',
        icon: <Trophy className="h-5 w-5" />,
        content: '8th',
        description: 'Top 10% of all retailers',
    },
    {
        title: 'Redeemable Rewards',
        icon: <Gift className="h-5 w-5" />,
        content: '3',
        description: 'New rewards available',
    }
];

export const mockNextReward = {
    points: 1250,
    totalPoints: 1500,
    title: '$25 Store Credit',
    description: 'Redeem 1,500 points for store credit',
    icon: <Gift className="h-5 w-5" />,
};

export const mockAvaliableRewards = [
    {
        title: '$25 Store Credit',
        description: 'Redeem for credit at participating stores',
        points: 1500,
        icon: <Gift className="h-5 w-5" />,
    },
    {
        title: 'Premium Analytics',
        description: '1-month access to premium analytics tools',
        points: 2000,
        icon: <TrendingUp className="h-5 w-5" />,
    },
    {
        title: 'Priority Support',
        description: '3-months of priority customer support',
        points: 2500,
        icon: <CheckCircle className="h-5 w-5" />,
    },
    {
        title: '$50 Store Credit',
        description: 'Redeem for credit at participating stores',
        points: 3000,
        icon: <Gift className="h-5 w-5" />,
    },
    {
        title: 'Industry Event Ticket',
        description: 'Free ticket to upcoming industry event',
        points: 5000,
        icon: <Calendar className="h-5 w-5" />,
    },
    {
        title: 'Exclusive Training',
        description: 'Access to exclusive retail training program',
        points: 7500,
        icon: <Award className="h-5 w-5" />,
    },
];

export const mockAchievements = [
    {
        title: 'First Submission',
        description: 'Submit your first data entry',
        completed: true,
        icon: <CheckCircle className="h-5 w-5" />,
    },
    {
        title: 'Weekly Streak',
        description: 'Submit data for 7 consecutive days',
        completed: true,
        icon: <Calendar className="h-5 w-5" />,
    },
    {
        title: 'Data Champion',
        description: 'Submit 25 total entries',
        completed: false,
        value: 24,
        total: 25,
        icon: <Award className="h-5 w-5" />,
    },
    {
        title: 'Variety Master',
        description: 'Submit data using all 3 methods',
        completed: true,
        icon: <Star className="h-5 w-5" />,
    },
    {
        title: 'Monthly Dedication',
        description: 'Submit data every day for a month',
        completed: false,
        value: 7,
        total: 30,
        icon: <Trophy className="h-5 w-5" />,
    },
    {
        title: 'High Accuracy',
        description: 'Maintain 95%+ data accuracy for 10 submissions',
        completed: false,
        value: 7,
        total: 10,
        icon: <CheckCircle className="h-5 w-5" />,
    },
];

export const mockUpcomingRewards = [
    {
        title: 'Double Points Weekend',
        description: 'Earn 2x points on all submissions this weekend',
        icon: <Calendar className="h-4 w-4 text-primary" />,
        days: 3,
    },
    {
        title: 'Monthly Dedication',
        description: 'Submit data every day for a month',
        icon: <Trophy className="h-4 w-4 text-primary" />,
        days: 30,
    },
    {
        title: 'High Accuracy',
        description: 'Maintain 95%+ data accuracy for 10 submissions',
        icon: <CheckCircle className="h-4 w-4 text-primary" />,
        days: 10,
    }
];
