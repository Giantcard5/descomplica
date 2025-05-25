'use client';

import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Upload, Store } from 'lucide-react';

interface RetailerOnboardingFormProps {
    step: number;
    onComplete: () => void;
};

export function RetailerOnboardingForm({ step, onComplete }: RetailerOnboardingFormProps) {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [storeImage, setStoreImage] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onComplete();
    };

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        setImage: (url: string) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
        };
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                        <p className="text-sm text-muted-foreground">
                            Tell us about yourself. This information will be displayed on your
                            profile.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={profileImage || '/placeholder.svg?height=96&width=96'}
                                alt="Profile"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Profile Picture</h3>
                            <p className="text-sm text-muted-foreground">
                                Upload a profile picture. This will be visible to other users.
                            </p>
                            <div className="flex gap-2">
                                <label htmlFor="profile-image-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm">
                                        <Upload className="h-4 w-4" />
                                        Upload
                                    </div>
                                    <input
                                        id="profile-image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e, setProfileImage)}
                                    />
                                </label>
                                {profileImage && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-destructive"
                                        onClick={() => setProfileImage(null)}
                                        type="button"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date-of-birth">Date of Birth</Label>
                            <Input id="date-of-birth" type="date" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us about yourself" rows={3} />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Store Information</h2>
                        <p className="text-sm text-muted-foreground">
                            Tell us about your store. This information helps us provide relevant
                            insights.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={storeImage || '/placeholder.svg?height=96&width=96'}
                                alt="Store"
                            />
                            <AvatarFallback>
                                <Store className="h-12 w-12" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Store Logo</h3>
                            <p className="text-sm text-muted-foreground">
                                Upload your store logo. This will be displayed on your profile.
                            </p>
                            <div className="flex gap-2">
                                <label htmlFor="store-image-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm">
                                        <Upload className="h-4 w-4" />
                                        Upload
                                    </div>
                                    <input
                                        id="store-image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e, setStoreImage)}
                                    />
                                </label>
                                {storeImage && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-destructive"
                                        onClick={() => setStoreImage(null)}
                                        type="button"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label htmlFor="store-name">Store Name</Label>
                        <Input id="store-name" placeholder="John's Market" required />
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
                            <Input id="store-size" type="number" placeholder="1200" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="employees">Number of Employees</Label>
                            <Input id="employees" type="number" placeholder="5" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store-address">Store Address</Label>
                        <Input id="store-address" placeholder="123 Main Street" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Springfield" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input id="state" placeholder="IL" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip">Zip/Postal Code</Label>
                            <Input id="zip" placeholder="62701" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="grocery">
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
                        ></textarea>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Preferences & Settings</h2>
                        <p className="text-sm text-muted-foreground">
                            Set your preferences to customize your experience.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="language">Preferred Language</Label>
                            <Select defaultValue="en">
                                <SelectTrigger id="language">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="pt-BR">Português</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date-format">Date Format</Label>
                            <Select defaultValue="dd/mm/yyyy">
                                <SelectTrigger id="date-format">
                                    <SelectValue placeholder="Select date format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dd/mm/yyyy">dd/mm/yyyy</SelectItem>
                                    <SelectItem value="mm/dd/yyyy">mm/dd/yyyy</SelectItem>
                                    <SelectItem value="yyyy/mm/dd">yyyy/mm/dd</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notification-preferences">
                                Notification Preferences
                            </Label>
                            <Select defaultValue="real-time">
                                <SelectTrigger id="notification-preferences">
                                    <SelectValue placeholder="Select notification preferences" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="real-time">Real-Time</SelectItem>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="never">Never</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            )}

            <Button type="submit" className="w-full">
                {step < 3 ? 'Continue' : 'Complete Setup'}
            </Button>
        </form>
    );
};