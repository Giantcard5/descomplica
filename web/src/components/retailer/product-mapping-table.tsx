'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Combobox } from '@/components/ui/combobox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, ChevronDown, ChevronUp, HelpCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock product database
const standardProducts = [
    { value: 'coca-cola-original-500ml', label: 'Coca-Cola Original 500ml' },
    { value: 'coca-cola-zero-350ml', label: 'Coca-Cola Zero 350ml' },
    { value: 'coca-cola-light-500ml', label: 'Coca-Cola Light 500ml' },
    { value: 'pepsi-original-500ml', label: 'Pepsi Original 500ml' },
    { value: 'pepsi-zero-350ml', label: 'Pepsi Zero 350ml' },
    { value: 'sprite-500ml', label: 'Sprite 500ml' },
    { value: 'fanta-orange-500ml', label: 'Fanta Orange 500ml' },
    { value: 'lays-classic-100g', label: "Lay's Classic 100g" },
    { value: 'lays-salt-vinegar-100g', label: "Lay's Salt & Vinegar 100g" },
    { value: 'doritos-nacho-100g', label: 'Doritos Nacho Cheese 100g' },
];

// Mock product alias history for this retailer
const retailerProductHistory = [
    { alias: 'Z012', product: 'coca-cola-zero-350ml', label: 'Coca-Cola Zero 350ml' },
    { alias: 'SA943S', product: 'sprite-500ml', label: 'Sprite 500ml' },
    { alias: 'CHIPS123', product: 'lays-classic-100g', label: "Lay's Classic 100g" },
];

// Mock product suggestions based on fuzzy matching
const getProductSuggestions = (alias: string) => {
    // Simple mock implementation - in a real app, this would use fuzzy matching
    if (alias.toLowerCase().includes('z') || alias.toLowerCase().includes('0')) {
        return [
            { value: 'coca-cola-zero-350ml', label: 'Coca-Cola Zero 350ml' },
            { value: 'pepsi-zero-350ml', label: 'Pepsi Zero 350ml' },
        ];
    }
    if (alias.toLowerCase().includes('s') || alias.toLowerCase().includes('9')) {
        return [
            { value: 'sprite-500ml', label: 'Sprite 500ml' },
            { value: 'fanta-orange-500ml', label: 'Fanta Orange 500ml' },
        ];
    }
    if (alias.toLowerCase().includes('chip')) {
        return [
            { value: 'lays-classic-100g', label: "Lay's Classic 100g" },
            { value: 'lays-salt-vinegar-100g', label: "Lay's Salt & Vinegar 100g" },
            { value: 'doritos-nacho-100g', label: 'Doritos Nacho Cheese 100g' },
        ];
    }
    return standardProducts.slice(0, 3); // Return first 3 as default suggestions
};

interface ProductItem {
    id: number;
    alias: string;
    quantity: number;
    price: number;
    total: number;
    status: 'matched' | 'unmatched' | 'pending';
    matchedProduct?: string;
}

interface ProductMappingTableProps {
    items: ProductItem[];
    onUpdate: (items: ProductItem[]) => void;
}

export function ProductMappingTable({ items, onUpdate }: ProductMappingTableProps) {
    const { toast } = useToast();
    const [showHistory, setShowHistory] = useState(false);

    const handleProductMatch = (id: number, productValue: string) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                const matchedProduct = standardProducts.find(
                    (p) => p.value === productValue
                )?.label;
                return {
                    ...item,
                    status: 'matched',
                    matchedProduct: matchedProduct,
                };
            }
            return item;
        });

        onUpdate(updatedItems);

        // Show toast for successful match
        const item = items.find((i) => i.id === id);
        if (item) {
            const productLabel = standardProducts.find((p) => p.value === productValue)?.label;
            toast({
                title: 'Product matched successfully',
                description: `We've learned that '${item.alias}' refers to '${productLabel}'. Thanks!`,
            });
        }
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                const newTotal = quantity * item.price;
                return {
                    ...item,
                    quantity,
                    total: newTotal,
                };
            }
            return item;
        });

        onUpdate(updatedItems);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'matched':
                return (
                    <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                    >
                        <Check className="mr-1 h-3 w-3" /> Matched
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                        <AlertTriangle className="mr-1 h-3 w-3" /> Pending
                    </Badge>
                );
            case 'unmatched':
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <HelpCircle className="mr-1 h-3 w-3" /> Unmatched
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            <Collapsible open={showHistory} onOpenChange={setShowHistory}>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Product Mapping</h3>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm">
                            {showHistory ? (
                                <>
                                    <ChevronUp className="mr-2 h-4 w-4" />
                                    Hide Product History
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="mr-2 h-4 w-4" />
                                    Show Product History
                                </>
                            )}
                        </Button>
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="mt-4">
                    <div className="rounded-lg border bg-muted/30 p-4">
                        <h4 className="mb-2 font-medium">Previously Matched Products</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                            These product codes have been previously matched for your store:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {retailerProductHistory.map((item) => (
                                <div
                                    key={item.alias}
                                    className="flex items-center gap-2 p-2 rounded-md bg-background"
                                >
                                    <span className="font-mono text-sm">{item.alias}</span>
                                    <span className="text-muted-foreground">→</span>
                                    <span className="text-sm">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>

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
                            // Get suggestions for this product alias
                            const suggestions =
                                item.status === 'matched' ? [] : getProductSuggestions(item.alias);

                            // Check if this alias has been matched before
                            const historyMatch = retailerProductHistory.find(
                                (h) => h.alias.toLowerCase() === item.alias.toLowerCase()
                            );

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono">
                                        {item.alias}
                                        {historyMatch && (
                                            <div className="text-xs text-muted-foreground mt-1">
                                                Previously matched
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.status === 'matched' ? (
                                            <div>{item.matchedProduct}</div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Combobox
                                                    items={standardProducts}
                                                    value={historyMatch?.product || ''}
                                                    placeholder="Select product"
                                                    onChange={(value) =>
                                                        handleProductMatch(item.id, value)
                                                    }
                                                />
                                                {suggestions.length > 0 && (
                                                    <div className="text-xs">
                                                        <span className="text-muted-foreground">
                                                            Suggestions:{' '}
                                                        </span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {suggestions.map((suggestion) => (
                                                                <Button
                                                                    key={suggestion.value}
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-6 text-xs"
                                                                    onClick={() =>
                                                                        handleProductMatch(
                                                                            item.id,
                                                                            suggestion.value
                                                                        )
                                                                    }
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
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    item.id,
                                                    Number.parseInt(e.target.value) || 1
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>${item.total.toFixed(2)}</TableCell>
                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
