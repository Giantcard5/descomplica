import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Clock } from 'lucide-react';

import { UpcomingRewardProps } from '@/app/retailer/rewards/_types/upcoming';

import { iconsByType } from '@/app/retailer/rewards/_utils/icons';

export default function UpcomingRewards({
    upcomingRewards
}: {
    upcomingRewards: UpcomingRewardProps[]
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Reward Opportunities</CardTitle>
                <CardDescription>Special events to earn bonus points</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {upcomingRewards.map((reward, index) => (
                        <div className="rounded-lg border bg-card p-4" key={index}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        {iconsByType[reward.type]}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{reward.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {reward.description}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    In {reward.days} days
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
