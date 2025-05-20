import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Chart,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendItem,
    ChartGrid,
    ChartXAxis,
    ChartYAxis,
    ChartArea,
    ChartLine,
    ChartBar,
} from '@/components/ui/chart';

export const metadata: Metadata = {
    title: 'Analytics | Descomplica Industry',
    description: 'View detailed analytics and insights for your industry data',
};

export default function AnalyticsPage() {
    // Sample data for charts
    const lineChartData = [
        { name: 'Jan', value: 2400 },
        { name: 'Feb', value: 1398 },
        { name: 'Mar', value: 9800 },
        { name: 'Apr', value: 3908 },
        { name: 'May', value: 4800 },
        { name: 'Jun', value: 3800 },
        { name: 'Jul', value: 4300 },
    ];

    const barChartData = [
        { name: 'Product A', value: 4000 },
        { name: 'Product B', value: 3000 },
        { name: 'Product C', value: 2000 },
        { name: 'Product D', value: 2780 },
        { name: 'Product E', value: 1890 },
        { name: 'Product F', value: 2390 },
        { name: 'Product G', value: 3490 },
    ];

    const multiLineData = [
        { name: 'Jan', sales: 4000, returns: 2400 },
        { name: 'Feb', sales: 3000, returns: 1398 },
        { name: 'Mar', sales: 2000, returns: 9800 },
        { name: 'Apr', sales: 2780, returns: 3908 },
        { name: 'May', sales: 1890, returns: 4800 },
        { name: 'Jun', sales: 2390, returns: 3800 },
        { name: 'Jul', sales: 3490, returns: 4300 },
    ];

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                <div className="flex items-center space-x-2">
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
                    <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Date Range
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="retailers">Retailers</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$45,231.89</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Active Retailers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+2350</div>
                                <p className="text-xs text-muted-foreground">
                                    +180 from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+12,234</div>
                                <p className="text-xs text-muted-foreground">
                                    +19% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Active Campaigns
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">7</div>
                                <p className="text-xs text-muted-foreground">+2 from last month</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Revenue Over Time</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Chart className="h-80">
                                    <ChartContainer>
                                        <ChartTooltip>
                                            <ChartTooltipContent />
                                        </ChartTooltip>
                                        <ChartGrid />
                                        <ChartXAxis dataKey="name" />
                                        <ChartYAxis />
                                        <ChartArea
                                            dataKey="value"
                                            data={lineChartData}
                                            fill="hsl(var(--primary))"
                                            fillOpacity={0.2}
                                        />
                                        <ChartLine
                                            dataKey="value"
                                            data={lineChartData}
                                            stroke="hsl(var(--primary))"
                                        />
                                    </ChartContainer>
                                </Chart>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Top Products</CardTitle>
                                <CardDescription>Product performance by revenue</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Chart className="h-80">
                                    <ChartContainer>
                                        <ChartTooltip>
                                            <ChartTooltipContent />
                                        </ChartTooltip>
                                        <ChartGrid />
                                        <ChartXAxis dataKey="name" />
                                        <ChartYAxis />
                                        <ChartBar
                                            dataKey="value"
                                            data={barChartData}
                                            fill="hsl(var(--primary))"
                                        />
                                    </ChartContainer>
                                </Chart>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Sales vs Returns</CardTitle>
                                <CardDescription>
                                    Comparison of sales and returns over time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Chart className="h-80">
                                    <ChartContainer>
                                        <ChartTooltip>
                                            <ChartTooltipContent />
                                        </ChartTooltip>
                                        <ChartLegend>
                                            <ChartLegendItem
                                                name="Sales"
                                                color="hsl(var(--primary))"
                                            />
                                            <ChartLegendItem
                                                name="Returns"
                                                color="hsl(var(--destructive))"
                                            />
                                        </ChartLegend>
                                        <ChartGrid />
                                        <ChartXAxis dataKey="name" />
                                        <ChartYAxis />
                                        <ChartLine
                                            dataKey="sales"
                                            data={multiLineData}
                                            stroke="hsl(var(--primary))"
                                        />
                                        <ChartLine
                                            dataKey="returns"
                                            data={multiLineData}
                                            stroke="hsl(var(--destructive))"
                                        />
                                    </ChartContainer>
                                </Chart>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="sales" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Analytics</CardTitle>
                            <CardDescription>
                                Detailed breakdown of sales performance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Select a time period and filters to view detailed sales analytics.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="retailers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Retailer Performance</CardTitle>
                            <CardDescription>
                                Analytics based on retailer performance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Select retailers to compare performance metrics.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Analytics</CardTitle>
                            <CardDescription>Performance metrics for products</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Select products to view detailed performance analytics.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
}
