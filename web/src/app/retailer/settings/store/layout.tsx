import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Store Settings - Descomplica',
    description: 'Manage your store information',
};

export default function ProfileSettingsLayout({ children }: { children: React.ReactNode }) {
    return children;
};