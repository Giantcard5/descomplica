import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Rewards - Descomplica',
    description: 'View your rewards and achievements',
};

export default function RewardsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-6">
            {children}
        </div>
    );
}
