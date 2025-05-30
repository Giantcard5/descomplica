"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";

import { Plus, Trash2 } from "lucide-react";

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
    { alias: "Z012", product: "coca-cola-zero-350ml" },
    { alias: "SA943S", product: "sprite-500ml" },
    { alias: "CHIPS123", product: "lays-classic-100g" },
];

interface ProductItem {
    id: number
    alias: string
    product: string
    quantity: number
    price: number
};

export function ProductEntryForm() {
    const [products, setProducts] = useState<ProductItem[]>([{ id: 1, alias: "", product: "", quantity: 1, price: 0 }]);
    const [total, setTotal] = useState(0);

    const addProduct = () => {
        const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
        setProducts([...products, { id: newId, alias: "", product: "", quantity: 1, price: 0 }])
    };

    const removeProduct = (id: number) => {
        if (products.length > 1) {
            const updatedProducts = products.filter((p) => p.id !== id)
            setProducts(updatedProducts)
            calculateTotal(updatedProducts)
        };
    };

    const updateProduct = (id: number, field: keyof ProductItem, value: any) => {
        const updatedProducts = products.map((p) => {
            if (p.id === id) {
                if (field === "alias") {
                    const historyMatch = retailerProductHistory.find((h) => h.alias.toLowerCase() === value.toLowerCase())
                    if (historyMatch) {
                        return { ...p, [field]: value, product: historyMatch.product }
                    };
                };
                return { ...p, [field]: value };
            };
            return p;
        });

        setProducts(updatedProducts);

        if (field === "quantity" || field === "price") {
            calculateTotal(updatedProducts);
        };
    };

    const calculateTotal = (items: ProductItem[]) => {
        const sum = items.reduce((acc, item) => {
            return acc + item.quantity * item.price
        }, 0);
        setTotal(sum);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label>Products</Label>
                <Button variant="outline" size="sm" onClick={addProduct}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-2 border-b p-3 font-medium">
                    <div className="col-span-3">Product Code/Alias</div>
                    <div className="col-span-3">Product Name</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Unit Price</div>
                    <div className="col-span-1">Total</div>
                    <div className="col-span-1"></div>
                </div>

                {products.map((product) => {
                    const itemTotal = product.quantity * product.price

                    return (
                        <div key={product.id} className="grid grid-cols-12 gap-2 border-b p-3">
                            <div className="col-span-3">
                                <Input
                                    placeholder="Product code"
                                    value={product.alias}
                                    onChange={(e) => updateProduct(product.id, "alias", e.target.value)}
                                />
                                {retailerProductHistory.some((h) => h.alias.toLowerCase() === product.alias.toLowerCase()) && (
                                    <p className="text-xs text-muted-foreground mt-1">Previously matched</p>
                                )}
                            </div>
                            <div className="col-span-3">
                                <Combobox
                                    items={standardProducts}
                                    value={product.product}
                                    placeholder="Select product"
                                    onChange={(value) => updateProduct(product.id, "product", value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) => updateProduct(product.id, "quantity", Number.parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={product.price || ""}
                                    onChange={(e) => updateProduct(product.id, "price", Number.parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="col-span-1">
                                <Input type="number" min="0" step="0.01" placeholder="0.00" value={itemTotal.toFixed(2)} disabled />
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => removeProduct(product.id)}
                                    disabled={products.length === 1}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                </Button>
                            </div>
                        </div>
                    )
                })}

                <div className="flex items-center justify-between p-3">
                    <span className="font-medium">Total Amount</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};