import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Submission History - Descomplica',
    description: 'View your submission history and status',
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
    return children;
};
