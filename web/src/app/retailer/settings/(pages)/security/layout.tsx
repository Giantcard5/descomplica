import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Security Settings - Descomplica',
    description: 'Manage your account security',
};

export default function SecuritySettingsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
