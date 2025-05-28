'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from '@/components/ui/avatar';

import { Upload } from 'lucide-react';

interface IImageUpload {
    image: string | null;
    setImage: (url: string) => void;
};

export function ImageUpload({ image, setImage }: IImageUpload) {
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
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <Avatar className="h-24 w-24">
                <AvatarImage
                    src={image || '/placeholder.svg?height=96&width=96'}
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
                            onChange={(e) => handleImageUpload(e, setImage)}
                        />
                    </label>
                    {image && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => setImage('')}
                            type="button"
                        >
                            Remove
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};