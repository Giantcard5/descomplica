'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { storeService } from './lib/api-service';

import { formSchema, FormSchema } from './utils/schema';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { StoreType } from './types';

export default function StoreSettingsPage() {
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const getStore = async () => {
            const response = await storeService.getStore();
            reset(response);
        };

        getStore();
    }, []);

    const handleStore: SubmitHandler<FormSchema> = async (data) => {
        try {
            const response = await storeService.postStore(data);

            if (response.status) {
                toast({
                    title: response.message,
                    description: 'Your store details have been updated',
                });
            } else {
                toast({
                    title: response.message,
                    description: 'Your store details could not be updated',
                });
            }
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(handleStore)}>
                <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                    <CardDescription>Update your store details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="store-name">Store Name</Label>
                        <Input id="store-name" {...register('name')} />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store-type">Store Type</Label>
                        <Select
                            value={watch('type')}
                            onValueChange={(value) => {
                                setValue('type', value as StoreType);
                            }}
                        >
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
                        {errors.type && (
                            <p className="text-red-500 text-sm">{errors.type.message}</p>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="store-size">Store Size (sq ft)</Label>
                            <Input
                                id="store-size"
                                type="number"
                                {...register('size', { valueAsNumber: true })}
                            />
                            {errors.size && (
                                <p className="text-red-500 text-sm">{errors.size.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="employees">Number of Employees</Label>
                            <Input
                                id="employees"
                                type="number"
                                {...register('employees', { valueAsNumber: true })}
                            />
                            {errors.employees && (
                                <p className="text-red-500 text-sm">{errors.employees.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store-address">Store Address</Label>
                        <Input id="store-address" {...register('address')} />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" {...register('city')} />
                            {errors.city && (
                                <p className="text-red-500 text-sm">{errors.city.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input id="state" {...register('state')} />
                            {errors.state && (
                                <p className="text-red-500 text-sm">{errors.state.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip">Zip/Postal Code</Label>
                            <Input id="zip" {...register('zipCode')} />
                            {errors.zipCode && (
                                <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                            value={watch('country')}
                            onValueChange={(value) => {
                                setValue('country', value as 'us' | 'br' | 'other');
                            }}
                        >
                            <SelectTrigger id="country">
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="br">Brazil</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.country && (
                            <p className="text-red-500 text-sm">{errors.country.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store-description">Store Description</Label>
                        <textarea
                            id="store-description"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            rows={3}
                            placeholder="Describe your store"
                            {...register('description')}
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
