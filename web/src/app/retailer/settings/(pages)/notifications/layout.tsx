import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Notification Settings - Descomplica',
    description: 'Manage your notification preferences',
};

export default function SecuritySettingsLayout({ children }: { children: React.ReactNode }) {
    return children;
};