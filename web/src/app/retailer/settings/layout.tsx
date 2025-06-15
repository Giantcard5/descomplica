'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { User, Store, Bell, Lock, Globe, HelpCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function RetailerSettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const routes = [
        {
            href: '/retailer/settings/profile',
            label: 'Profile',
            icon: User,
            active: pathname === '/retailer/settings/profile',
        },
        {
            href: '/retailer/settings/store',
            label: 'Store',
            icon: Store,
            active: pathname === '/retailer/settings/store',
        },
        {
            href: '/retailer/settings/notifications',
            label: 'Notifications',
            icon: Bell,
            active: pathname === '/retailer/settings/notifications',
        },
        {
            href: '/retailer/settings/security',
            label: 'Security',
            icon: Lock,
            active: pathname === '/retailer/settings/security',
        },
        {
            href: '/retailer/settings/preferences',
            label: 'Preferences',
            icon: Globe,
            active: pathname === '/retailer/settings/preferences',
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="space-y-4">
                <div className="grid w-full grid-cols-5 lg:w-auto rounded-md bg-muted p-1 text-muted-foreground">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                'flex items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                                route.active
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'hover:bg-muted/50 hover:text-foreground'
                            )}
                        >
                            <route.icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{route.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="space-y-4">
                    {children}

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
                </div>
            </div>
        </div>
    );
}
