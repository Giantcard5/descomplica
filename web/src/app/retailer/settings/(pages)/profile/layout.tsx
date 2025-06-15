import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile Settings - Descomplica',
    description: 'Manage your profile information',
};

export default function ProfileSettingsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
