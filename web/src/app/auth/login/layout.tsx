import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login - Descomplica',
    description: 'Login to your Descomplica account',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
};