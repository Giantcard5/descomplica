'use client';

import React from 'react';

import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { ImageUpload } from './image-upload';

import { RetailerFormSchema } from '@/app/auth/onboarding/(utils)/schema';

import { 
    StoreType 
} from '@/app/retailer/settings/(pages)/store/types';

interface IStoreInfo {
    register: UseFormRegister<RetailerFormSchema>;
    watch: UseFormWatch<RetailerFormSchema>;
    setValue: UseFormSetValue<RetailerFormSchema>;
    errors: FieldErrors<RetailerFormSchema>;
    storeImage: string | null;
    setStoreImage: (url: string) => void;
};

export function StoreInfo({ register, watch, setValue, errors, storeImage, setStoreImage }: IStoreInfo) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Store Information</h2>
                <p className="text-sm text-muted-foreground">
                    Tell us about your store. This information helps us provide relevant
                    insights.
                </p>
            </div>

            <ImageUpload image={storeImage} setImage={setStoreImage} />

            <Separator />

            <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" placeholder="John's Market" {...register('storeName')} />
                {errors.storeName && (
                    <p className="text-red-500 text-sm">{errors.storeName.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="store-type">Store Type</Label>
                <Select value={watch('storeType')} onValueChange={(value) => {
                    setValue('storeType', value as StoreType);
                }}>
                    <SelectTrigger id="store-type">
                        <SelectValue placeholder="Select store type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="grocery">Grocery Store</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="convenience">Convenience Store</SelectItem>
                        <SelectItem value="hardware">Hardware Store</SelectItem>
                        <SelectItem value="clothing">Clothing Store</SelectItem>
                        <SelectItem value="electronics">Electronics Store</SelectItem>
                        <SelectItem value="bakery">Bakery</SelectItem>
                        <SelectItem value="butcher">Butcher Shop</SelectItem>
                        <SelectItem value="pet">Pet Store</SelectItem>
                        <SelectItem value="stationery">Stationery Store</SelectItem>
                        <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                        <SelectItem value="florist">Florist</SelectItem>
                        <SelectItem value="bookstore">Bookstore</SelectItem>
                        <SelectItem value="toy">Toy Store</SelectItem>
                        <SelectItem value="automotive">Auto Parts Store</SelectItem>
                        <SelectItem value="sports">Sporting Goods</SelectItem>
                        <SelectItem value="furniture">Furniture Store</SelectItem>
                        <SelectItem value="jewelry">Jewelry Store</SelectItem>
                        <SelectItem value="service">Service Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {errors.storeType && (
                    <p className="text-red-500 text-sm">{errors.storeType.message}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="store-size">Store Size (sq ft)</Label>
                    <Input id="store-size" type="number" {...register('storeSize')} />
                    {errors.storeSize && (
                        <p className="text-red-500 text-sm">{errors.storeSize.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="employees">Number of Employees</Label>
                    <Input id="employees" type="number" {...register('storeEmployees')} />
                    {errors.storeEmployees && (
                        <p className="text-red-500 text-sm">{errors.storeEmployees.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="store-address">Store Address</Label>
                <Input id="store-address" {...register('storeAddress')} />
                {errors.storeAddress && (
                    <p className="text-red-500 text-sm">{errors.storeAddress.message}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register('storeCity')} />
                    {errors.storeCity && (
                        <p className="text-red-500 text-sm">{errors.storeCity.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" {...register('storeState')} />
                    {errors.storeState && (
                        <p className="text-red-500 text-sm">{errors.storeState.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="zip">Zip/Postal Code</Label>
                    <Input id="zip" {...register('storeZip')} />
                    {errors.storeZip && (
                        <p className="text-red-500 text-sm">{errors.storeZip.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={watch('storeCountry')} onValueChange={(value) => {
                    setValue('storeCountry', value as 'us' | 'br' | 'other');
                }}>
                    <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="br">Brazil</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {errors.storeCountry && (
                    <p className="text-red-500 text-sm">{errors.storeCountry.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <textarea
                    id="store-description"
                    {...register('storeDescription')}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={3}
                ></textarea>
                {errors.storeDescription && (
                    <p className="text-red-500 text-sm">{errors.storeDescription.message}</p>
                )}
            </div>
        </div>
    );
};