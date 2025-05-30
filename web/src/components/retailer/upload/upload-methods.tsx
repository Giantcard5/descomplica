"use client"

import React, { useState, useCallback } from "react";

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ProductEntryForm } from "@/components/retailer/upload/product-entry-form";

import { 
    Upload, 
    Camera, 
    FileText, 
    Loader2, 
    X 
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";

interface UploadMethodsProps {
    method: string
    onProcess: () => void
    isProcessing: boolean
    isUploaded: boolean
};

export function UploadMethods({ method, onProcess, isProcessing, isUploaded }: UploadMethodsProps) {
    const { toast } = useToast();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const isImageFile = (file: File) => {
        return file.type.startsWith("image/");
    };

    const handleFileChange = (file: File) => {
        setSelectedFile(file);

        if (isImageFile(file)) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        };
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
        };
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);

            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                const file = files[0];
                const validTypes =
                    method === "photo"
                        ? ["image/jpeg", "image/png", "image/webp", "application/pdf"]
                        : [
                            "text/csv",
                            "application/vnd.ms-excel",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        ];

                if (validTypes.includes(file.type)) {
                    handleFileChange(file);
                    toast({
                        title: "File uploaded successfully",
                        description: `${file.name} has been selected for processing.`,
                    });
                } else {
                    toast({
                        title: "Invalid file type",
                        description: `Please upload a ${method === "photo" ? "image or PDF" : "CSV or Excel"} file.`,
                        variant: "destructive",
                    });
                };
            };
        },
        [toast, method],
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const removeFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        };
    };

    if (method === "photo") {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Upload Receipt Photo</CardTitle>
                    <CardDescription>Take a photo or upload an image of your receipt</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div
                        className={`flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-10 transition-colors ${isDragOver
                            ? "border-purple-500 bg-purple-500/10"
                            : selectedFile
                                ? "border-green-500 bg-green-500/10"
                                : "border-muted-foreground/30 hover:border-purple-500/50"
                            }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        {selectedFile ? (
                            <div className="flex flex-col items-center gap-4 w-full max-w-md">
                                {previewUrl ? (
                                    <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                                        <img
                                            src={previewUrl || "/placeholder.svg"}
                                            alt="Receipt preview"
                                            className="w-full h-full object-contain"
                                        />
                                        <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={removeFile}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg w-full">
                                        <FileText className="h-8 w-8 text-muted-foreground" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                                            <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={removeFile}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="p-4 rounded-full bg-muted">
                                    <Camera className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <p className="text-lg font-medium">Drag and drop your receipt image here</p>
                                <p className="text-sm text-muted-foreground">or click to browse</p>
                                <p className="text-xs text-muted-foreground">Supports: JPG, PNG, WEBP, PDF</p>
                            </div>
                        )}

                        <Input
                            id="receipt-photo"
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            onChange={handleInputChange}
                        />

                        <div className="flex gap-2">
                            <Button asChild variant={selectedFile ? "outline" : "default"}>
                                <label htmlFor="receipt-photo" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" />
                                    {selectedFile ? "Change File" : "Upload Image"}
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
                            Our system will automatically extract the following information from your receipt:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                            <li>• Store name and location</li>
                            <li>• Date of purchase</li>
                            <li>• Product names and quantities</li>
                            <li>• Prices and total amount</li>
                        </ul>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={onProcess} disabled={isProcessing || !selectedFile || isUploaded}>
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isProcessing ? "Processing..." : "Process Receipt"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    };

    if (method === "manual") {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Manual Data Entry</CardTitle>
                    <CardDescription>Enter your receipt data manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="store-name">Store Name</Label>
                            <Input id="store-name" placeholder="Your store name" defaultValue="Market Express" />
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
                            {isProcessing ? "Processing..." : "Submit Data"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    };

    if (method === "file") {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>File Upload</CardTitle>
                    <CardDescription>Upload a CSV or Excel file with your sell-out data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div
                        className={`flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-10 transition-colors ${isDragOver
                            ? "border-purple-500 bg-purple-500/10"
                            : selectedFile
                                ? "border-green-500 bg-green-500/10"
                                : "border-muted-foreground/30 hover:border-purple-500/50"
                            }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        {selectedFile ? (
                            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg w-full max-w-md">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                                    <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={removeFile}>
                                    <X className="h-4 w-4" />
                                </Button>
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
                            onChange={handleInputChange}
                        />

                        <Button asChild variant={selectedFile ? "outline" : "default"}>
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" />
                                {selectedFile ? "Change File" : "Select File"}
                            </label>
                        </Button>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                        <h4 className="mb-2 font-medium">File Requirements</h4>
                        <p className="text-sm text-muted-foreground">Your file should include the following columns:</p>
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
                        <Button onClick={onProcess} disabled={isProcessing || !selectedFile || isUploaded}>
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isProcessing ? "Processing..." : "Upload File"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    };

    return null;
};