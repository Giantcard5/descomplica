'use client';

import type React from 'react';

import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Camera, FileText, Loader2 } from 'lucide-react';
import { ProductEntryForm } from '@/components/retailer/product-entry-form';

interface UploadMethodsProps {
    method: string;
    onProcess: () => void;
    isProcessing: boolean;
    isUploaded: boolean;
}

export function UploadMethods({ method, onProcess, isProcessing, isUploaded }: UploadMethodsProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    return (
        <Tabs defaultValue={method}>
            <TabsContent value="photo" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Receipt Photo</CardTitle>
                        <CardDescription>
                            Take a photo or upload an image of your receipt
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10">
                            {selectedFile ? (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="relative w-full max-w-md h-48 bg-muted rounded-lg overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <p className="text-sm text-muted-foreground">
                                                {selectedFile.name}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        File selected: {selectedFile.name}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Camera className="h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        Drag and drop your receipt image here or click to browse
                                    </p>
                                </div>
                            )}
                            <Input
                                id="receipt-photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <div className="flex gap-2">
                                <Button asChild variant={selectedFile ? 'outline' : 'default'}>
                                    <label htmlFor="receipt-photo">
                                        <Upload className="mr-2 h-4 w-4" />
                                        {selectedFile ? 'Change Image' : 'Upload Image'}
                                    </label>
                                </Button>
                                <Button variant="outline">
                                    <Camera className="mr-2 h-4 w-4" />
                                    Take Photo
                                </Button>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h4 className="mb-2 font-medium">OCR Processing</h4>
                            <p className="text-sm text-muted-foreground">
                                Our system will automatically extract the following information from
                                your receipt:
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                <li>• Store name and location</li>
                                <li>• Date of purchase</li>
                                <li>• Product names and quantities</li>
                                <li>• Prices and total amount</li>
                            </ul>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                onClick={onProcess}
                                disabled={isProcessing || !selectedFile || isUploaded}
                            >
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isProcessing ? 'Processing...' : 'Process Receipt'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Manual Data Entry</CardTitle>
                        <CardDescription>Enter your receipt data manually</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="store-name">Store Name</Label>
                                <Input
                                    id="store-name"
                                    placeholder="Your store name"
                                    defaultValue="Market Express"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" defaultValue="2025-05-14" />
                            </div>
                        </div>

                        <ProductEntryForm />

                        <div className="flex justify-end">
                            <Button onClick={onProcess} disabled={isProcessing || isUploaded}>
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isProcessing ? 'Processing...' : 'Submit Data'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="file" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>File Upload</CardTitle>
                        <CardDescription>
                            Upload a CSV or Excel file with your sell-out data
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10">
                            {selectedFile ? (
                                <div className="flex flex-col items-center gap-2">
                                    <FileText className="h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        File selected: {selectedFile.name}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <FileText className="h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        Drag and drop your CSV or Excel file here or click to browse
                                    </p>
                                </div>
                            )}
                            <Input
                                id="file-upload"
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Button asChild variant={selectedFile ? 'outline' : 'default'}>
                                <label htmlFor="file-upload">
                                    <Upload className="mr-2 h-4 w-4" />
                                    {selectedFile ? 'Change File' : 'Select File'}
                                </label>
                            </Button>
                        </div>

                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h4 className="mb-2 font-medium">File Requirements</h4>
                            <p className="text-sm text-muted-foreground">
                                Your file should include the following columns:
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                <li>• Product Name</li>
                                <li>• Product Code (if available)</li>
                                <li>• Quantity</li>
                                <li>• Unit Price</li>
                                <li>• Total Price</li>
                                <li>• Date of Sale</li>
                            </ul>
                            <div className="mt-4">
                                <Button variant="outline" size="sm">
                                    Download Template
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                onClick={onProcess}
                                disabled={isProcessing || !selectedFile || isUploaded}
                            >
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isProcessing ? 'Processing...' : 'Upload File'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
