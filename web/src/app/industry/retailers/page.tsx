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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Filter, MapPin, Download, Plus, Star, StarHalf } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Retailers | Descomplica Industry',
    description: 'Manage and view all retailers in your network',
};

export default function RetailersPage() {
    // Sample data for retailers
    const retailers = [
        {
            id: 'RET001',
            name: 'SuperMart',
            location: 'São Paulo, SP',
            status: 'active',
            submissions: 1245,
            revenue: 45600,
            rating: 4.8,
            lastActive: '2 hours ago',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 'RET002',
            name: 'QuickShop',
            location: 'Rio de Janeiro, RJ',
            status: 'active',
            submissions: 987,
            revenue: 32400,
            rating: 4.5,
            lastActive: '1 day ago',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 'RET003',
            name: 'ValueStore',
            location: 'Belo Horizonte, MG',
            status: 'inactive',
            submissions: 543,
            revenue: 18900,
            rating: 3.9,
            lastActive: '5 days ago',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 'RET004',
            name: 'MegaMarket',
            location: 'Brasília, DF',
            status: 'active',
            submissions: 1876,
            revenue: 67800,
            rating: 4.7,
            lastActive: '3 hours ago',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        {
            id: 'RET005',
            name: 'LocalShop',
            location: 'Salvador, BA',
            status: 'pending',
            submissions: 321,
            revenue: 12300,
            rating: 4.2,
            lastActive: '2 days ago',
            avatar: '/placeholder.svg?height=40&width=40',
        },
    ];

    // Function to render status badge with appropriate color
    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-500">Active</Badge>;
            case 'inactive':
                return <Badge variant="secondary">Inactive</Badge>;
            case 'pending':
                return <Badge variant="outline">Pending</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    // Function to render star rating
    const renderRating = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <div className="flex items-center">
                {Array(fullStars)
                    .fill(0)
                    .map((_, i) => (
                        <Star
                            key={`star-${i}`}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Retailers</h2>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Retailer
                    </Button>
                </div>
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
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search retailers..."
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
                            <CardTitle>All Retailers</CardTitle>
                            <CardDescription>
                                Manage and view all retailers in your network
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Retailer</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Submissions</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Last Active</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {retailers.map((retailer) => (
                                        <TableRow key={retailer.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={
                                                                retailer.avatar ||
                                                                '/placeholder.svg'
                                                            }
                                                            alt={retailer.name}
                                                        />
                                                        <AvatarFallback>
                                                            {retailer.name.substring(0, 2)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div>{retailer.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {retailer.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                                    {retailer.location}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {renderStatusBadge(retailer.status)}
                                            </TableCell>
                                            <TableCell>
                                                {retailer.submissions.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                ${retailer.revenue.toLocaleString()}
                                            </TableCell>
                                            <TableCell>{renderRating(retailer.rating)}</TableCell>
                                            <TableCell>{retailer.lastActive}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                                Showing 5 of 100 retailers
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

                <TabsContent value="active" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Retailers</CardTitle>
                            <CardDescription>View all currently active retailers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Retailer</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Submissions</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Last Active</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {retailers
                                        .filter((retailer) => retailer.status === 'active')
                                        .map((retailer) => (
                                            <TableRow key={retailer.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage
                                                                src={
                                                                    retailer.avatar ||
                                                                    '/placeholder.svg'
                                                                }
                                                                alt={retailer.name}
                                                            />
                                                            <AvatarFallback>
                                                                {retailer.name.substring(0, 2)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div>{retailer.name}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {retailer.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        {retailer.location}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {retailer.submissions.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    ${retailer.revenue.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    {renderRating(retailer.rating)}
                                                </TableCell>
                                                <TableCell>{retailer.lastActive}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="inactive" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inactive Retailers</CardTitle>
                            <CardDescription>View all inactive retailers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Retailer</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Submissions</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Last Active</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {retailers
                                        .filter((retailer) => retailer.status === 'inactive')
                                        .map((retailer) => (
                                            <TableRow key={retailer.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage
                                                                src={
                                                                    retailer.avatar ||
                                                                    '/placeholder.svg'
                                                                }
                                                                alt={retailer.name}
                                                            />
                                                            <AvatarFallback>
                                                                {retailer.name.substring(0, 2)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div>{retailer.name}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {retailer.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        {retailer.location}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {retailer.submissions.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    ${retailer.revenue.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    {renderRating(retailer.rating)}
                                                </TableCell>
                                                <TableCell>{retailer.lastActive}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Retailers</CardTitle>
                            <CardDescription>View retailers pending approval</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Retailer</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Submissions</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Last Active</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {retailers
                                        .filter((retailer) => retailer.status === 'pending')
                                        .map((retailer) => (
                                            <TableRow key={retailer.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage
                                                                src={
                                                                    retailer.avatar ||
                                                                    '/placeholder.svg'
                                                                }
                                                                alt={retailer.name}
                                                            />
                                                            <AvatarFallback>
                                                                {retailer.name.substring(0, 2)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div>{retailer.name}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {retailer.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                                        {retailer.location}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {retailer.submissions.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    ${retailer.revenue.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    {renderRating(retailer.rating)}
                                                </TableCell>
                                                <TableCell>{retailer.lastActive}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
}
