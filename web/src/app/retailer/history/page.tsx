"use client";

import { useState, useMemo } from "react"

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

import { 
    Download,
    Filter, 
    Search, 
    Eye, 
    FileText, 
    CheckCircle, 
    AlertCircle, 
    Clock, 
    CalendarIcon, 
    X 
} from "lucide-react";

import { format } from "date-fns";
import { toast } from "sonner";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { mockSubmissions } from "./_mock/defaultSubmissions";

export default function HistoryPageClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const filteredSubmissions = useMemo(() => {
        return mockSubmissions.filter((submission) => {
            const matchesSearch =
                searchQuery === "" ||
                submission.id.toString().includes(searchQuery) ||
                submission.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                submission.status.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === "all" || submission.status.toLowerCase() === statusFilter.toLowerCase()

            const matchesType = typeFilter === "all" || submission.type.toLowerCase() === typeFilter.toLowerCase()

            const matchesDateRange =
                !dateRange?.from || !dateRange?.to || (submission.date >= dateRange.from && submission.date <= dateRange.to)

            return matchesSearch && matchesStatus && matchesType && matchesDateRange
        })
    }, [searchQuery, statusFilter, typeFilter, dateRange]);

    const getSubmissionsByType = (type: string) => {
        if (type === "all") return filteredSubmissions;
        return filteredSubmissions.filter((submission) => submission.type.toLowerCase() === type.toLowerCase());
    };

    const handleExport = () => {
        const headers = ["ID", "Date", "Type", "Products", "Total Value", "Status", "OCR Confidence"]
        const csvContent = [
            headers.join(","),
            ...filteredSubmissions.map((submission) =>
                [
                    submission.id,
                    submission.date.toLocaleDateString(),
                    submission.type,
                    submission.products,
                    submission.totalValue.toFixed(2),
                    submission.status,
                    submission.ocrConfidence || "N/A",
                ].join(","),
            ),
        ].join("\n")

        // Create and download file
        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `submission-history-${format(new Date(), "yyyy-MM-dd")}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)

        toast.success("Export completed successfully!")
    };

    const clearDateRange = () => {
        setDateRange(undefined)
        setIsDatePickerOpen(false)
    };

    const clearAllFilters = () => {
        setSearchQuery("")
        setStatusFilter("all")
        setTypeFilter("all")
        setDateRange(undefined)
        toast.success("All filters cleared")
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "processed":
                return (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Processed
                    </Badge>
                );
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge variant="outline" className="bg-red-500/10 text-red-500">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Rejected
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        };
    };

    const getTypeBadge = (type: string) => {
        switch (type.toLowerCase()) {
            case "receipt":
                return (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                        Receipt
                    </Badge>
                );
            case "manual":
                return (
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                        Manual
                    </Badge>
                );
            case "chatbot":
                return (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Chatbot
                    </Badge>
                );
            default:
                return <Badge variant="outline">{type}</Badge>;
        };
    };

    const activeFiltersCount = [
        searchQuery !== "",
        statusFilter !== "all",
        typeFilter !== "all",
        dateRange?.from && dateRange?.to,
    ].filter(Boolean).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Submission History</h2>
                    <p className="text-muted-foreground">View and manage your previous data submissions.</p>
                </div>
                <div className="flex gap-2">
                    <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="gap-2 bg-transparent">
                                <CalendarIcon className="h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(dateRange.from, "LLL dd, y")
                                    )
                                ) : (
                                    "Select Date Range"
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <div className="p-3 border-b">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Select Date Range</h4>
                                    {dateRange?.from && (
                                        <Button variant="ghost" size="sm" onClick={clearDateRange}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <CalendarComponent
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                            />
                            <div className="p-3 border-t">
                                <Button onClick={() => setIsDatePickerOpen(false)} className="w-full" disabled={!dateRange?.from}>
                                    Apply Date Range
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExport}>
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search submissions..."
                        className="w-full bg-background pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="processed">Processed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={cn("relative", activeFiltersCount > 0 && "border-primary")}
                >
                    <Filter className="h-4 w-4" />
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                    <span className="sr-only">Filter</span>
                </Button>
            </div>

            {showAdvancedFilters && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Advanced Filters</CardTitle>
                        <CardDescription>Refine your search with additional filters</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Submission Type</label>
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="receipt">Receipt</SelectItem>
                                        <SelectItem value="manual">Manual Entry</SelectItem>
                                        <SelectItem value="chatbot">Chatbot</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Results</label>
                                <div className="text-sm text-muted-foreground">
                                    Showing {filteredSubmissions.length} of {mockSubmissions.length} submissions
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={clearAllFilters}>
                                Clear All Filters
                            </Button>
                            <Button onClick={() => setShowAdvancedFilters(false)}>Apply Filters</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Submissions ({getSubmissionsByType("all").length})</TabsTrigger>
                    <TabsTrigger value="receipts">Receipts ({getSubmissionsByType("receipt").length})</TabsTrigger>
                    <TabsTrigger value="manual">Manual Entries ({getSubmissionsByType("manual").length})</TabsTrigger>
                    <TabsTrigger value="chatbot">Chatbot Submissions ({getSubmissionsByType("chatbot").length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader className="px-6">
                            <CardTitle>All Submissions</CardTitle>
                            <CardDescription>
                                {filteredSubmissions.length > 0
                                    ? `Showing ${filteredSubmissions.length} submissions`
                                    : "No submissions found matching your criteria"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6">
                            {filteredSubmissions.length > 0 ? (
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

                                    {filteredSubmissions.map((submission) => (
                                        <div key={submission.id} className="grid grid-cols-12 gap-2 border-b p-4">
                                            <div className="col-span-1 font-medium">#{submission.id}</div>
                                            <div className="col-span-2">{submission.date.toLocaleDateString()}</div>
                                            <div className="col-span-2">{getTypeBadge(submission.type)}</div>
                                            <div className="col-span-2">{submission.products}</div>
                                            <div className="col-span-2">${submission.totalValue.toFixed(2)}</div>
                                            <div className="col-span-2">{getStatusBadge(submission.status)}</div>
                                            <div className="col-span-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                    <span className="sr-only">View</span>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-medium">No submissions found</h3>
                                    <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
                                    <Button variant="outline" className="mt-4 bg-transparent" onClick={clearAllFilters}>
                                        Clear Filters
                                    </Button>
                                </div>
                            )}

                            {filteredSubmissions.length > 0 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        Showing <strong>1-{Math.min(10, filteredSubmissions.length)}</strong> of{" "}
                                        <strong>{filteredSubmissions.length}</strong> submissions
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" disabled>
                                            Previous
                                        </Button>
                                        <Button variant="outline" size="sm" disabled={filteredSubmissions.length <= 10}>
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="receipts" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Receipt Submissions</CardTitle>
                            <CardDescription>Submissions made via receipt upload</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {getSubmissionsByType("receipt")
                                    .slice(0, 6)
                                    .map((submission) => (
                                        <Card key={submission.id} className="overflow-hidden">
                                            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                                                <FileText className="h-10 w-10 text-muted-foreground" />
                                            </div>
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium">Receipt #{submission.id}</h4>
                                                        <p className="text-sm text-muted-foreground">{submission.date.toLocaleDateString()}</p>
                                                    </div>
                                                    {getStatusBadge(submission.status)}
                                                </div>
                                                <div className="mt-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Products:</span>
                                                        <span>{submission.products}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Total:</span>
                                                        <span>${submission.totalValue.toFixed(2)}</span>
                                                    </div>
                                                    {submission.ocrConfidence && (
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">OCR Confidence:</span>
                                                            <span>{submission.ocrConfidence}%</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <Button variant="ghost" size="sm" className="mt-2 w-full">
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
                            <CardDescription>Submissions made via manual data entry</CardDescription>
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

                                {getSubmissionsByType("manual")
                                    .slice(0, 5)
                                    .map((submission) => (
                                        <div key={submission.id} className="grid grid-cols-12 gap-2 border-b p-4">
                                            <div className="col-span-1 font-medium">#{submission.id}</div>
                                            <div className="col-span-3">{submission.date.toLocaleDateString()}</div>
                                            <div className="col-span-3">{submission.products}</div>
                                            <div className="col-span-3">${submission.totalValue.toFixed(2)}</div>
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
                            <CardDescription>Submissions made via chatbot interaction</CardDescription>
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

                                {getSubmissionsByType("chatbot")
                                    .slice(0, 5)
                                    .map((submission) => (
                                        <div key={submission.id} className="grid grid-cols-12 gap-2 border-b p-4">
                                            <div className="col-span-1 font-medium">#{submission.id}</div>
                                            <div className="col-span-3">{submission.date.toLocaleDateString()}</div>
                                            <div className="col-span-3">{submission.products}</div>
                                            <div className="col-span-3">${submission.totalValue.toFixed(2)}</div>
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
};
