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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const metadata: Metadata = {
    title: 'Notification Settings - Descomplica',
    description: 'Manage your notification preferences',
};

export default function NotificationSettingsPage() {
    return (
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
                                    Receive emails about new campaigns and promotions
                                </p>
                            </div>
                            <Switch id="email-campaigns" defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-rewards">Rewards & Points</Label>
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
                                    Receive our monthly newsletter with tips and updates
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
                                    Receive push notifications about new campaigns and
                                    promotions
                                </p>
                            </div>
                            <Switch id="push-campaigns" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="push-rewards">Rewards & Points</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive push notifications about your rewards and
                                    points
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
    );
};