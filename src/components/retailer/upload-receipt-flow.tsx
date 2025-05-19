'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Steps, Step } from '@/components/ui/steps';
import { UploadMethods } from '@/components/retailer/upload-methods';
import { ProductMappingTable } from '@/components/retailer/product-mapping-table';
import { ReceiptSummary } from '@/components/retailer/receipt-summary';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock receipt data after OCR or manual entry
const mockReceiptData = {
    store: 'Market Express',
    date: '2025-05-14',
    items: [
        { id: 1, alias: 'Z012', quantity: 2, price: 3.99, total: 7.98, status: 'unmatched' },
        { id: 2, alias: 'SA943S', quantity: 1, price: 2.49, total: 2.49, status: 'unmatched' },
        {
            id: 3,
            alias: 'COKE500',
            quantity: 3,
            price: 1.99,
            total: 5.97,
            status: 'matched',
            matchedProduct: 'Coca-Cola Original 500ml',
        },
        { id: 4, alias: 'CHIPS123', quantity: 2, price: 3.29, total: 6.58, status: 'unmatched' },
    ],
    total: 22.02,
};

export function UploadReceiptFlow() {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(0);
    const [uploadMethod, setUploadMethod] = useState('photo');
    const [receiptData, setReceiptData] = useState(mockReceiptData);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const steps = [
        { id: 'upload', label: 'Upload Receipt' },
        { id: 'review', label: 'Review Products' },
        { id: 'confirm', label: 'Confirm & Submit' },
    ];

    const handleProcessReceipt = () => {
        setIsProcessing(true);
        // Simulate processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsUploaded(true);
            setCurrentStep(1);
            toast({
                title: 'Receipt processed successfully',
                description: "We've extracted the product information. Please review and confirm.",
            });
        }, 1500);
    };

    const handleProductUpdate = (updatedItems) => {
        setReceiptData({ ...receiptData, items: updatedItems });
    };

    const handleSubmit = () => {
        setIsProcessing(true);
        // Simulate submission delay
        setTimeout(() => {
            setIsProcessing(false);
            setCurrentStep(2);
            toast({
                title: 'Receipt submitted successfully',
                description: 'Your receipt data has been saved.',
            });
        }, 1500);
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsUploaded(false);
        setReceiptData(mockReceiptData);
    };

    return (
        <div className="space-y-6">
            <Steps currentStep={currentStep} className="pb-6">
                {steps.map((step, index) => (
                    <Step
                        key={step.id}
                        id={step.id}
                        label={step.label}
                        isActive={currentStep === index}
                        isCompleted={currentStep > index}
                    />
                ))}
            </Steps>

            {currentStep === 0 && (
                <>
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Tip</AlertTitle>
                        <AlertDescription>
                            For the best results, ensure your receipt is well-lit and the text is
                            clearly visible.
                        </AlertDescription>
                    </Alert>

                    <Tabs
                        value={uploadMethod}
                        onValueChange={setUploadMethod}
                        className="space-y-4"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="photo">Photo Upload</TabsTrigger>
                            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                            <TabsTrigger value="file">File Upload</TabsTrigger>
                        </TabsList>

                        <UploadMethods
                            method={uploadMethod}
                            onProcess={handleProcessReceipt}
                            isProcessing={isProcessing}
                            isUploaded={isUploaded}
                        />
                    </Tabs>
                </>
            )}

            {currentStep === 1 && (
                <div className="space-y-6">
                    <Alert variant="default" className="bg-muted/50">
                        <AlertTitle className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            Receipt Processed
                        </AlertTitle>
                        <AlertDescription>
                            We've detected {receiptData.items.length} products. Please review and
                            confirm the product matches below.
                        </AlertDescription>
                    </Alert>

                    <ProductMappingTable items={receiptData.items} onUpdate={handleProductUpdate} />

                    <div className="flex justify-between pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentStep(0)}
                            disabled={isProcessing}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Upload
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                isProcessing ||
                                receiptData.items.some((item) => item.status === 'unmatched')
                            }
                        >
                            {isProcessing ? 'Processing...' : 'Confirm & Submit'}
                            {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <ReceiptSummary receiptData={receiptData} onReset={handleReset} />
            )}
        </div>
    );
}
