'use client';

import NextReward from '@/components/retailer/rewards/next-reward';
import UpcomingRewards from '@/components/retailer/rewards/upcoming-rewards';
import TabsRewards from '@/components/retailer/rewards/tabs-rewards';
import SummaryRewards from '@/components/retailer/rewards/summary';

import Loading from './loading';

import { useRewards } from './_hooks/useRewards';

export default function RewardsPage() {
    const {
        summaryRewards,
        availableRewards,
        achievements,
        upcomingRewards,
        redeemableRewards,
        nextRedeemableReward,
        isLoading,
        error,
    } = useRewards();

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <SummaryRewards
                points={summaryRewards.points}
                streak={summaryRewards.streak}
                longestStreak={summaryRewards.longestStreak}
                redeemable={redeemableRewards}
            />

            <NextReward
                title={nextRedeemableReward.title}
                description={nextRedeemableReward.description}
                type={nextRedeemableReward.type}
                points={summaryRewards.points}
                totalPoints={nextRedeemableReward.points}
            />

            <TabsRewards availableRewards={availableRewards} achievements={achievements} />

            <UpcomingRewards upcomingRewards={upcomingRewards} />
        </div>
    );
}
