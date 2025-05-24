'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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

import {
    profileService
} from './lib/api-service';

import {
    formSchema,
    FormSchema
} from './utils/schema';

export default function ProfileSettingsPage() {
    // Create a cache system to save the profile data
    const {
        register,
        handleSubmit,
        reset,
        getValues
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const getProfile = async () => {
            const response = await profileService.getProfile();
            reset(response);
        };

        getProfile();
    }, []);

    const handleProfile: SubmitHandler<FormSchema> = async (data) => {
        try {
            const response = await profileService.postProfile(data);

            if (response) {
                reset(response);
            };
        } catch (err: any) {
            console.error(err);
        };
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(handleProfile)}>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                        {/* Update to save the image URL */}
                        <Avatar className="h-24 w-24 border-2 border-gray-900">
                            <AvatarImage src={getValues('photoUrl')} alt="User" />
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
                            <Input id="first-name" {...register('name')} placeholder='Full Name' />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register('email')} placeholder='Email' />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" {...register('phoneNumber')} placeholder='Phone Number' />
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
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button type='button' variant="outline">Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
