'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema, FormSchema } from './utils/schema';

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

import { useToast } from '@/hooks/use-toast';
import { useNotifications } from './hook/useNotifications';

export default function NotificationSettingsPage() {
    const { toast } = useToast();
    const { handleNotifications } = useNotifications({
        onSuccess: (preferences) => reset(preferences),
    })

    const {
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await handleNotifications(data);

            toast({
                title: response.message,
                description: response.status
                    ? 'Your notification preferences have been updated'
                    : 'Your notification preferences could not be updated',
                variant: response.status ? 'default' : 'destructive',
            });
        } catch (error) {
            console.error('Error updating notification:', error);
            toast({
                title: 'Error',
                description: 'There was an issue updating your notification preferences.',
                variant: 'destructive',
            });
        };
    });


    return (
        <Card>
            <form onSubmit={onSubmit}>
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
                                    <Label htmlFor="email-submissions">Submission Updates</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about your data submission status
                                    </p>
                                </div>
                                <Switch
                                    id="email-submissions"
                                    checked={watch('email_submision')}
                                    onCheckedChange={(checked) => {
                                        setValue('email_submision', checked);
                                    }}
                                />
                                {errors.email_submision && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email_submision.message}
                                    </p>
                                )}
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="email-campaigns">Campaign Notifications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about new campaigns and promotions
                                    </p>
                                </div>
                                <Switch
                                    id="email-campaigns"
                                    checked={watch('email_campaign')}
                                    onCheckedChange={(checked) => {
                                        setValue('email_campaign', checked);
                                    }}
                                />
                                {errors.email_campaign && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email_campaign.message}
                                    </p>
                                )}
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="email-rewards">Rewards & Points</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about your rewards and points
                                    </p>
                                </div>
                                <Switch
                                    id="email-rewards"
                                    checked={watch('email_rewards_and_points')}
                                    onCheckedChange={(checked) => {
                                        setValue('email_rewards_and_points', checked);
                                    }}
                                />
                                {errors.email_rewards_and_points && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email_rewards_and_points.message}
                                    </p>
                                )}
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="email-newsletter">Newsletter</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive our monthly newsletter with tips and updates
                                    </p>
                                </div>
                                <Switch
                                    id="email-newsletter"
                                    checked={watch('email_newsletter')}
                                    onCheckedChange={(checked) => {
                                        setValue('email_newsletter', checked);
                                    }}
                                />
                                {errors.email_newsletter && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email_newsletter.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Push Notifications</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="push-submissions">Submission Updates</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive push notifications about your data submission status
                                    </p>
                                </div>
                                <Switch
                                    id="push-submissions"
                                    checked={watch('submission')}
                                    onCheckedChange={(checked) => {
                                        setValue('submission', checked);
                                    }}
                                />
                                {errors.submission && (
                                    <p className="text-red-500 text-sm">
                                        {errors.submission.message}
                                    </p>
                                )}
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="push-campaigns">Campaign Notifications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive push notifications about new campaigns and
                                        promotions
                                    </p>
                                </div>
                                <Switch
                                    id="push-campaigns"
                                    checked={watch('campaign')}
                                    onCheckedChange={(checked) => {
                                        setValue('campaign', checked);
                                    }}
                                />
                                {errors.campaign && (
                                    <p className="text-red-500 text-sm">
                                        {errors.campaign.message}
                                    </p>
                                )}
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="push-rewards">Rewards & Points</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive push notifications about your rewards and points
                                    </p>
                                </div>
                                <Switch
                                    id="push-rewards"
                                    checked={watch('rewards_and_points')}
                                    onCheckedChange={(checked) => {
                                        setValue('rewards_and_points', checked);
                                    }}
                                />
                                {errors.rewards_and_points && (
                                    <p className="text-red-500 text-sm">
                                        {errors.rewards_and_points.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Frequency</h3>
                        <div className="space-y-2">
                            <Label htmlFor="notification-frequency">Email Digest Frequency</Label>
                            <Select
                                value={watch('notification_frequency')}
                                onValueChange={(value) => {
                                    setValue(
                                        'notification_frequency',
                                        value as 'real_time' | 'daily' | 'weekly' | 'never'
                                    );
                                }}
                            >
                                <SelectTrigger id="notification-frequency">
                                    <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="real_time">Real-time</SelectItem>
                                    <SelectItem value="daily">Daily Digest</SelectItem>
                                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                                    <SelectItem value="never">Never</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.notification_frequency && (
                                <p className="text-red-500 text-sm">
                                    {errors.notification_frequency.message}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" type="reset">
                        Cancel
                    </Button>
                    <Button type="submit">Save Preferences</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
