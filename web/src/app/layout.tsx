import type React from 'react';

import type { Metadata } from 'next/types';

import { Inter } from 'next/font/google';

import { LoadingBarProvider } from '@/providers/loading-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

import { Toaster } from '@/components/ui/toaster';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Descomplica - Retail Intelligence for Everyone',
    description: 'Simplifying retail data collection and analysis',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <LoadingBarProvider>
                        <AuthProvider>
                            <SidebarProvider>
                                <div className="w-full min-h-screen">{children}</div>
                                <Toaster />
                            </SidebarProvider>
                        </AuthProvider>
                    </LoadingBarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
