import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Gift, Calendar, Award, TrendingUp, Trophy } from 'lucide-react';

import { SummaryRewardsProps } from '@/app/retailer/rewards/_types/summary';

export default function SummaryRewards({
    points,
    streak,
    longestStreak,
    redeemable,
}: SummaryRewardsProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Rewards & Achievements</h2>
                    <p className="text-muted-foreground">Track your progress and redeem rewards.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        View History
                    </Button>
                    <Button className="gap-2">
                        <Gift className="h-4 w-4" />
                        Redeem Points
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                        <Award className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{points}</div>
                        <p className="text-xs text-muted-foreground">+150 points this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                        <TrendingUp className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{streak}</div>
                        <p className="text-xs text-muted-foreground">
                            Your longest streak: {longestStreak}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
                        <Trophy className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8th</div>
                        <p className="text-xs text-muted-foreground">Top 10% of all retailers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Redeemable Rewards</CardTitle>
                        <Gift className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{redeemable}</div>
                        <p className="text-xs text-muted-foreground">New rewards available</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
