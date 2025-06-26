import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import { rewardsService } from '../_lib/api-service';

import { SummaryRewardsProps } from '../_types/summary';
import { NextRewardProps } from '../_types/next-rewards';
import { AvailableRewardProps } from '../_types/tabs';

const fetcher = () => rewardsService.getRewards();

export function useRewards() {
    const { data, error, isLoading } = useSWR('rewards', fetcher);

    const summaryRewards = data
        ? {
              points: data.points,
              streak: data.streak,
              longestStreak: data.longestStreak,
              redeemable: data.rewardsList.filter((i: { redeemable: boolean }) => i.redeemable)
                  .length,
          }
        : ({} as SummaryRewardsProps);

    const nextReward = data
        ? {
              title: data.nextReward?.title || '',
              description: data.nextReward?.description || '',
              type: data.nextReward?.type || '',
              points: data.points || 0,
              totalPoints: data.nextReward?.totalPoints || 0,
          }
        : ({} as NextRewardProps);

    const redeemableRewards = useMemo(
        () => data?.rewardsList.filter((i: { redeemable: boolean }) => i.redeemable).length,
        [data?.rewardsList]
    );

    const nextRedeemableReward = useMemo(() => {
        const list = data?.rewardsList ?? [];
        if (list.length === 0) return null;

        const sorted = list.sort(
            (a: { points: number }, b: { points: number }) => a.points - b.points
        );
        return (
            sorted.find((i: { points: number }) => i.points > summaryRewards.points) ??
            sorted[sorted.length - 1]
        );
    }, [data?.rewardsList, summaryRewards.points]);

    const handleRedeemReward = async (reward: AvailableRewardProps) => {
        if (!reward.redeemable) {
            throw new Error('This reward is not redeemable');
        }

        if (summaryRewards.points < reward.points) {
            throw new Error('You do not have enough points to redeem this reward');
        }

        try {
            await rewardsService.redeemReward(reward.id).then(() => {
                mutate('rewards');
            });
        } catch (error) {
            throw new Error(error as string);
        }
    };

    return {
        summaryRewards,
        nextReward,
        availableRewards: data?.rewardsList ?? [],
        achievements: data?.achievements ?? [],
        upcomingRewards: data?.upcomingRewards ?? [],
        redeemableRewards,
        nextRedeemableReward,
        handleRedeemReward,
        isLoading,
        error,
    };
}
