'use client';

import { useAuth } from '@/hooks/use-auth';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';

import { useLoadingBar } from '@/hooks/use-loading';

export default function Header() {
    const { user, logout } = useAuth();
    const { isLoading } = useLoadingBar();

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Descomplica Logo"
                        width={32}
                        height={32}
                        className="rounded"
                    />
                    <span className="text-xl font-bold">Descomplica</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="#features"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        How It Works
                    </Link>
                    <Link
                        href="#testimonials"
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Testimonials
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ModeToggle />

                    {user?.id && isLoading ? (
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-9 w-20 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    ) : user?.id ? (
                        <>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={user?.type}>
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Link>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="relative h-8 w-8 rounded-full"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={'/placeholder.svg?height=32&width=32'}
                                                alt={user?.name || 'User'}
                                            />
                                            <AvatarFallback>
                                                {user?.name ? getInitials(user.name) : 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`${user?.type}/settings`}
                                            className="cursor-pointer flex w-full items-center"
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={user?.type}
                                            className="cursor-pointer flex w-full items-center"
                                        >
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`${user?.type}/settings`}
                                            className="cursor-pointer flex w-full items-center"
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button size="sm">Register</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
