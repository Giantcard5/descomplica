import { IndustryDashboardLayout } from '@/components/industry/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function RetailersLoading() {
    return (
        <IndustryDashboardLayout>
            <div className="flex items-center justify-between space-y-2">
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[120px]" />
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="all">All Retailers</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                    </TabsList>

                    <div className="flex space-x-2">
                        <Skeleton className="h-10 w-[300px]" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-[200px]" />
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="h-4 w-[300px]" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Skeleton className="h-4 w-[100px]" />
                                    </TableHead>
                                    <TableHead>
                                        <Skeleton className="h-4 w-[100px]" />
                                    </TableHead>
                                    <TableHead>
                                        <Skeleton className="h-4 w-[80px]" />
                                    </TableHead>
                                    <TableHead>
                                        <Skeleton className="h-4 w-[100px]" />
                                    </TableHead>
                                    <TableHead>
                                        <Skeleton className="h-4 w-[80px]" />
                                    </TableHead>
                                    <TableHead>
                                        <Skeleton className="h-4 w-[80px]" />
                                    </TableHead>
                                    <TableHead>
                                        <Skeleton className="h-4 w-[100px]" />
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Skeleton className="h-8 w-8 rounded-full" />
                                                    <div>
                                                        <Skeleton className="h-4 w-[120px]" />
                                                        <Skeleton className="h-3 w-[80px] mt-1" />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[120px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[80px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[80px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[80px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[80px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-[100px]" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Tabs>
        </IndustryDashboardLayout>
    );
}
