import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, ShoppingBag, Download, Filter } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const metadata: Metadata = {
    title: 'Industry Dashboard - Descomplica',
    description: 'Industry analytics dashboard for Descomplica',
};

export default function IndustryDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back, Acme Corp!</h2>
                    <p className="text-muted-foreground">
                        Here's what's happening with your retail data.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Data
                    </Button>
                    <Button className="gap-2">
                        <BarChart3 className="h-4 w-4" />
                        View Full Analytics
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Select defaultValue="30days">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="90days">Last 90 days</SelectItem>
                        <SelectItem value="year">This year</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="ml-auto">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sell-Out</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$128,430</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-500">+12.5%</span> from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Ticket</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$42.80</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-500">+2.3%</span> from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Retailers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">248</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-500">+18</span> new this month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Data Reliability</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.2%</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-500">+1.8%</span> from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="regions">Regions</TabsTrigger>
                    <TabsTrigger value="retailers">Retailers</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="lg:col-span-4">
                            <CardHeader>
                                <CardTitle>Sell-Out Trends</CardTitle>
                                <CardDescription>
                                    Monthly sell-out data for the past 6 months
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] bg-muted/30 rounded-md flex items-center justify-center">
                                    <p className="text-muted-foreground">
                                        Sell-Out Trend Chart Placeholder
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-3">
                            <CardHeader>
                                <CardTitle>Product Category Distribution</CardTitle>
                                <CardDescription>Sell-out by product category</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] bg-muted/30 rounded-md flex items-center justify-center">
                                    <p className="text-muted-foreground">
                                        Category Pie Chart Placeholder
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Selling Products</CardTitle>
                            <CardDescription>Products with highest sell-out volume</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <div className="grid grid-cols-12 gap-2 border-b p-3 font-medium">
                                    <div className="col-span-5">Product</div>
                                    <div className="col-span-2">Category</div>
                                    <div className="col-span-2">Units Sold</div>
                                    <div className="col-span-2">Revenue</div>
                                    <div className="col-span-1">Trend</div>
                                </div>

                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="grid grid-cols-12 gap-2 border-b p-3">
                                        <div className="col-span-5 font-medium">Product {i}</div>
                                        <div className="col-span-2">Category {(i % 3) + 1}</div>
                                        <div className="col-span-2">{1000 - i * 150}</div>
                                        <div className="col-span-2">
                                            ${(20000 - i * 2500).toLocaleString()}
                                        </div>
                                        <div className="col-span-1">
                                            {i % 2 === 0 ? (
                                                <Badge className="bg-green-500">↑</Badge>
                                            ) : (
                                                <Badge variant="outline">→</Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="regions" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Performance</CardTitle>
                            <CardDescription>Sell-out data by geographic region</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] bg-muted/30 rounded-md flex items-center justify-center">
                                <p className="text-muted-foreground">
                                    Regional Map Chart Placeholder
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="retailers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Performing Retailers</CardTitle>
                            <CardDescription>
                                Retailers with highest engagement and sell-out
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <div className="grid grid-cols-12 gap-2 border-b p-3 font-medium">
                                    <div className="col-span-4">Retailer</div>
                                    <div className="col-span-2">Region</div>
                                    <div className="col-span-2">Engagement</div>
                                    <div className="col-span-2">Reliability</div>
                                    <div className="col-span-2">Actions</div>
                                </div>

                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="grid grid-cols-12 gap-2 border-b p-3">
                                        <div className="col-span-4 font-medium">Retailer {i}</div>
                                        <div className="col-span-2">
                                            {['North', 'South', 'East', 'West', 'Central'][i - 1]}
                                        </div>
                                        <div className="col-span-2">
                                            <Badge variant={i <= 2 ? 'default' : 'outline'}>
                                                {100 - i * 5}%
                                            </Badge>
                                        </div>
                                        <div className="col-span-2">
                                            <Badge
                                                variant="outline"
                                                className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
                                            >
                                                {98 - i}%
                                            </Badge>
                                        </div>
                                        <div className="col-span-2">
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Campaigns</CardTitle>
                        <CardDescription>Your active marketing campaigns</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="rounded-lg border bg-card p-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">Campaign {i}</h4>
                                        <Badge variant={i === 1 ? 'default' : 'outline'}>
                                            {i === 1 ? 'Active' : 'Scheduled'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {i === 1
                                            ? 'Summer promotion targeting 120 retailers in the South region.'
                                            : 'New product launch campaign scheduled for next month.'}
                                    </p>
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            {i === 1 ? '14 days remaining' : 'Starts in 18 days'}
                                        </span>
                                        <Button variant="ghost" size="sm">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full" asChild>
                                <Link href="/industry/campaigns">Manage campaigns</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Data Insights</CardTitle>
                        <CardDescription>AI-generated insights from your data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="rounded-lg border bg-card p-3">
                                <div className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5 text-primary"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m15 9-6 6" />
                                        <path d="m9 9 6 6" />
                                    </svg>
                                    <h4 className="font-semibold">Product A sales declining</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Product A has shown a 15% decline in the North region over the
                                    past 30 days.
                                </p>
                                <div className="mt-2">
                                    <Button variant="outline" size="sm">
                                        Investigate
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-card p-3">
                                <div className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5 text-green-500"
                                    >
                                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                        <polyline points="16 7 22 7 22 13" />
                                    </svg>
                                    <h4 className="font-semibold">Category B growing</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Category B products have shown consistent growth of 22% across
                                    all regions.
                                </p>
                                <div className="mt-2">
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full">
                                View all insights
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
