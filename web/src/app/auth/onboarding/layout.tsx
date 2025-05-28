import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Onboarding - Descomplica',
    description: 'Update your Descomplica account',
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return children;
};