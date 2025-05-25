'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, Upload, MessageSquare, History, Award, Bell, Settings, LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Badge } from '@/components/ui/badge';

import { useAuth } from '@/hooks/use-auth';

export default function RetailerDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const isActive = (path: string) => {
        if (pathname.includes('/retailer/settings/')) {
            return path.includes('/retailer/settings');
        };

        return pathname === path;
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2">
                        <Link href="/retailer/" className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Logo" />
                                <AvatarFallback>DC</AvatarFallback>
                            </Avatar>
                            <span className="font-bold">Descomplica</span>
                        </Link>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild isActive={isActive('/retailer')}>
                                        <Link href="/retailer">
                                            <Home className="h-5 w-5" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive('/retailer/upload')}
                                    >
                                        <Link href="/retailer/upload">
                                            <Upload className="h-5 w-5" />
                                            <span>Upload Receipt</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive('/retailer/chatbot')}
                                    >
                                        <Link href="/retailer/chatbot">
                                            <MessageSquare className="h-5 w-5" />
                                            <span>Chatbot</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive('/retailer/history')}
                                    >
                                        <Link href="/retailer/history">
                                            <History className="h-5 w-5" />
                                            <span>History</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Engagement</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive('/retailer/rewards')}
                                    >
                                        <Link href="/retailer/rewards">
                                            <Award className="h-5 w-5" />
                                            <span>Rewards</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive('/retailer/notifications')}
                                    >
                                        <Link href="/retailer/notifications">
                                            <Bell className="h-5 w-5" />
                                            <span>Notifications</span>
                                            <Badge className="ml-auto" variant="secondary">
                                                3
                                            </Badge>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive={isActive('/retailer/settings')}>
                                <Link href="/retailer/settings/profile">
                                    <Settings className="h-5 w-5" />
                                    <span>Settings</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/auth/logout" onClick={() => logout()}>
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <div className="flex flex-1 flex-col">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
                    <SidebarTrigger />
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold">Retailer Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <Avatar>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    );
}
