'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

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
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Upload } from 'lucide-react';

import { formSchema, FormSchema } from './utils/schema';

import { useToast } from '@/hooks/use-toast';
import { useProfile } from './hook/useProfile';

export default function ProfileSettingsPage() {
    const { toast } = useToast();
    const { handleProfile } = useProfile({
        onSuccess: (profile) => reset(profile)
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await handleProfile(data);

            toast({
                title: response.message,
                description: response.status
                    ? 'Your profile has been updated'
                    : 'Your profile could not be updated',
                variant: response.status ? 'default' : 'destructive',
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: 'Error',
                description: 'There was an issue updating your profile details.',
                variant: 'destructive',
            });
        };
    });

    return (
        <Card>
            <form onSubmit={onSubmit}>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                        {/* Update to save the image URL */}
                        <Avatar className="h-24 w-24 border-2 border-gray-900">
                            <AvatarImage src={''} alt="User" />
                            <AvatarFallback>AVATAR</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Profile Picture</h3>
                            <p className="text-sm text-muted-foreground">
                                Upload a new profile picture. Recommended size: 300x300px.
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Upload className="h-4 w-4" />
                                    Upload
                                </Button>
                                <Button variant="outline" size="sm" className="text-destructive">
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">Full Name</Label>
                            <Input id="first-name" {...register('name')} placeholder="Full Name" />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            {...register('phoneNumber')}
                            placeholder="Phone Number"
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            rows={3}
                            placeholder="Tell us about yourself"
                            {...register('bio')}
                        ></textarea>
                        {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
