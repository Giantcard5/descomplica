'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    securityService
} from './lib/api-service';

import {
    formSchema,
    FormSchema
} from './utils/schema';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { Shield } from 'lucide-react';

export default function SecuritySettingsPage() {
    const [security, setSecurity] = useState<{
        two_factor_authentication: boolean;
        login_sessions: {
            name: string;
            type: string;
            address: string;
            last_login: string;
        }[]
    }>();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const getSecurity = async () => {
            const response = await securityService.getSecurity();

            setSecurity(response);
        };

        getSecurity();
    }, []);

    const handleSecurity: SubmitHandler<FormSchema> = async (data) => {
        try {
            const response = await securityService.postSecurity(data);

            if (response) {
                reset(response);
            };
        } catch (err: any) {
            console.error(err);
        };
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(handleSecurity)}>
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" {...register('current_password')} placeholder="Current Password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" {...register('new_password')} placeholder="New Password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" {...register('confirm_password')} placeholder="Confirm New Password" />
                        </div>
                        <Button>Update Password</Button>
                    </div>
                </form>

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
                        <Switch id="two-factor" checked={security?.two_factor_authentication} />
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
                        {security?.login_sessions.map((session, index) => (
                            <div key={index} className="p-4 border-b">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{session.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {session.type} on {session.address}
                                        </p>
                                    </div>
                                    <Badge>{session.last_login}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full">
                        Sign Out of All Devices
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};