'use client';

import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { UploadMethods } from '@/components/retailer/upload/upload-methods';
import { ReceiptSummary } from '@/components/retailer/upload/receipt-summary';
import { ProgressStepper } from '@/components/retailer/upload/progress-stepper';
import { ProductMappingTable } from '@/components/retailer/upload/product-mapping-table';
import { ArrowLeft, ArrowRight, Check, Camera, FileText, Upload } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';

import { mockReceiptData } from './_utils/mock';

import { uploadService } from './_lib/api-service';

export default function UploadReceiptPage() {
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

    const uploadMethods = [
        {
            id: 'photo',
            label: 'Photo Upload',
            icon: Camera,
        },
        {
            id: 'manual',
            label: 'Manual Entry',
            icon: FileText,
        },
        {
            id: 'file',
            label: 'File Upload',
            icon: Upload,
        },
    ];

    const handleProcessReceipt = async (file: File) => {
        if (!file) {
            return toast({
                title: 'No file selected',
                description: 'Please select a file to upload',
            });
        }

        try {
            setIsProcessing(true);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('method', uploadMethod);

            const response = await uploadService.postUpload(formData);

            if (response.length > 0) {
                console.log(response);

                setIsProcessing(false);
                setIsUploaded(true);
                setCurrentStep(1);
            } else {
                toast({
                    title: 'Failed to process receipt',
                    description: 'No items found, please try again or contact support',
                });
            }
        } catch (error: any) {
            toast({
                title: 'Failed to process receipt',
                description: error?.message || 'Please try again or contact support',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleProductUpdate = (updatedItems: any) => {
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
                description: 'Your receipt data has been saved and is being processed.',
            });
        }, 1500);
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsUploaded(false);
        setReceiptData(mockReceiptData);
        setUploadMethod('photo');
    };

    const handleMethodChange = (method: string) => {
        if (!isProcessing && !isUploaded) {
            setUploadMethod(method);
        }
    };

    return (
        <div className="space-y-6">
            <ProgressStepper steps={steps} currentStep={currentStep} />

            {currentStep === 0 && (
                <Tabs value={uploadMethod} onValueChange={handleMethodChange} className="space-y-4">
                    <div className="flex justify-center">
                        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                            {uploadMethods.map((method) => {
                                const Icon = method.icon;
                                return (
                                    <TabsTrigger
                                        key={method.id}
                                        value={method.id}
                                        className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                                        disabled={isProcessing || isUploaded}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span className="hidden sm:inline">{method.label}</span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>

                    {uploadMethods.map((method) => (
                        <TabsContent key={method.id} value={method.id}>
                            <UploadMethods
                                method={method.id}
                                onProcess={handleProcessReceipt}
                                isProcessing={isProcessing}
                                isUploaded={isUploaded}
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            )}

            {currentStep === 1 && (
                <div className="space-y-6">
                    <Alert variant="default" className="bg-muted/50">
                        <AlertTitle className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            Receipt Processed via{' '}
                            {uploadMethods.find((m) => m.id === uploadMethod)?.label}
                        </AlertTitle>
                        <AlertDescription>
                            We've detected {receiptData.items.length} products. Please review and
                            confirm the product matches below.
                        </AlertDescription>
                    </Alert>

                    <ProductMappingTable items={receiptData.items} onUpdate={handleProductUpdate} />

                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
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
