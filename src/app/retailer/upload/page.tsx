import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Camera, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
    title: 'Upload Receipt - Descomplica',
    description: 'Upload your receipt data to Descomplica',
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

            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Tip</AlertTitle>
                <AlertDescription>
                    For the best results, ensure your receipt is well-lit and the text is
                    clearly visible.
                </AlertDescription>
            </Alert>

            <Tabs defaultValue="photo" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="photo">Photo Upload</TabsTrigger>
                    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                    <TabsTrigger value="file">File Upload</TabsTrigger>
                </TabsList>

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
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Camera className="h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        Drag and drop your receipt image here or click to browse
                                    </p>
                                </div>
                                <Input
                                    id="receipt-photo"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                                <div className="flex gap-2">
                                    <Button asChild>
                                        <label htmlFor="receipt-photo">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Image
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
                                    Our system will automatically extract the following
                                    information from your receipt:
                                </p>
                                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                    <li>• Store name and location</li>
                                    <li>• Date of purchase</li>
                                    <li>• Product names and quantities</li>
                                    <li>• Prices and total amount</li>
                                </ul>
                            </div>
                            <div className="flex justify-end">
                                <Button disabled>Process Receipt</Button>
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
                                    <Input id="store-name" placeholder="Your store name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" type="date" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>Products</Label>
                                    <Button variant="outline" size="sm">
                                        Add Product
                                    </Button>
                                </div>

                                <div className="rounded-lg border">
                                    <div className="grid grid-cols-12 gap-2 border-b p-3 font-medium">
                                        <div className="col-span-5">Product</div>
                                        <div className="col-span-2">Quantity</div>
                                        <div className="col-span-2">Unit Price</div>
                                        <div className="col-span-2">Total</div>
                                        <div className="col-span-1"></div>
                                    </div>

                                    <div className="grid grid-cols-12 gap-2 border-b p-3">
                                        <div className="col-span-5">
                                            <Input placeholder="Product name" />
                                        </div>
                                        <div className="col-span-2">
                                            <Input type="number" min="1" defaultValue="1" />
                                        </div>
                                        <div className="col-span-2">
                                            <Input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <Input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                disabled
                                            />
                                        </div>
                                        <div className="col-span-1 flex items-center justify-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-4 w-4"
                                                >
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                    <line x1="10" x2="10" y1="11" y2="17" />
                                                    <line x1="14" x2="14" y1="11" y2="17" />
                                                </svg>
                                                <span className="sr-only">Remove</span>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3">
                                        <span className="font-medium">Total Amount</span>
                                        <span>$0.00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button>Submit Data</Button>
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
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <FileText className="h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        Drag and drop your CSV or Excel file here or click to
                                        browse
                                    </p>
                                </div>
                                <Input
                                    id="file-upload"
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    className="hidden"
                                />
                                <Button asChild>
                                    <label htmlFor="file-upload">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Select File
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
                                <Button disabled>Upload File</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
