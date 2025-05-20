import type { Metadata } from 'next';

import ForgotPassword from '@/components/auth/forgot-password';

export const metadata: Metadata = {
    title: 'Forgot Password - Descomplica',
    description: 'Restore your password from Descomplica account',
};

export default function ForgotPasswordPage() {
    return <ForgotPassword />;
}
