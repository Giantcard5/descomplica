'use client';

import { useEffect, useState } from 'react';

import NextReward from '@/components/retailer/rewards/next-reward';
import UpcomingRewards from '@/components/retailer/rewards/upcoming-rewards';
import TabsRewards from '@/components/retailer/rewards/tabs-rewards';
import SummaryRewards from '@/components/retailer/rewards/summary';

import { SummaryRewardsProps } from './_types/summary';
import { NextRewardProps } from './_types/next-rewards';
import { AvaliableRewardProps, AchievementProps } from './_types/tabs';
import { UpcomingRewardProps } from './_types/upcoming';

import {
    mockNextReward, 
    mockAchievements,
    mockUpcomingRewards 
} from './_mock/rewards';

import { useLoadingBar } from '@/hooks/use-loading';

import Loading from './loading';

import { rewardsService } from './_lib/api-service';

export default function RewardsPage() {
    const { isLoading, setLoading } = useLoadingBar();
    
    const [summaryRewards, setSummaryRewards] = useState<SummaryRewardsProps>({} as SummaryRewardsProps);
    const [nextReward, setNextReward] = useState<NextRewardProps>(mockNextReward);
    const [avaliableRewards, setAvaliableRewards] = useState<AvaliableRewardProps[]>([]);
    const [achievements, setAchievements] = useState<AchievementProps[]>(mockAchievements);
    const [upcomingRewards, setUpcomingRewards] = useState<UpcomingRewardProps[]>(mockUpcomingRewards);

    useEffect(() => {
        const fetchRewards = async () => {
            setLoading(true);
            try {
                const response = await rewardsService.getRewards();

                setSummaryRewards({
                    points: response.points,
                    streak: response.streak,
                    longestStreak: response.longestStreak,
                    redeemable: 3
                });

                setAvaliableRewards(response.rewardsList);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRewards();
    }, []);

    if (isLoading) {
        return <Loading />;
    };

    return (
        <div className="space-y-6">
            <SummaryRewards 
                points={summaryRewards.points} 
                streak={summaryRewards.streak} 
                longestStreak={summaryRewards.longestStreak} 
                redeemable={summaryRewards.redeemable} 
            />

            <NextReward params={nextReward} />

            <TabsRewards
                params={{
                    avaliableRewards,
                    achievements
                }}
            />

            <UpcomingRewards params={upcomingRewards} />
        </div>
    );
}
