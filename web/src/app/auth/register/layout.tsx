import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register - Descomplica',
    description: 'Create your Descomplica account',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return children;
};