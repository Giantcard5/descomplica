import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reset Password - Descomplica',
    description: 'Reset your password from Descomplica account',
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return children;
}
