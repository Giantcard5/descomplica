import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Gift,
    Calendar
} from 'lucide-react';

import { SummaryRewardsProps } from '@/app/retailer/rewards/_types/summary';

export default function SummaryRewards({ params }: { params: SummaryRewardsProps[] }) {
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
                {params.map((reward, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{reward.title}</CardTitle>
                            {reward.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{reward.content}</div>
                            <p className="text-xs text-muted-foreground">{reward.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
