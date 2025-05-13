import type { Metadata } from 'next';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Filter, Download, Plus, FileText, Calendar, RefreshCw } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export const metadata: Metadata = {
    title: 'Reports | Descomplica Industry',
    description: 'Generate and manage reports for your industry data',
};

export default function ReportsPage() {
    // Sample data for reports
    const reports = [
        {
            id: 'REP001',
            name: 'Monthly Sales Summary',
            type: 'Sales',
            format: 'PDF',
            created: 'May 1, 2025',
            scheduled: 'Monthly',
            status: 'completed',
        },
        {
            id: 'REP002',
            name: 'Retailer Performance Q1',
            type: 'Performance',
            format: 'Excel',
            created: 'Apr 15, 2025',
            scheduled: 'Quarterly',
            status: 'completed',
        },
        {
            id: 'REP003',
            name: 'Campaign Effectiveness',
            type: 'Marketing',
            format: 'PDF',
            created: 'May 5, 2025',
            scheduled: 'None',
            status: 'processing',
        },
        {
            id: 'REP004',
            name: 'Product Category Analysis',
            type: 'Product',
            format: 'Excel',
            created: 'May 8, 2025',
            scheduled: 'None',
            status: 'completed',
        },
        {
            id: 'REP005',
            name: 'Regional Sales Breakdown',
            type: 'Sales',
            format: 'PDF',
            created: 'May 10, 2025',
            scheduled: 'Weekly',
            status: 'scheduled',
        },
    ];

    // Function to render status badge with appropriate color
    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge className="bg-green-500">Completed</Badge>;
            case 'processing':
                return (
                    <Badge variant="secondary" className="bg-blue-500 text-white">
                        Processing
                    </Badge>
                );
            case 'scheduled':
                return (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                        Scheduled
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Generate Report
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="all">All Reports</TabsTrigger>
                        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                        <TabsTrigger value="custom">Custom</TabsTrigger>
                    </TabsList>

                    <div className="flex space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search reports..."
                                className="w-[200px] sm:w-[300px] pl-8"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Reports</CardTitle>
                            <CardDescription>
                                View and manage all your generated reports
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40px]">
                                            <Checkbox id="select-all" />
                                        </TableHead>
                                        <TableHead>Report Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Format</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Schedule</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reports.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell>
                                                <Checkbox id={`select-${report.id}`} />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div>{report.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {report.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{report.type}</TableCell>
                                            <TableCell>{report.format}</TableCell>
                                            <TableCell>{report.created}</TableCell>
                                            <TableCell>{report.scheduled}</TableCell>
                                            <TableCell>
                                                {renderStatusBadge(report.status)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing 5 of 25 reports
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="scheduled" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scheduled Reports</CardTitle>
                            <CardDescription>
                                View and manage your scheduled reports
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40px]">
                                            <Checkbox id="select-all-scheduled" />
                                        </TableHead>
                                        <TableHead>Report Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Format</TableHead>
                                        <TableHead>Next Run</TableHead>
                                        <TableHead>Frequency</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reports
                                        .filter((report) => report.scheduled !== 'None')
                                        .map((report) => (
                                            <TableRow key={report.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        id={`select-scheduled-${report.id}`}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <div>
                                                            <div>{report.name}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {report.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{report.type}</TableCell>
                                                <TableCell>{report.format}</TableCell>
                                                <TableCell>May 15, 2025</TableCell>
                                                <TableCell>{report.scheduled}</TableCell>
                                                <TableCell>
                                                    {renderStatusBadge(report.status)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">
                                                        <RefreshCw className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Custom Report</CardTitle>
                            <CardDescription>
                                Generate a custom report based on your specific requirements
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Report Name</label>
                                    <Input placeholder="Enter report name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Report Type</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select report type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sales">Sales</SelectItem>
                                            <SelectItem value="performance">Performance</SelectItem>
                                            <SelectItem value="marketing">Marketing</SelectItem>
                                            <SelectItem value="product">Product</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date Range</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select date range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="last7">Last 7 days</SelectItem>
                                            <SelectItem value="last30">Last 30 days</SelectItem>
                                            <SelectItem value="last90">Last 90 days</SelectItem>
                                            <SelectItem value="custom">Custom range</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Format</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                            <SelectItem value="csv">CSV</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Data to Include</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="sales-data" />
                                        <label htmlFor="sales-data" className="text-sm">
                                            Sales Data
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="retailer-performance" />
                                        <label htmlFor="retailer-performance" className="text-sm">
                                            Retailer Performance
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="product-analytics" />
                                        <label htmlFor="product-analytics" className="text-sm">
                                            Product Analytics
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="campaign-metrics" />
                                        <label htmlFor="campaign-metrics" className="text-sm">
                                            Campaign Metrics
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="regional-breakdown" />
                                        <label htmlFor="regional-breakdown" className="text-sm">
                                            Regional Breakdown
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="trend-analysis" />
                                        <label htmlFor="trend-analysis" className="text-sm">
                                            Trend Analysis
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Schedule (Optional)</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="No schedule" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No schedule</SelectItem>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="ml-auto">Generate Report</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
}
