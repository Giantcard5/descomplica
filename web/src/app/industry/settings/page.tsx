import type { Metadata } from 'next';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Bell, Lock, Globe, Upload, Shield, Plus, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Settings - Descomplica Industry',
    description: 'Manage your account settings and preferences',
};

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Tabs defaultValue="company" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5 lg:w-auto">
                    <TabsTrigger value="company" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span className="hidden sm:inline">Company</span>
                    </TabsTrigger>
                    <TabsTrigger value="team" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">Team</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span className="hidden sm:inline">Preferences</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="company" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Information</CardTitle>
                            <CardDescription>Update your company details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src="/placeholder.svg?height=96&width=96"
                                        alt="Company Logo"
                                    />
                                    <AvatarFallback>AC</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Company Logo</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Upload your company logo. Recommended size: 300x300px.
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <Upload className="h-4 w-4" />
                                            Upload
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
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="company-name">Company Name</Label>
                                <Input id="company-name" defaultValue="Acme Corporation" />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Select defaultValue="consumer-goods">
                                        <SelectTrigger id="industry">
                                            <SelectValue placeholder="Select industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="consumer-goods">
                                                Consumer Goods
                                            </SelectItem>
                                            <SelectItem value="technology">Technology</SelectItem>
                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                            <SelectItem value="retail">Retail</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-size">Company Size</Label>
                                    <Select defaultValue="large">
                                        <SelectTrigger id="company-size">
                                            <SelectValue placeholder="Select company size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">1-50 employees</SelectItem>
                                            <SelectItem value="medium">51-500 employees</SelectItem>
                                            <SelectItem value="large">
                                                501-5000 employees
                                            </SelectItem>
                                            <SelectItem value="enterprise">
                                                5000+ employees
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company-website">Website</Label>
                                <Input
                                    id="company-website"
                                    type="url"
                                    defaultValue="https://acmecorp.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company-address">Address</Label>
                                <Input
                                    id="company-address"
                                    defaultValue="123 Business St, Suite 100"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" defaultValue="San Francisco" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State/Province</Label>
                                    <Input id="state" defaultValue="CA" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Zip/Postal Code</Label>
                                    <Input id="zip" defaultValue="94107" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select defaultValue="us">
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="ca">Canada</SelectItem>
                                        <SelectItem value="mx">Mexico</SelectItem>
                                        <SelectItem value="br">Brazil</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company-description">Company Description</Label>
                                <textarea
                                    id="company-description"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={3}
                                    placeholder="Describe your company"
                                    defaultValue="Acme Corporation is a leading provider of consumer goods with a focus on quality and innovation."
                                ></textarea>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>
                                        Manage your team and their access
                                    </CardDescription>
                                </div>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Team Member
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <div className="grid grid-cols-12 gap-2 border-b p-4 font-medium">
                                    <div className="col-span-4">Name</div>
                                    <div className="col-span-3">Email</div>
                                    <div className="col-span-2">Role</div>
                                    <div className="col-span-1">Status</div>
                                    <div className="col-span-2">Actions</div>
                                </div>

                                {[
                                    {
                                        name: 'John Smith',
                                        email: 'john.smith@acmecorp.com',
                                        role: 'Admin',
                                        status: 'active',
                                    },
                                    {
                                        name: 'Sarah Johnson',
                                        email: 'sarah.johnson@acmecorp.com',
                                        role: 'Analyst',
                                        status: 'active',
                                    },
                                    {
                                        name: 'Michael Chen',
                                        email: 'michael.chen@acmecorp.com',
                                        role: 'Manager',
                                        status: 'active',
                                    },
                                    {
                                        name: 'Emily Davis',
                                        email: 'emily.davis@acmecorp.com',
                                        role: 'Viewer',
                                        status: 'pending',
                                    },
                                    {
                                        name: 'Robert Wilson',
                                        email: 'robert.wilson@acmecorp.com',
                                        role: 'Analyst',
                                        status: 'inactive',
                                    },
                                ].map((member, i) => (
                                    <div key={i} className="grid grid-cols-12 gap-2 border-b p-4">
                                        <div className="col-span-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={`/placeholder.svg?height=32&width=32&text=${member.name[0]}`}
                                                        alt={member.name}
                                                    />
                                                    <AvatarFallback>
                                                        {member.name[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{member.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-3">{member.email}</div>
                                        <div className="col-span-2">
                                            <Badge variant="outline">{member.role}</Badge>
                                        </div>
                                        <div className="col-span-1">
                                            {member.status === 'active' ? (
                                                <Badge className="bg-green-500">Active</Badge>
                                            ) : member.status === 'pending' ? (
                                                <Badge
                                                    variant="outline"
                                                    className="border-amber-500 text-amber-500"
                                                >
                                                    Pending
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">Inactive</Badge>
                                            )}
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
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Team Roles</CardTitle>
                            <CardDescription>
                                Manage role permissions and access levels
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        role: 'Admin',
                                        description: 'Full access to all features and settings',
                                        permissions: [
                                            'Manage team',
                                            'Manage billing',
                                            'Access all data',
                                            'Create campaigns',
                                            'Generate reports',
                                        ],
                                    },
                                    {
                                        role: 'Manager',
                                        description:
                                            'Access to most features with limited settings',
                                        permissions: [
                                            'View team',
                                            'Access all data',
                                            'Create campaigns',
                                            'Generate reports',
                                        ],
                                    },
                                    {
                                        role: 'Analyst',
                                        description: 'Access to data and reports',
                                        permissions: ['Access all data', 'Generate reports'],
                                    },
                                    {
                                        role: 'Viewer',
                                        description: 'Read-only access to data',
                                        permissions: ['View data', 'View reports'],
                                    },
                                ].map((role, i) => (
                                    <div key={i} className="rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold">{role.role}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {role.description}
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Edit Role
                                            </Button>
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="text-sm font-medium mb-2">
                                                Permissions:
                                            </h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {role.permissions.map((permission, j) => (
                                                    <div
                                                        key={j}
                                                        className="flex items-center gap-2 text-sm"
                                                    >
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
                                                            className="h-4 w-4 text-green-500"
                                                        >
                                                            <path d="M20 6 9 17l-5-5" />
                                                        </svg>
                                                        <span>{permission}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Manage how you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Email Notifications</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-retailer-updates">
                                                Retailer Updates
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about retailer activity and
                                                submissions
                                            </p>
                                        </div>
                                        <Switch id="email-retailer-updates" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-campaigns">
                                                Campaign Updates
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about campaign performance and status
                                                changes
                                            </p>
                                        </div>
                                        <Switch id="email-campaigns" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-reports">
                                                Report Notifications
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails when reports are generated
                                            </p>
                                        </div>
                                        <Switch id="email-reports" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-team">Team Activity</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about team member actions and changes
                                            </p>
                                        </div>
                                        <Switch id="email-team" />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-newsletter">
                                                Product Updates
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about new features and product
                                                updates
                                            </p>
                                        </div>
                                        <Switch id="email-newsletter" defaultChecked />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">In-App Notifications</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="app-retailer-updates">
                                                Retailer Updates
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive in-app notifications about retailer activity
                                            </p>
                                        </div>
                                        <Switch id="app-retailer-updates" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="app-campaigns">Campaign Updates</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive in-app notifications about campaign
                                                performance
                                            </p>
                                        </div>
                                        <Switch id="app-campaigns" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="app-reports">
                                                Report Notifications
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive in-app notifications when reports are
                                                generated
                                            </p>
                                        </div>
                                        <Switch id="app-reports" defaultChecked />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Notification Frequency</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="notification-frequency">
                                        Email Digest Frequency
                                    </Label>
                                    <Select defaultValue="daily">
                                        <SelectTrigger id="notification-frequency">
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="realtime">Real-time</SelectItem>
                                            <SelectItem value="daily">Daily Digest</SelectItem>
                                            <SelectItem value="weekly">Weekly Digest</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Change Password</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                                <Button>Update Password</Button>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="two-factor">
                                            Enable Two-Factor Authentication
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                    <Switch id="two-factor" defaultChecked />
                                </div>
                                <Button variant="outline">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Manage Two-Factor Authentication
                                </Button>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">API Access</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="api-access">Enable API Access</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Allow access to your data via API
                                        </p>
                                    </div>
                                    <Switch id="api-access" defaultChecked />
                                </div>
                                <Button variant="outline">Manage API Keys</Button>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Login Sessions</h3>
                                <div className="rounded-md border">
                                    <div className="p-4 border-b">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Current Session</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Chrome on Windows • San Francisco, CA
                                                </p>
                                            </div>
                                            <Badge>Active Now</Badge>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Mobile App</p>
                                                <p className="text-sm text-muted-foreground">
                                                    iPhone • Last active 2 days ago
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive"
                                            >
                                                Sign Out
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Firefox</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Mac OS • Last active 5 days ago
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive"
                                            >
                                                Sign Out
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                    Sign Out of All Devices
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>App Preferences</CardTitle>
                            <CardDescription>Customize your app experience</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Language & Region</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                            <SelectItem value="pt">Português</SelectItem>
                                            <SelectItem value="fr">Français</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date-format">Date Format</Label>
                                    <Select defaultValue="mdy">
                                        <SelectTrigger id="date-format">
                                            <SelectValue placeholder="Select date format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                            <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select defaultValue="usd">
                                        <SelectTrigger id="currency">
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="usd">USD ($)</SelectItem>
                                            <SelectItem value="eur">EUR (€)</SelectItem>
                                            <SelectItem value="gbp">GBP (£)</SelectItem>
                                            <SelectItem value="brl">BRL (R$)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Dashboard Preferences</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="auto-refresh">Auto-refresh Dashboard</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically refresh dashboard data
                                        </p>
                                    </div>
                                    <Switch id="auto-refresh" defaultChecked />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="refresh-interval">Refresh Interval</Label>
                                    <Select defaultValue="5">
                                        <SelectTrigger id="refresh-interval">
                                            <SelectValue placeholder="Select interval" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 minute</SelectItem>
                                            <SelectItem value="5">5 minutes</SelectItem>
                                            <SelectItem value="15">15 minutes</SelectItem>
                                            <SelectItem value="30">30 minutes</SelectItem>
                                            <SelectItem value="60">1 hour</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="show-tooltips">Show Tooltips</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Display helpful tooltips throughout the interface
                                        </p>
                                    </div>
                                    <Switch id="show-tooltips" defaultChecked />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Accessibility</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="reduced-motion">Reduce Motion</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Minimize animations throughout the application
                                        </p>
                                    </div>
                                    <Switch id="reduced-motion" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="high-contrast">High Contrast</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Increase contrast for better visibility
                                        </p>
                                    </div>
                                    <Switch id="high-contrast" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Reset to Defaults</Button>
                            <Button>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
