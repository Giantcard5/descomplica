import type { Metadata } from 'next';

import Login from '@/components/auth/login';

export const metadata: Metadata = {
    title: 'Login - Descomplica',
    description: 'Login to your Descomplica account',
};

export default function LoginPage() {
    return <Login />;
}
