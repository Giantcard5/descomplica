import type { Metadata } from 'next';
import { IndustryDashboardLayout } from '@/components/industry/dashboard-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Filter, Plus, Calendar, Users, Edit, Trash2, Eye } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Campaigns | Descomplica Industry',
    description: 'Create and manage marketing campaigns',
};

export default function CampaignsPage() {
    // Sample data for campaigns
    const campaigns = [
        {
            id: 'CAM001',
            name: 'Summer Promotion',
            startDate: 'May 15, 2025',
            endDate: 'Jun 15, 2025',
            status: 'active',
            budget: 15000,
            spent: 5200,
            retailers: 120,
            submissions: 1245,
            conversion: 4.8,
        },
        {
            id: 'CAM002',
            name: 'Product Launch - XYZ',
            startDate: 'Jun 1, 2025',
            endDate: 'Jul 31, 2025',
            status: 'scheduled',
            budget: 25000,
            spent: 0,
            retailers: 200,
            submissions: 0,
            conversion: 0,
        },
        {
            id: 'CAM003',
            name: 'Holiday Special',
            startDate: 'Dec 1, 2025',
            endDate: 'Dec 31, 2025',
            status: 'draft',
            budget: 30000,
            spent: 0,
            retailers: 250,
            submissions: 0,
            conversion: 0,
        },
        {
            id: 'CAM004',
            name: 'Back to School',
            startDate: 'Jul 15, 2025',
            endDate: 'Aug 31, 2025',
            status: 'scheduled',
            budget: 18000,
            spent: 0,
            retailers: 150,
            submissions: 0,
            conversion: 0,
        },
        {
            id: 'CAM005',
            name: 'Spring Collection',
            startDate: 'Mar 1, 2025',
            endDate: 'Apr 30, 2025',
            status: 'completed',
            budget: 20000,
            spent: 19500,
            retailers: 180,
            submissions: 3200,
            conversion: 5.2,
        },
    ];

    // Function to render status badge with appropriate color
    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-500">Active</Badge>;
            case 'scheduled':
                return (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                        Scheduled
                    </Badge>
                );
            case 'draft':
                return <Badge variant="secondary">Draft</Badge>;
            case 'completed':
                return <Badge variant="outline">Completed</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    // Function to calculate progress percentage
    const calculateProgress = (spent: number, budget: number) => {
        return Math.round((spent / budget) * 100);
    };

    return (
        <IndustryDashboardLayout>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Campaign
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="all">All Campaigns</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                        <TabsTrigger value="draft">Drafts</TabsTrigger>
                    </TabsList>

                    <div className="flex space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search campaigns..."
                                className="w-[200px] sm:w-[300px] pl-8"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="all" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Campaigns
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-xs text-muted-foreground">Across all statuses</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Active Campaigns
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1</div>
                                <p className="text-xs text-muted-foreground">Currently running</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$108,000</div>
                                <p className="text-xs text-muted-foreground">
                                    Across all campaigns
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Submissions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4,445</div>
                                <p className="text-xs text-muted-foreground">From all campaigns</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>All Campaigns</CardTitle>
                            <CardDescription>
                                View and manage all your marketing campaigns
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Campaign</TableHead>
                                        <TableHead>Date Range</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Budget</TableHead>
                                        <TableHead>Retailers</TableHead>
                                        <TableHead>Submissions</TableHead>
                                        <TableHead>Conversion</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaigns.map((campaign) => (
                                        <TableRow key={campaign.id}>
                                            <TableCell className="font-medium">
                                                <div>
                                                    <div>{campaign.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {campaign.id}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {campaign.startDate} - {campaign.endDate}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {renderStatusBadge(campaign.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="text-sm">
                                                        ${campaign.budget.toLocaleString()}
                                                    </div>
                                                    {campaign.status !== 'draft' && (
                                                        <>
                                                            <Progress
                                                                value={calculateProgress(
                                                                    campaign.spent,
                                                                    campaign.budget
                                                                )}
                                                                className="h-2"
                                                            />
                                                            <div className="text-xs text-muted-foreground">
                                                                ${campaign.spent.toLocaleString()}{' '}
                                                                spent (
                                                                {calculateProgress(
                                                                    campaign.spent,
                                                                    campaign.budget
                                                                )}
                                                                %)
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                                                    <span>{campaign.retailers}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {campaign.submissions.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {campaign.conversion > 0
                                                    ? `${campaign.conversion}%`
                                                    : '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing 5 of 5 campaigns
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Campaigns</CardTitle>
                            <CardDescription>
                                View and manage currently active campaigns
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Campaign</TableHead>
                                        <TableHead>Date Range</TableHead>
                                        <TableHead>Budget</TableHead>
                                        <TableHead>Retailers</TableHead>
                                        <TableHead>Submissions</TableHead>
                                        <TableHead>Conversion</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaigns
                                        .filter((campaign) => campaign.status === 'active')
                                        .map((campaign) => (
                                            <TableRow key={campaign.id}>
                                                <TableCell className="font-medium">
                                                    <div>
                                                        <div>{campaign.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {campaign.id}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        <span className="text-sm">
                                                            {campaign.startDate} -{' '}
                                                            {campaign.endDate}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="text-sm">
                                                            ${campaign.budget.toLocaleString()}
                                                        </div>
                                                        <Progress
                                                            value={calculateProgress(
                                                                campaign.spent,
                                                                campaign.budget
                                                            )}
                                                            className="h-2"
                                                        />
                                                        <div className="text-xs text-muted-foreground">
                                                            ${campaign.spent.toLocaleString()} spent
                                                            (
                                                            {calculateProgress(
                                                                campaign.spent,
                                                                campaign.budget
                                                            )}
                                                            %)
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        <span>{campaign.retailers}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {campaign.submissions.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    {campaign.conversion > 0
                                                        ? `${campaign.conversion}%`
                                                        : '-'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end space-x-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="scheduled" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scheduled Campaigns</CardTitle>
                            <CardDescription>View and manage upcoming campaigns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Campaign</TableHead>
                                        <TableHead>Date Range</TableHead>
                                        <TableHead>Budget</TableHead>
                                        <TableHead>Target Retailers</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaigns
                                        .filter((campaign) => campaign.status === 'scheduled')
                                        .map((campaign) => (
                                            <TableRow key={campaign.id}>
                                                <TableCell className="font-medium">
                                                    <div>
                                                        <div>{campaign.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {campaign.id}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        <span className="text-sm">
                                                            {campaign.startDate} -{' '}
                                                            {campaign.endDate}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    ${campaign.budget.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        <span>{campaign.retailers}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end space-x-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="draft" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Draft Campaigns</CardTitle>
                            <CardDescription>View and edit campaign drafts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Campaign</TableHead>
                                        <TableHead>Planned Date Range</TableHead>
                                        <TableHead>Estimated Budget</TableHead>
                                        <TableHead>Target Retailers</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {campaigns
                                        .filter((campaign) => campaign.status === 'draft')
                                        .map((campaign) => (
                                            <TableRow key={campaign.id}>
                                                <TableCell className="font-medium">
                                                    <div>
                                                        <div>{campaign.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {campaign.id}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        <span className="text-sm">
                                                            {campaign.startDate} -{' '}
                                                            {campaign.endDate}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    ${campaign.budget.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        <span>{campaign.retailers}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end space-x-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                    <CardDescription>Overview of your campaign performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] bg-muted/30 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">
                            Campaign Performance Chart Placeholder
                        </p>
                    </div>
                </CardContent>
            </Card>
        </IndustryDashboardLayout>
    );
}
