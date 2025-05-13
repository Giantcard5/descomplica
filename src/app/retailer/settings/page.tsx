import { Badge } from '@/components/ui/badge';
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
import {
    User,
    Lock,
    Bell,
    Globe,
    Store,
    Upload,
    Shield,
    CreditCard,
    HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Settings - Descomplica',
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

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5 lg:w-auto">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="store" className="flex items-center gap-2">
                        <Store className="h-4 w-4" />
                        <span className="hidden sm:inline">Store</span>
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

                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src="/placeholder.svg?height=96&width=96"
                                        alt="User"
                                    />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Profile Picture</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Upload a new profile picture. Recommended size:
                                        300x300px.
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

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" defaultValue="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="john.doe@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <textarea
                                    id="bio"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={3}
                                    placeholder="Tell us about yourself"
                                    defaultValue="Owner of a small retail store specializing in groceries and household items."
                                ></textarea>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="store" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Information</CardTitle>
                            <CardDescription>Update your store details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="store-name">Store Name</Label>
                                <Input id="store-name" defaultValue="John's Market" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="store-type">Store Type</Label>
                                <Select defaultValue="grocery">
                                    <SelectTrigger id="store-type">
                                        <SelectValue placeholder="Select store type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="grocery">Grocery Store</SelectItem>
                                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                                        <SelectItem value="convenience">
                                            Convenience Store
                                        </SelectItem>
                                        <SelectItem value="hardware">Hardware Store</SelectItem>
                                        <SelectItem value="clothing">Clothing Store</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="store-size">Store Size (sq ft)</Label>
                                    <Input id="store-size" type="number" defaultValue="1200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="employees">Number of Employees</Label>
                                    <Input id="employees" type="number" defaultValue="5" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="store-address">Store Address</Label>
                                <Input id="store-address" defaultValue="123 Main Street" />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" defaultValue="Springfield" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State/Province</Label>
                                    <Input id="state" defaultValue="IL" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Zip/Postal Code</Label>
                                    <Input id="zip" defaultValue="62701" />
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
                                <Label htmlFor="store-description">Store Description</Label>
                                <textarea
                                    id="store-description"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={3}
                                    placeholder="Describe your store"
                                    defaultValue="A family-owned grocery store serving the local community with fresh produce and everyday essentials."
                                ></textarea>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Manage how you receive notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Email Notifications</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-submissions">
                                                Submission Updates
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about your data submission status
                                            </p>
                                        </div>
                                        <Switch id="email-submissions" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-campaigns">
                                                Campaign Notifications
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about new campaigns and
                                                promotions
                                            </p>
                                        </div>
                                        <Switch id="email-campaigns" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-rewards">
                                                Rewards & Points
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about your rewards and points
                                            </p>
                                        </div>
                                        <Switch id="email-rewards" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-newsletter">Newsletter</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive our monthly newsletter with tips and
                                                updates
                                            </p>
                                        </div>
                                        <Switch id="email-newsletter" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Push Notifications</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-submissions">
                                                Submission Updates
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications about your data
                                                submission status
                                            </p>
                                        </div>
                                        <Switch id="push-submissions" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-campaigns">
                                                Campaign Notifications
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications about new campaigns
                                                and promotions
                                            </p>
                                        </div>
                                        <Switch id="push-campaigns" />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-rewards">
                                                Rewards & Points
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications about your rewards
                                                and points
                                            </p>
                                        </div>
                                        <Switch id="push-rewards" defaultChecked />
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
                                            <SelectItem value="weekly">
                                                Weekly Digest
                                            </SelectItem>
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
                                    <Label htmlFor="confirm-password">
                                        Confirm New Password
                                    </Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                                <Button>Update Password</Button>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Two-Factor Authentication
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="two-factor">
                                            Enable Two-Factor Authentication
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                    <Switch id="two-factor" />
                                </div>
                                <Button variant="outline" disabled>
                                    <Shield className="mr-2 h-4 w-4" />
                                    Set Up Two-Factor Authentication
                                </Button>
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
                                                    Chrome on Windows • Springfield, IL
                                                </p>
                                            </div>
                                            <Badge>Active Now</Badge>
                                        </div>
                                    </div>
                                    <div className="p-4">
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
                                <h3 className="text-lg font-medium">Appearance</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="theme">Theme</Label>
                                    <Select defaultValue="system">
                                        <SelectTrigger id="theme">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator />

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

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Manage your payment information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-md border">
                                <div className="p-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-muted p-2">
                                                <CreditCard className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    Visa ending in 4242
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Expires 12/2025
                                                </p>
                                            </div>
                                        </div>
                                        <Badge>Default</Badge>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="gap-2">
                                <CreditCard className="h-4 w-4" />
                                Add Payment Method
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Help & Support</CardTitle>
                            <CardDescription>Get help with your account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-2">
                                    <HelpCircle className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Need help?</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Our support team is available 24/7 to assist you.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <Button variant="outline" className="gap-2">
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
                                        className="h-4 w-4"
                                    >
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    View Documentation
                                </Button>
                                <Button variant="outline" className="gap-2">
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
                                        className="h-4 w-4"
                                    >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    Contact Support
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
