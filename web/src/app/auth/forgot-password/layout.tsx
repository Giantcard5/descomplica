import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Forgot Password - Descomplica',
    description: 'Restore your password from Descomplica account',
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return children;
}
