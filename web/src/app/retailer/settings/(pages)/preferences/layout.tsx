import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Preferences Settings - Descomplica',
    description: 'Customize your app experience',
};

export default function SecuritySettingsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
