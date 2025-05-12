import type { Metadata } from 'next';
import { IndustryDashboardLayout } from '@/components/industry/dashboard-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Download, Calendar, CheckCircle, FileText, Plus } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Billing - Descomplica Industry',
    description: 'Manage your subscription and billing information',
};

export default function BillingPage() {
    return (
        <IndustryDashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
                        <p className="text-muted-foreground">
                            Manage your subscription and payment information.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download Invoices
                        </Button>
                        <Button className="gap-2">
                            <CreditCard className="h-4 w-4" />
                            Manage Payment Methods
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>Your subscription details</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">Enterprise</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Unlimited access to all features
                                    </p>
                                </div>
                                <Badge className="bg-primary">Active</Badge>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Billing Period</span>
                                    <span>Annual</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Next Billing Date</span>
                                    <span>January 15, 2026</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span>$9,999.00 / year</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                            <Button variant="outline" className="w-full">
                                Change Plan
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Usage</CardTitle>
                            <CardDescription>Current usage metrics</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">Retailers</span>
                                    <span className="text-sm text-muted-foreground">
                                        248 / Unlimited
                                    </span>
                                </div>
                                <Progress value={65} className="h-2" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">Data Storage</span>
                                    <span className="text-sm text-muted-foreground">
                                        1.8 TB / 5 TB
                                    </span>
                                </div>
                                <Progress value={36} className="h-2" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">API Calls</span>
                                    <span className="text-sm text-muted-foreground">450K / 1M</span>
                                </div>
                                <Progress value={45} className="h-2" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">Active Campaigns</span>
                                    <span className="text-sm text-muted-foreground">4 / 10</span>
                                </div>
                                <Progress value={40} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>Your default payment method</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="flex items-center gap-3">
                                <div className="rounded-md bg-muted p-2">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">Visa ending in 4242</p>
                                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Billing Address</span>
                                    <span>123 Business St, Suite 100</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">City, State</span>
                                    <span>San Francisco, CA 94107</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Country</span>
                                    <span>United States</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                            <Button variant="outline" className="w-full">
                                Update Payment Method
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <Tabs defaultValue="invoices" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="invoices">Invoices</TabsTrigger>
                        <TabsTrigger value="payment-history">Payment History</TabsTrigger>
                        <TabsTrigger value="billing-contacts">Billing Contacts</TabsTrigger>
                    </TabsList>

                    <TabsContent value="invoices" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice History</CardTitle>
                                <CardDescription>
                                    View and download your past invoices
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 gap-2 border-b p-4 font-medium">
                                        <div className="col-span-1">Invoice</div>
                                        <div className="col-span-3">Date</div>
                                        <div className="col-span-3">Billing Period</div>
                                        <div className="col-span-2">Amount</div>
                                        <div className="col-span-1">Status</div>
                                        <div className="col-span-2">Actions</div>
                                    </div>

                                    {[
                                        {
                                            id: 'INV-2025-001',
                                            date: 'Jan 15, 2025',
                                            period: 'Jan 15, 2025 - Jan 14, 2026',
                                            amount: '$9,999.00',
                                            status: 'Paid',
                                        },
                                        {
                                            id: 'INV-2024-012',
                                            date: 'Dec 15, 2024',
                                            period: 'Dec 15, 2024 - Jan 14, 2025',
                                            amount: '$899.00',
                                            status: 'Paid',
                                        },
                                        {
                                            id: 'INV-2024-011',
                                            date: 'Nov 15, 2024',
                                            period: 'Nov 15, 2024 - Dec 14, 2024',
                                            amount: '$899.00',
                                            status: 'Paid',
                                        },
                                        {
                                            id: 'INV-2024-010',
                                            date: 'Oct 15, 2024',
                                            period: 'Oct 15, 2024 - Nov 14, 2024',
                                            amount: '$899.00',
                                            status: 'Paid',
                                        },
                                        {
                                            id: 'INV-2024-009',
                                            date: 'Sep 15, 2024',
                                            period: 'Sep 15, 2024 - Oct 14, 2024',
                                            amount: '$899.00',
                                            status: 'Paid',
                                        },
                                    ].map((invoice, i) => (
                                        <div
                                            key={i}
                                            className="grid grid-cols-12 gap-2 border-b p-4"
                                        >
                                            <div className="col-span-1 font-medium">
                                                {invoice.id}
                                            </div>
                                            <div className="col-span-3">{invoice.date}</div>
                                            <div className="col-span-3">{invoice.period}</div>
                                            <div className="col-span-2">{invoice.amount}</div>
                                            <div className="col-span-1">
                                                <Badge className="bg-green-500">
                                                    {invoice.status}
                                                </Badge>
                                            </div>
                                            <div className="col-span-2 flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4" />
                                                    <span className="sr-only">Download</span>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payment-history" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment History</CardTitle>
                                <CardDescription>Record of all your payments</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 gap-2 border-b p-4 font-medium">
                                        <div className="col-span-1">ID</div>
                                        <div className="col-span-2">Date</div>
                                        <div className="col-span-3">Description</div>
                                        <div className="col-span-2">Payment Method</div>
                                        <div className="col-span-2">Amount</div>
                                        <div className="col-span-2">Status</div>
                                    </div>

                                    {[
                                        {
                                            id: 'PMT-2025-001',
                                            date: 'Jan 15, 2025',
                                            description: 'Annual Subscription',
                                            method: 'Visa •••• 4242',
                                            amount: '$9,999.00',
                                            status: 'Successful',
                                        },
                                        {
                                            id: 'PMT-2024-012',
                                            date: 'Dec 15, 2024',
                                            description: 'Monthly Subscription',
                                            method: 'Visa •••• 4242',
                                            amount: '$899.00',
                                            status: 'Successful',
                                        },
                                        {
                                            id: 'PMT-2024-011',
                                            date: 'Nov 15, 2024',
                                            description: 'Monthly Subscription',
                                            method: 'Visa •••• 4242',
                                            amount: '$899.00',
                                            status: 'Successful',
                                        },
                                        {
                                            id: 'PMT-2024-010',
                                            date: 'Oct 15, 2024',
                                            description: 'Monthly Subscription',
                                            method: 'Visa •••• 4242',
                                            amount: '$899.00',
                                            status: 'Successful',
                                        },
                                        {
                                            id: 'PMT-2024-009',
                                            date: 'Sep 15, 2024',
                                            description: 'Monthly Subscription',
                                            method: 'Visa •••• 4242',
                                            amount: '$899.00',
                                            status: 'Successful',
                                        },
                                    ].map((payment, i) => (
                                        <div
                                            key={i}
                                            className="grid grid-cols-12 gap-2 border-b p-4"
                                        >
                                            <div className="col-span-1 font-medium">
                                                {payment.id}
                                            </div>
                                            <div className="col-span-2">{payment.date}</div>
                                            <div className="col-span-3">{payment.description}</div>
                                            <div className="col-span-2">
                                                <div className="flex items-center gap-1">
                                                    <CreditCard className="h-3 w-3 text-muted-foreground" />
                                                    <span>{payment.method}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-2">{payment.amount}</div>
                                            <div className="col-span-2">
                                                <div className="flex items-center gap-1">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    <span>{payment.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="billing-contacts" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <CardTitle>Billing Contacts</CardTitle>
                                        <CardDescription>
                                            People who receive billing notifications and invoices
                                        </CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Contact
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 gap-2 border-b p-4 font-medium">
                                        <div className="col-span-3">Name</div>
                                        <div className="col-span-3">Email</div>
                                        <div className="col-span-2">Role</div>
                                        <div className="col-span-2">Notifications</div>
                                        <div className="col-span-2">Actions</div>
                                    </div>

                                    {[
                                        {
                                            name: 'John Smith',
                                            email: 'john.smith@acmecorp.com',
                                            role: 'Finance Director',
                                            notifications: [
                                                'Invoices',
                                                'Payment Reminders',
                                                'Plan Changes',
                                            ],
                                        },
                                        {
                                            name: 'Sarah Johnson',
                                            email: 'sarah.johnson@acmecorp.com',
                                            role: 'Accounting Manager',
                                            notifications: ['Invoices', 'Payment Reminders'],
                                        },
                                        {
                                            name: 'Michael Chen',
                                            email: 'michael.chen@acmecorp.com',
                                            role: 'CFO',
                                            notifications: ['Plan Changes'],
                                        },
                                    ].map((contact, i) => (
                                        <div
                                            key={i}
                                            className="grid grid-cols-12 gap-2 border-b p-4"
                                        >
                                            <div className="col-span-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={`/placeholder.svg?height=32&width=32&text=${contact.name[0]}`}
                                                            alt={contact.name}
                                                        />
                                                        <AvatarFallback>
                                                            {contact.name[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">
                                                            {contact.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">{contact.email}</div>
                                            <div className="col-span-2">
                                                <Badge variant="outline">{contact.role}</Badge>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="flex flex-col gap-1">
                                                    {contact.notifications.map(
                                                        (notification, j) => (
                                                            <div
                                                                key={j}
                                                                className="flex items-center gap-1 text-xs"
                                                            >
                                                                <CheckCircle className="h-3 w-3 text-green-500" />
                                                                <span>{notification}</span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-span-2 flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-destructive"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Billing Documents</CardTitle>
                                <CardDescription>Tax and legal documents</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        {
                                            name: 'W-9 Form',
                                            description: 'Tax form for US businesses',
                                            date: 'Jan 10, 2025',
                                            status: 'Current',
                                        },
                                        {
                                            name: 'Tax Exemption Certificate',
                                            description: 'Sales tax exemption documentation',
                                            date: 'Dec 5, 2024',
                                            status: 'Current',
                                        },
                                        {
                                            name: 'Service Agreement',
                                            description: 'Legal contract for services',
                                            date: 'Jan 15, 2025',
                                            status: 'Current',
                                        },
                                    ].map((document, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between rounded-lg border p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-md bg-muted p-2">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{document.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {document.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span>{document.date}</span>
                                                </div>
                                                <Badge className="bg-green-500">
                                                    {document.status}
                                                </Badge>
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4" />
                                                    <span className="sr-only">Download</span>
                                                </Button>
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
                        <CardTitle>Billing Support</CardTitle>
                        <CardDescription>
                            Get help with billing and subscription issues
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2">
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
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Contact Support</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Get help from our billing specialists
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full">Contact Support</Button>
                                </div>
                            </div>
                            <div className="rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2">
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
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                            <path d="M12 17h.01" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">FAQ</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Find answers to common billing questions
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button variant="outline" className="w-full">
                                        View FAQ
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2">
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
                                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Billing Documentation</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Detailed guides on billing processes
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button variant="outline" className="w-full">
                                        View Documentation
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </IndustryDashboardLayout>
    );
}
