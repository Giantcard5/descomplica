import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Calendar,
    Download,
    Filter,
    Search,
    Eye,
    FileText,
    CheckCircle,
    AlertCircle,
    Clock,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Submission History - Descomplica',
    description: 'View your submission history and status',
};

export default function HistoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Submission History</h2>
                    <p className="text-muted-foreground">
                        View and manage your previous data submissions.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Select Date Range
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search submissions..."
                        className="w-full bg-background pl-8"
                    />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="processed">Processed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                </Button>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Submissions</TabsTrigger>
                    <TabsTrigger value="receipts">Receipts</TabsTrigger>
                    <TabsTrigger value="manual">Manual Entries</TabsTrigger>
                    <TabsTrigger value="chatbot">Chatbot Submissions</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader className="px-6">
                            <CardTitle>Recent Submissions</CardTitle>
                            <CardDescription>
                                Your data submissions from the past 30 days
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6">
                            <div className="rounded-md border">
                                <div className="grid grid-cols-12 gap-2 border-b p-4 font-medium">
                                    <div className="col-span-1">#</div>
                                    <div className="col-span-2">Date</div>
                                    <div className="col-span-2">Type</div>
                                    <div className="col-span-2">Products</div>
                                    <div className="col-span-2">Total Value</div>
                                    <div className="col-span-2">Status</div>
                                    <div className="col-span-1">Actions</div>
                                </div>

                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-12 gap-2 border-b p-4"
                                    >
                                        <div className="col-span-1 font-medium">
                                            #{1024 - i}
                                        </div>
                                        <div className="col-span-2">
                                            {new Date(2025, 4, 12 - i).toLocaleDateString()}
                                        </div>
                                        <div className="col-span-2">
                                            {i % 3 === 0 ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-blue-500/10 text-blue-500"
                                                >
                                                    Receipt
                                                </Badge>
                                            ) : i % 3 === 1 ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-purple-500/10 text-purple-500"
                                                >
                                                    Manual
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-500/10 text-green-500"
                                                >
                                                    Chatbot
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="col-span-2">{5 + i}</div>
                                        <div className="col-span-2">
                                            ${(120 + i * 15).toFixed(2)}
                                        </div>
                                        <div className="col-span-2">
                                            {i % 4 === 0 ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-yellow-500/10 text-yellow-500"
                                                >
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    Pending
                                                </Badge>
                                            ) : i % 4 === 1 ? (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-red-500/10 text-red-500"
                                                >
                                                    <AlertCircle className="mr-1 h-3 w-3" />
                                                    Rejected
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-500/10 text-green-500"
                                                >
                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                    Processed
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="col-span-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">View</span>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing <strong>1-10</strong> of <strong>24</strong>{' '}
                                    submissions
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" disabled>
                                        Previous
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="receipts" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Receipt Submissions</CardTitle>
                            <CardDescription>
                                Submissions made via receipt upload
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Card key={i} className="overflow-hidden">
                                        <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                                            <FileText className="h-10 w-10 text-muted-foreground" />
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium">
                                                        Receipt #{1020 - i}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(
                                                            2025,
                                                            4,
                                                            10 - i
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-500/10 text-green-500"
                                                >
                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                    Processed
                                                </Badge>
                                            </div>
                                            <div className="mt-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Products:
                                                    </span>
                                                    <span>{4 + i}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        Total:
                                                    </span>
                                                    <span>${(85 + i * 12).toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        OCR Confidence:
                                                    </span>
                                                    <span>{95 - i}%</span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 w-full"
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manual Entries</CardTitle>
                            <CardDescription>
                                Submissions made via manual data entry
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <div className="grid grid-cols-12 gap-2 border-b p-4 font-medium">
                                    <div className="col-span-1">#</div>
                                    <div className="col-span-3">Date</div>
                                    <div className="col-span-3">Products</div>
                                    <div className="col-span-3">Total Value</div>
                                    <div className="col-span-2">Actions</div>
                                </div>

                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-12 gap-2 border-b p-4"
                                    >
                                        <div className="col-span-1 font-medium">
                                            #{1018 - i}
                                        </div>
                                        <div className="col-span-3">
                                            {new Date(2025, 4, 8 - i).toLocaleDateString()}
                                        </div>
                                        <div className="col-span-3">{3 + i}</div>
                                        <div className="col-span-3">
                                            ${(75 + i * 10).toFixed(2)}
                                        </div>
                                        <div className="col-span-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="chatbot" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Chatbot Submissions</CardTitle>
                            <CardDescription>
                                Submissions made via chatbot interaction
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <div className="grid grid-cols-12 gap-2 border-b p-4 font-medium">
                                    <div className="col-span-1">#</div>
                                    <div className="col-span-3">Date</div>
                                    <div className="col-span-3">Products</div>
                                    <div className="col-span-3">Total Value</div>
                                    <div className="col-span-2">Actions</div>
                                </div>

                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-12 gap-2 border-b p-4"
                                    >
                                        <div className="col-span-1 font-medium">
                                            #{1015 - i}
                                        </div>
                                        <div className="col-span-3">
                                            {new Date(2025, 4, 5 - i).toLocaleDateString()}
                                        </div>
                                        <div className="col-span-3">{2 + i}</div>
                                        <div className="col-span-3">
                                            ${(50 + i * 15).toFixed(2)}
                                        </div>
                                        <div className="col-span-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
