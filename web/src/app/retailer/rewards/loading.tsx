import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>

            {/* Top summary cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="pb-2">
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-3 w-3/4" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Next reward progress */}
            <Card>
                <CardHeader className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-2 w-full" />
                    </div>
                    <Skeleton className="h-24 w-full" />
                </CardContent>
            </Card>

            {/* Tabs skeleton */}
            <Tabs defaultValue="rewards" className="space-y-4">
                <TabsList className="flex gap-4">
                    {['', '', ''].map((_, i) => (
                        <TabsTrigger key={i} value={`tab-${i}`} disabled>
                            <Skeleton className="h-8 w-24" />
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="rewards" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                            </CardHeader>
                            <CardFooter>
                                <Skeleton className="h-8 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent
                    value="achievements"
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-2 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="leaderboard" className="space-y-4">
                    <Card>
                        <CardHeader className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-6 w-full" />
                            ))}
                        </CardContent>
                        <CardFooter className="border-t">
                            <Skeleton className="h-8 w-full" />
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Upcoming opportunities */}
            <Card>
                <CardHeader className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
