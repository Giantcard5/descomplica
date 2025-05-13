import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, MessageSquare, TrendingUp, Award, Clock } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
    title: 'Retailer Dashboard - Descomplica',
    description: 'Retailer dashboard for Descomplica',
};

export default function RetailerDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back, John!</h2>
                    <p className="text-muted-foreground">
                        Here's what's happening with your store today.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href="/retailer/upload">
                        <Button className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Receipt
                        </Button>
                    </Link>
                    <Link href="/retailer/chatbot">
                        <Button variant="outline" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Use Chatbot
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                        <Upload className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+2 from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78/100</div>
                        <p className="text-xs text-muted-foreground">
                            +5 points from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rewards Points</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,250</div>
                        <p className="text-xs text-muted-foreground">
                            250 points until next reward
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Submission</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2 days</div>
                        <p className="text-xs text-muted-foreground">To maintain your streak</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Monthly Submission Activity</CardTitle>
                        <CardDescription>
                            Your submission history over the past 30 days
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] bg-muted/30 rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground">Activity Chart Placeholder</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Leaderboard</CardTitle>
                        <CardDescription>Top retailers this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    1
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Maria's Market</p>
                                        <Badge>1,890 pts</Badge>
                                    </div>
                                    <Progress value={100} className="h-2 mt-1" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 text-primary-foreground">
                                    2
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Carlos Pharmacy</p>
                                        <Badge>1,720 pts</Badge>
                                    </div>
                                    <Progress value={90} className="h-2 mt-1" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/60 text-primary-foreground">
                                    3
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Pedro's Grocery</p>
                                        <Badge>1,540 pts</Badge>
                                    </div>
                                    <Progress value={80} className="h-2 mt-1" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                    8
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Your Store</p>
                                        <Badge variant="outline">1,250 pts</Badge>
                                    </div>
                                    <Progress value={65} className="h-2 mt-1" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Submissions</CardTitle>
                        <CardDescription>Your latest data submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="rounded-md bg-muted p-2">
                                        <Upload className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">Receipt #{i}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {i === 1
                                                ? 'Today'
                                                : i === 2
                                                    ? 'Yesterday'
                                                    : '3 days ago'}
                                        </p>
                                    </div>
                                    <Badge variant="outline">Processed</Badge>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full" asChild>
                                <Link href="/retailer/history">View all submissions</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Active Campaigns</CardTitle>
                        <CardDescription>
                            Current promotions from industry partners
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="rounded-lg border bg-card p-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">Summer Promotion</h4>
                                    <Badge>New</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Special discounts on summer products. Submit receipts to
                                    earn 2x points.
                                </p>
                                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    Ends in 14 days
                                </div>
                            </div>
                            <div className="rounded-lg border bg-card p-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">Product Launch</h4>
                                    <Badge variant="outline">Active</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    New product line available. Submit receipts with these
                                    products for bonus rewards.
                                </p>
                                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    Ends in 7 days
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full">
                                View all campaigns
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
