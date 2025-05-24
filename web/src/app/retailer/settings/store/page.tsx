'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    storeService
} from './lib/api-service';

import {
    formSchema,
    FormSchema
} from './utils/schema';

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

export default function StoreSettingsPage() {
    // Create a cache system to save the store data
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch
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

            if (response) {
                reset(response);
            };
        } catch (err: any) {
            console.error(err);
        };
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
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store-type">Store Type</Label>
                        <Select defaultValue="grocery">
                            <SelectTrigger id="store-type">
                                <SelectValue placeholder="Select store type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="grocery">Grocery Store</SelectItem>
                                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                                <SelectItem value="convenience">Convenience Store</SelectItem>
                                <SelectItem value="hardware">Hardware Store</SelectItem>
                                <SelectItem value="clothing">Clothing Store</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="store-size">Store Size (sq ft)</Label>
                            <Input id="store-size" type="number" {...register('size')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="employees">Number of Employees</Label>
                            <Input id="employees" type="number" {...register('employees')} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store-address">Store Address</Label>
                        <Input id="store-address" {...register('address')} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" {...register('city')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input id="state" {...register('state')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip">Zip/Postal Code</Label>
                            <Input id="zip" {...register('zipCode')} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select value={watch('country')} onValueChange={(value) => {
                            setValue('country', value as 'us' | 'br' | 'other');
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
