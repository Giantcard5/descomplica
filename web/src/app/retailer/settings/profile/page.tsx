import type { Metadata } from 'next';

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

export const metadata: Metadata = {
    title: 'Profile Settings - Descomplica',
    description: 'Manage your profile information',
};

export default function ProfileSettingsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
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
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                        id="bio"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                        placeholder="Tell us about yourself"
                        defaultValue="Owner of a small retail store specializing in groceries and household items."
                    ></textarea>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    );
}
