import type { Metadata } from 'next';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Award,
    Gift,
    TrendingUp,
    Calendar,
    ChevronRight,
    Clock,
    CheckCircle,
    Star,
    Trophy,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Rewards - Descomplica',
    description: 'View your rewards and achievements',
};

export default function RewardsPage() {
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
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,250</div>
                        <p className="text-xs text-muted-foreground">+150 points this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7 days</div>
                        <p className="text-xs text-muted-foreground">
                            Your longest streak: 14 days
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8th</div>
                        <p className="text-xs text-muted-foreground">Top 10% of all retailers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Redeemable Rewards</CardTitle>
                        <Gift className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">New rewards available</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Next Reward Progress</CardTitle>
                    <CardDescription>250 more points until your next reward</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">1,250 / 1,500 points</span>
                                <span className="text-sm text-muted-foreground">83%</span>
                            </div>
                            <Progress value={83} className="h-2" />
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-2">
                                    <Gift className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">$25 Store Credit</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Redeem 1,500 points for store credit
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="rewards" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                </TabsList>

                <TabsContent value="rewards" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[
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
                        ].map((reward, i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="rounded-full bg-primary/10 p-2">
                                            {reward.icon}
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
                        {[
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
                                progress: 24,
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
                                progress: 7,
                                total: 30,
                                icon: <Trophy className="h-5 w-5" />,
                            },
                            {
                                title: 'High Accuracy',
                                description: 'Maintain 95%+ data accuracy for 10 submissions',
                                completed: false,
                                progress: 7,
                                total: 10,
                                icon: <CheckCircle className="h-5 w-5" />,
                            },
                        ].map((achievement, i) => (
                            <Card key={i} className={achievement.completed ? '' : 'opacity-75'}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div
                                            className={`rounded-full p-2 ${
                                                achievement.completed
                                                    ? 'bg-green-500/10 text-green-500'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            {achievement.icon}
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
                                {!achievement.completed && achievement.progress && (
                                    <CardContent>
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">
                                                    {achievement.progress} / {achievement.total}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {Math.round(
                                                        (achievement.progress / achievement.total) *
                                                            100
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                            <Progress
                                                value={Math.round(
                                                    (achievement.progress / achievement.total) * 100
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

                <TabsContent value="leaderboard" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Leaderboard</CardTitle>
                            <CardDescription>Top retailers by points this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { name: "Maria's Market", points: 1890, position: 1 },
                                    { name: 'Carlos Pharmacy', points: 1720, position: 2 },
                                    { name: "Pedro's Grocery", points: 1540, position: 3 },
                                    { name: "Ana's Store", points: 1480, position: 4 },
                                    { name: 'Central Market', points: 1350, position: 5 },
                                    { name: 'Family Goods', points: 1320, position: 6 },
                                    { name: 'Corner Shop', points: 1290, position: 7 },
                                    {
                                        name: 'Your Store',
                                        points: 1250,
                                        position: 8,
                                        isYou: true,
                                    },
                                    { name: 'Mini Market', points: 1180, position: 9 },
                                    { name: 'City Groceries', points: 1120, position: 10 },
                                ].map((store) => (
                                    <div
                                        key={store.position}
                                        className={`flex items-center gap-4 ${store.isYou ? 'bg-muted/50 p-3 rounded-lg' : ''}`}
                                    >
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                store.position <= 3
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            {store.position}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p
                                                    className={`font-medium ${store.isYou ? 'text-primary' : ''}`}
                                                >
                                                    {store.name} {store.isYou && '(You)'}
                                                </p>
                                                <Badge
                                                    variant={store.isYou ? 'default' : 'outline'}
                                                >
                                                    {store.points} pts
                                                </Badge>
                                            </div>
                                            <Progress
                                                value={(store.points / 1890) * 100}
                                                className={`h-2 mt-1 ${store.isYou ? 'bg-primary/20' : ''}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button variant="outline" className="w-full">
                                View Full Leaderboard
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Reward Opportunities</CardTitle>
                    <CardDescription>Special events to earn bonus points</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Double Points Weekend</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Earn 2x points on all submissions this weekend
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    In 3 days
                                </Badge>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        <Award className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Product Category Challenge
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Submit data for specific product categories to earn
                                            bonus points
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    In 1 week
                                </Badge>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        <Trophy className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Monthly Competition</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Top 3 retailers this month will receive special rewards
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    Ongoing
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
