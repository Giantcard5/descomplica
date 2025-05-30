import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Upload Receipt - Descomplica',
    description: 'Upload your receipt data to Descomplica with product alias recognition',
};

export default function UploadReceiptLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Upload Receipt</h2>
                <p className="text-muted-foreground">
                    Submit your sell-out data through one of the available methods.
                </p>
            </div>

            {children}
        </div>
    );
}