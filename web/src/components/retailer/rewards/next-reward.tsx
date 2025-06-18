import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { Gift } from 'lucide-react';

import { NextRewardProps } from '@/app/retailer/rewards/_types/next-rewards';

export default function NextReward({ params }: { params: NextRewardProps }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Next Reward Progress</CardTitle>
                <CardDescription>250 more points until your next reward</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{params.points} / {params.totalPoints} points</span>
                            <span className="text-sm text-muted-foreground">{Math.round((params.points / params.totalPoints) * 100)}%</span>
                        </div>
                        <Progress value={Math.round((params.points / params.totalPoints) * 100)} className="h-2" />
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                                <Gift className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold">{params.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {params.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
