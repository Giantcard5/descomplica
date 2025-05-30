"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";

import { 
    Check, 
    HelpCircle, 
    AlertTriangle, 
    Plus, 
    Loader2, 
    Sparkles 
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";

// Mock product database
const standardProducts = [
    { value: "coca-cola-original-500ml", label: "Coca-Cola Original 500ml" },
    { value: "coca-cola-zero-350ml", label: "Coca-Cola Zero 350ml" },
    { value: "coca-cola-light-500ml", label: "Coca-Cola Light 500ml" },
    { value: "pepsi-original-500ml", label: "Pepsi Original 500ml" },
    { value: "pepsi-zero-350ml", label: "Pepsi Zero 350ml" },
    { value: "sprite-500ml", label: "Sprite 500ml" },
    { value: "fanta-orange-500ml", label: "Fanta Orange 500ml" },
    { value: "lays-classic-100g", label: "Lay's Classic 100g" },
    { value: "lays-salt-vinegar-100g", label: "Lay's Salt & Vinegar 100g" },
    { value: "doritos-nacho-100g", label: "Doritos Nacho Cheese 100g" },
];

// Mock product alias history for this retailer
const retailerProductHistory = [
    { alias: "Z012", product: "coca-cola-zero-350ml", label: "Coca-Cola Zero 350ml" },
    { alias: "SA943S", product: "sprite-500ml", label: "Sprite 500ml" },
    { alias: "CHIPS123", product: "lays-classic-100g", label: "Lay's Classic 100g" },
];

// Mock product suggestions based on fuzzy matching
const getProductSuggestions = (alias: string) => {;
    if (alias.toLowerCase().includes("z") || alias.toLowerCase().includes("0")) {
        return [
            { value: "coca-cola-zero-350ml", label: "Coca-Cola Zero 350ml" },
            { value: "pepsi-zero-350ml", label: "Pepsi Zero 350ml" },
        ];
    };
    if (alias.toLowerCase().includes("s") || alias.toLowerCase().includes("9")) {
        return [
            { value: "sprite-500ml", label: "Sprite 500ml" },
            { value: "fanta-orange-500ml", label: "Fanta Orange 500ml" },
        ];
    };
    if (alias.toLowerCase().includes("chip")) {
        return [
            { value: "lays-classic-100g", label: "Lay's Classic 100g" },
            { value: "lays-salt-vinegar-100g", label: "Lay's Salt & Vinegar 100g" },
            { value: "doritos-nacho-100g", label: "Doritos Nacho Cheese 100g" },
        ];
    };
    return standardProducts.slice(0, 3)
};

interface ProductItem {
    id: number
    alias: string
    quantity: number
    price: number
    total: number
    status: "matched" | "unmatched" | "pending" | "ai-verified" | "ai-rejected"
    matchedProduct?: string
    aiConfidence?: number
};

interface ProductMappingTableProps {
    items: ProductItem[]
    onUpdate: (items: ProductItem[]) => void
};

export function ProductMappingTable({ items, onUpdate }: ProductMappingTableProps) {
    const { toast } = useToast();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isAiVerifying, setIsAiVerifying] = useState(false);
    const [newProduct, setNewProduct] = useState({
        alias: "",
        quantity: 1,
        price: 0,
        matchedProduct: "",
    });

    const handleProductMatch = (id: number, productValue: string) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                const matchedProduct = standardProducts.find((p) => p.value === productValue)?.label || ""
                return {
                    ...item,
                    status: "matched" as const,
                    matchedProduct,
                };
            };
            return item;
        });

        onUpdate(updatedItems)

        const item = items.find((i) => i.id === id)
        if (item) {
            const productLabel = standardProducts.find((p) => p.value === productValue)?.label
            toast({
                title: "Product matched successfully",
                description: `We've learned that '${item.alias}' refers to '${productLabel}'. Thanks!`,
            });
        };
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                const newTotal = quantity * item.price
                return {
                    ...item,
                    quantity,
                    total: newTotal,
                };
            };
            return item;
        });

        onUpdate(updatedItems);
    };

    const handleAddProduct = async () => {
        if (!newProduct.alias || !newProduct.matchedProduct || newProduct.price <= 0) {
            toast({
                title: "Invalid product data",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        };

        setIsAiVerifying(true);

        // Simulate AI verification
        setTimeout(() => {
            const aiConfidence = Math.random() * 100
            const isVerified = aiConfidence > 30 // 70% chance of verification

            const newItem: ProductItem = {
                id: Math.max(...items.map((i) => i.id)) + 1,
                alias: newProduct.alias,
                quantity: newProduct.quantity,
                price: newProduct.price,
                total: newProduct.quantity * newProduct.price,
                status: isVerified ? "ai-verified" : "ai-rejected",
                matchedProduct: newProduct.matchedProduct,
                aiConfidence: Math.round(aiConfidence),
            }

            onUpdate([...items, newItem])
            setIsAiVerifying(false)
            setIsAddDialogOpen(false)
            setNewProduct({ alias: "", quantity: 1, price: 0, matchedProduct: "" })

            toast({
                title: isVerified ? "Product verified by AI" : "Product verification failed",
                description: isVerified
                    ? `AI confirmed this product exists in the receipt with ${Math.round(aiConfidence)}% confidence.`
                    : `AI could not verify this product in the receipt. Please check the details.`,
                variant: isVerified ? "default" : "destructive",
            })
        }, 2000);
    };

    const getStatusBadge = (status: string, aiConfidence?: number) => {
        switch (status) {
            case "matched":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check className="mr-1 h-3 w-3" /> Matched
                    </Badge>
                );
            case "ai-verified":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Sparkles className="mr-1 h-3 w-3" /> AI Verified ({aiConfidence}%)
                    </Badge>
                );
            case "ai-rejected":
                return (
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        <AlertTriangle className="mr-1 h-3 w-3" /> AI Rejected ({aiConfidence}%)
                    </Badge>
                );
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <AlertTriangle className="mr-1 h-3 w-3" /> Pending
                    </Badge>
                );
            case "unmatched":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <HelpCircle className="mr-1 h-3 w-3" /> Unmatched
                    </Badge>
                )
            default:
                return null;
        };
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Product Mapping</h3>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <div className="flex justify-end mb-2">
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Product Manually</DialogTitle>
                            <DialogDescription>
                                Add a product that wasn't detected in the receipt. Our AI will verify if it exists in the image.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="product-alias">Product Alias/Code</Label>
                                <Input
                                    id="product-alias"
                                    placeholder="e.g., COKE500, CHIPS123"
                                    value={newProduct.alias}
                                    onChange={(e) => setNewProduct({ ...newProduct, alias: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="product-match">Product Match</Label>
                                <Combobox
                                    items={standardProducts}
                                    value={newProduct.matchedProduct}
                                    placeholder="Select product"
                                    onChange={(value) => setNewProduct({ ...newProduct, matchedProduct: value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        value={newProduct.quantity}
                                        onChange={(e) => setNewProduct({ ...newProduct, quantity: Number.parseInt(e.target.value) || 1 })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Unit Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddProduct} disabled={isAiVerifying}>
                                {isAiVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isAiVerifying ? "AI Verifying..." : "Add & Verify"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Alias</TableHead>
                            <TableHead>Suggested Match</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => {
                            const suggestions =
                                item.status === "matched" || item.status === "ai-verified" ? [] : getProductSuggestions(item.alias)

                            const historyMatch = retailerProductHistory.find(
                                (h) => h.alias.toLowerCase() === item.alias.toLowerCase(),
                            )

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono">
                                        {item.alias}
                                        {historyMatch && <div className="text-xs text-muted-foreground mt-1">Previously matched</div>}
                                    </TableCell>
                                    <TableCell>
                                        {item.status === "matched" || item.status === "ai-verified" ? (
                                            <div>{item.matchedProduct}</div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Combobox
                                                    items={standardProducts}
                                                    value={historyMatch?.product || ""}
                                                    placeholder="Select product"
                                                    onChange={(value) => handleProductMatch(item.id, value)}
                                                />
                                                {suggestions.length > 0 && (
                                                    <div className="text-xs">
                                                        <span className="text-muted-foreground">Suggestions: </span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {suggestions.map((suggestion) => (
                                                                <Button
                                                                    key={suggestion.value}
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-6 text-xs"
                                                                    onClick={() => handleProductMatch(item.id, suggestion.value)}
                                                                >
                                                                    {suggestion.label}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            min="1"
                                            className="w-20"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                                        />
                                    </TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>${item.total.toFixed(2)}</TableCell>
                                    <TableCell>{getStatusBadge(item.status, item.aiConfidence)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};