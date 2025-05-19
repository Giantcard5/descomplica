import type { Metadata } from 'next';

import { UploadReceiptFlow } from '@/components/retailer/upload-receipt-flow';

export const metadata: Metadata = {
    title: 'Upload Receipt - Descomplica',
    description: 'Upload your receipt data to Descomplica with product alias recognition',
};

export default function UploadReceiptPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Upload Receipt</h2>
                <p className="text-muted-foreground">
                    Submit your sell-out data through one of the available methods.
                </p>
            </div>

            <UploadReceiptFlow />
        </div>
    );
}
