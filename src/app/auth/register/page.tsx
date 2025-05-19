import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register - Descomplica',
    description: 'Create your Descomplica account',
};

import Register from '@/components/auth/register';

export default function RegisterPage() {
    return <Register />;
}
