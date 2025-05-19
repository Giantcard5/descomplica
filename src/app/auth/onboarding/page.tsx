import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Onboarding - Descomplica',
    description: 'Update your Descomplica account',
};

import Onboarding from '@/components/auth/onboarding';

export default function OnboardingPage() {
    return <Onboarding />;
}
