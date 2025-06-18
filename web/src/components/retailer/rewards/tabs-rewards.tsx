import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs';

import {
    AvaliableRewardProps,
    AchievementProps,
} from '@/app/retailer/rewards/_types/tabs';

import { iconsByType } from '@/app/retailer/rewards/_utils/icons';

export default function TabsRewards({ params }: {
    params: {
        avaliableRewards: AvaliableRewardProps[],
        achievements: AchievementProps[],
    }
}) {
    return (
        <Tabs defaultValue="rewards" className="space-y-4">
            <TabsList>
                <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="rewards" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {params.avaliableRewards.map((reward, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        {iconsByType[reward.type]}
                                    </div>
                                    <Badge variant="outline">{reward.points} points</Badge>
                                </div>
                                <CardTitle className="mt-2">{reward.title}</CardTitle>
                                <CardDescription>{reward.description}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button
                                    variant={reward.points <= 1250 ? 'default' : 'outline'}
                                    className="w-full"
                                    disabled={reward.points > 1250}
                                >
                                    {reward.points <= 1250
                                        ? 'Redeem Now'
                                        : `Need ${reward.points - 1250} more points`}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {params.achievements.map((achievement, i) => (
                        <Card key={i} className={achievement.completed ? '' : 'opacity-75'}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`rounded-full p-2 ${achievement.completed
                                            ? 'bg-green-500/10 text-green-500'
                                            : 'bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {iconsByType[achievement.type]}
                                    </div>
                                    <Badge
                                        variant={achievement.completed ? 'default' : 'outline'}
                                    >
                                        {achievement.completed ? 'Completed' : 'In Progress'}
                                    </Badge>
                                </div>
                                <CardTitle className="mt-2">{achievement.title}</CardTitle>
                                <CardDescription>{achievement.description}</CardDescription>
                            </CardHeader>
                            {!achievement.completed && achievement.value && achievement.total && (
                                <CardContent>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">
                                                {achievement.value} / {achievement.total}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {Math.round(
                                                    (achievement.value / achievement.total) *
                                                    100
                                                )}
                                                %
                                            </span>
                                        </div>
                                        <Progress
                                            value={Math.round(
                                                (achievement.value / achievement.total) * 100
                                            )}
                                            className="h-2"
                                        />
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}
