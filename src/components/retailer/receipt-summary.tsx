'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, FileText, ArrowLeft } from 'lucide-react';

interface ReceiptSummaryProps {
    receiptData: {
        store: string;
        date: string;
        items: any[];
        total: number;
    };
    onReset: () => void;
}

export function ReceiptSummary({ receiptData, onReset }: ReceiptSummaryProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <CardTitle>Receipt Submitted Successfully</CardTitle>
                            <CardDescription>
                                Your receipt data has been processed and saved.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Store</h3>
                                <p>{receiptData.store}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                                <p>{receiptData.date}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                                Products
                            </h3>
                            <div className="rounded-lg border">
                                <div className="grid grid-cols-12 gap-2 border-b p-3 font-medium">
                                    <div className="col-span-4">Product</div>
                                    <div className="col-span-4">Alias</div>
                                    <div className="col-span-2">Quantity</div>
                                    <div className="col-span-2">Total</div>
                                </div>

                                {receiptData.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-12 gap-2 border-b p-3"
                                    >
                                        <div className="col-span-4">{item.matchedProduct}</div>
                                        <div className="col-span-4 font-mono text-sm">
                                            {item.alias}
                                        </div>
                                        <div className="col-span-2">{item.quantity}</div>
                                        <div className="col-span-2">${item.total.toFixed(2)}</div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between p-3">
                                    <span className="font-medium">Total Amount</span>
                                    <span>${receiptData.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                            <Button variant="outline" onClick={onReset}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Upload Another Receipt
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="outline">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Download Receipt
                                </Button>
                                <Button>View in History</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
