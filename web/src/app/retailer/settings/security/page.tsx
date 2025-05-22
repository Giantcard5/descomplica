import type { Metadata } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Security Settings - Descomplica',
    description: 'Manage your account security',
};

export default function SecuritySettingsPage() {
    return (
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
                            <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
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
                                <Button variant="ghost" size="sm" className="text-destructive">
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
    );
}
