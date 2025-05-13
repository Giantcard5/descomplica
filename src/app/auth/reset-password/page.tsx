import type { Metadata } from 'next';

import ResetPassword from '@/components/auth/reset-password';

export const metadata: Metadata = {
    title: 'Reset Password - Descomplica',
    description: 'Reset your password from Descomplica account',
};

export default function ResetPasswordPage() {
    return <ResetPassword/>;
};