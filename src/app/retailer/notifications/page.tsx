import type { Metadata } from 'next';
import { RetailerDashboardLayout } from '@/components/retailer/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Bell,
    CheckCircle,
    Megaphone,
    Gift,
    AlertCircle,
    Clock,
    MoreHorizontal,
    Filter,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const metadata: Metadata = {
    title: 'Notifications - Descomplica',
    description: 'View your notifications and updates',
};

export default function NotificationsPage() {
    return (
        <RetailerDashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
                        <p className="text-muted-foreground">
                            Stay updated with the latest information and alerts.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                        <Button className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Mark All as Read
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all" className="relative">
                            All
                            <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30">
                                12
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger value="unread" className="relative">
                            Unread
                            <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30">
                                3
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                        <TabsTrigger value="system">System</TabsTrigger>
                        <TabsTrigger value="rewards">Rewards</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Notifications</CardTitle>
                                <CardDescription>Your latest updates and alerts</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {[
                                        {
                                            id: 1,
                                            title: 'New Campaign Available',
                                            description:
                                                'Summer promotion with special discounts is now available.',
                                            time: '10 minutes ago',
                                            type: 'campaign',
                                            unread: true,
                                        },
                                        {
                                            id: 2,
                                            title: 'Submission Processed',
                                            description:
                                                'Your receipt #1024 has been successfully processed.',
                                            time: '2 hours ago',
                                            type: 'system',
                                            unread: true,
                                        },
                                        {
                                            id: 3,
                                            title: 'Points Awarded',
                                            description:
                                                "You've earned 50 points for your recent submission.",
                                            time: '5 hours ago',
                                            type: 'reward',
                                            unread: true,
                                        },
                                        {
                                            id: 4,
                                            title: 'Achievement Unlocked',
                                            description:
                                                "You've completed the 'Weekly Streak' achievement!",
                                            time: 'Yesterday',
                                            type: 'reward',
                                            unread: false,
                                        },
                                        {
                                            id: 5,
                                            title: 'Submission Needs Attention',
                                            description:
                                                'Your receipt #1020 requires additional information.',
                                            time: '2 days ago',
                                            type: 'system',
                                            unread: false,
                                        },
                                        {
                                            id: 6,
                                            title: 'New Product Categories',
                                            description:
                                                "We've added new product categories for more accurate data.",
                                            time: '3 days ago',
                                            type: 'system',
                                            unread: false,
                                        },
                                        {
                                            id: 7,
                                            title: 'Campaign Ending Soon',
                                            description:
                                                'The Spring promotion campaign ends in 2 days.',
                                            time: '4 days ago',
                                            type: 'campaign',
                                            unread: false,
                                        },
                                        {
                                            id: 8,
                                            title: 'Leaderboard Update',
                                            description:
                                                "You've moved up to 8th place on the monthly leaderboard!",
                                            time: '5 days ago',
                                            type: 'reward',
                                            unread: false,
                                        },
                                    ].map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start gap-4 p-4 ${notification.unread ? 'bg-muted/30' : ''}`}
                                        >
                                            <div
                                                className={`mt-1 rounded-full p-2 ${
                                                    notification.type === 'campaign'
                                                        ? 'bg-blue-500/10 text-blue-500'
                                                        : notification.type === 'system'
                                                          ? 'bg-yellow-500/10 text-yellow-500'
                                                          : 'bg-green-500/10 text-green-500'
                                                }`}
                                            >
                                                {notification.type === 'campaign' ? (
                                                    <Megaphone className="h-4 w-4" />
                                                ) : notification.type === 'system' ? (
                                                    <Bell className="h-4 w-4" />
                                                ) : (
                                                    <Gift className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {notification.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {notification.unread && (
                                                            <div
                                                                className="h-2 w-2 rounded-full bg-primary"
                                                                title="Unread"
                                                            ></div>
                                                        )}
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">
                                                                        More options
                                                                    </span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>
                                                                    Actions
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    Mark as{' '}
                                                                    {notification.unread
                                                                        ? 'read'
                                                                        : 'unread'}
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {notification.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="unread" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Unread Notifications</CardTitle>
                                <CardDescription>
                                    Notifications you haven't read yet
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {[
                                        {
                                            id: 1,
                                            title: 'New Campaign Available',
                                            description:
                                                'Summer promotion with special discounts is now available.',
                                            time: '10 minutes ago',
                                            type: 'campaign',
                                        },
                                        {
                                            id: 2,
                                            title: 'Submission Processed',
                                            description:
                                                'Your receipt #1024 has been successfully processed.',
                                            time: '2 hours ago',
                                            type: 'system',
                                        },
                                        {
                                            id: 3,
                                            title: 'Points Awarded',
                                            description:
                                                "You've earned 50 points for your recent submission.",
                                            time: '5 hours ago',
                                            type: 'reward',
                                        },
                                    ].map((notification) => (
                                        <div
                                            key={notification.id}
                                            className="flex items-start gap-4 p-4 bg-muted/30"
                                        >
                                            <div
                                                className={`mt-1 rounded-full p-2 ${
                                                    notification.type === 'campaign'
                                                        ? 'bg-blue-500/10 text-blue-500'
                                                        : notification.type === 'system'
                                                          ? 'bg-yellow-500/10 text-yellow-500'
                                                          : 'bg-green-500/10 text-green-500'
                                                }`}
                                            >
                                                {notification.type === 'campaign' ? (
                                                    <Megaphone className="h-4 w-4" />
                                                ) : notification.type === 'system' ? (
                                                    <Bell className="h-4 w-4" />
                                                ) : (
                                                    <Gift className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {notification.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-2 w-2 rounded-full bg-primary"
                                                            title="Unread"
                                                        ></div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                More options
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {notification.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="campaigns" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Campaign Notifications</CardTitle>
                                <CardDescription>
                                    Updates about marketing campaigns and promotions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {[
                                        {
                                            id: 1,
                                            title: 'New Campaign Available',
                                            description:
                                                'Summer promotion with special discounts is now available.',
                                            time: '10 minutes ago',
                                            unread: true,
                                        },
                                        {
                                            id: 7,
                                            title: 'Campaign Ending Soon',
                                            description:
                                                'The Spring promotion campaign ends in 2 days.',
                                            time: '4 days ago',
                                            unread: false,
                                        },
                                        {
                                            id: 9,
                                            title: 'New Product Launch',
                                            description:
                                                'Participate in the new product launch campaign for bonus points.',
                                            time: '1 week ago',
                                            unread: false,
                                        },
                                    ].map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start gap-4 p-4 ${notification.unread ? 'bg-muted/30' : ''}`}
                                        >
                                            <div className="mt-1 rounded-full bg-blue-500/10 p-2 text-blue-500">
                                                <Megaphone className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {notification.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {notification.unread && (
                                                            <div
                                                                className="h-2 w-2 rounded-full bg-primary"
                                                                title="Unread"
                                                            ></div>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                More options
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {notification.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="system" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>System Notifications</CardTitle>
                                <CardDescription>
                                    Updates about your submissions and account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {[
                                        {
                                            id: 2,
                                            title: 'Submission Processed',
                                            description:
                                                'Your receipt #1024 has been successfully processed.',
                                            time: '2 hours ago',
                                            unread: true,
                                        },
                                        {
                                            id: 5,
                                            title: 'Submission Needs Attention',
                                            description:
                                                'Your receipt #1020 requires additional information.',
                                            time: '2 days ago',
                                            unread: false,
                                        },
                                        {
                                            id: 6,
                                            title: 'New Product Categories',
                                            description:
                                                "We've added new product categories for more accurate data.",
                                            time: '3 days ago',
                                            unread: false,
                                        },
                                        {
                                            id: 10,
                                            title: 'System Maintenance',
                                            description:
                                                'Scheduled maintenance on May 15, 2025, from 2-4 AM.',
                                            time: '2 weeks ago',
                                            unread: false,
                                        },
                                    ].map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start gap-4 p-4 ${notification.unread ? 'bg-muted/30' : ''}`}
                                        >
                                            <div className="mt-1 rounded-full bg-yellow-500/10 p-2 text-yellow-500">
                                                <Bell className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {notification.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {notification.unread && (
                                                            <div
                                                                className="h-2 w-2 rounded-full bg-primary"
                                                                title="Unread"
                                                            ></div>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                More options
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {notification.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="rewards" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Reward Notifications</CardTitle>
                                <CardDescription>
                                    Updates about your points, achievements, and rewards
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {[
                                        {
                                            id: 3,
                                            title: 'Points Awarded',
                                            description:
                                                "You've earned 50 points for your recent submission.",
                                            time: '5 hours ago',
                                            unread: true,
                                        },
                                        {
                                            id: 4,
                                            title: 'Achievement Unlocked',
                                            description:
                                                "You've completed the 'Weekly Streak' achievement!",
                                            time: 'Yesterday',
                                            unread: false,
                                        },
                                        {
                                            id: 8,
                                            title: 'Leaderboard Update',
                                            description:
                                                "You've moved up to 8th place on the monthly leaderboard!",
                                            time: '5 days ago',
                                            unread: false,
                                        },
                                        {
                                            id: 11,
                                            title: 'Reward Available',
                                            description:
                                                'You can now redeem your points for a $25 store credit.',
                                            time: '2 weeks ago',
                                            unread: false,
                                        },
                                    ].map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start gap-4 p-4 ${notification.unread ? 'bg-muted/30' : ''}`}
                                        >
                                            <div className="mt-1 rounded-full bg-green-500/10 p-2 text-green-500">
                                                <Gift className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {notification.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {notification.unread && (
                                                            <div
                                                                className="h-2 w-2 rounded-full bg-primary"
                                                                title="Unread"
                                                            ></div>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                More options
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {notification.time}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Card>
                    <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
                                        <Megaphone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Campaign Notifications</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Updates about new campaigns and promotions
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        Configure
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-yellow-500/10 p-2 text-yellow-500">
                                        <Bell className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">System Notifications</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Updates about your submissions and account
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        Configure
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-green-500/10 p-2 text-green-500">
                                        <Gift className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Reward Notifications</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Updates about your points, achievements, and rewards
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        Configure
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-red-500/10 p-2 text-red-500">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Alert Notifications</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Important alerts that require your attention
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        Configure
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </RetailerDashboardLayout>
    );
}
