'use client';

import React from 'react';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

import { ImageUpload } from './image-upload';

import { RetailerFormSchema } from '@/app/auth/onboarding/(utils)/schema';

interface IPersonalInfo {
    register: UseFormRegister<RetailerFormSchema>;
    errors: FieldErrors<RetailerFormSchema>;
    profileImage: string | null;
    setProfileImage: (url: string) => void;
};

export function PersonalInfo({ register, errors, profileImage, setProfileImage }: IPersonalInfo) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <p className="text-sm text-muted-foreground">
                    Tell us about yourself. This information will be displayed on your
                    profile.
                </p>
            </div>

            <ImageUpload image={profileImage} setImage={setProfileImage} />

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="John" {...register('personalFullName')} />
                    {errors.personalFullName && (
                        <p className="text-red-500 text-sm">{errors.personalFullName.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date-of-birth">Date of Birth</Label>
                    <Input id="date-of-birth" type="date" {...register('personalDateOfBirth')} />
                    {errors.personalDateOfBirth && (
                        <p className="text-red-500 text-sm">{errors.personalDateOfBirth.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" {...register('personalPhone')} />
                {errors.personalPhone && (
                    <p className="text-red-500 text-sm">{errors.personalPhone.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" rows={3} {...register('personalBio')} />
                {errors.personalBio && (
                    <p className="text-red-500 text-sm">{errors.personalBio.message}</p>
                )}
            </div>
        </div>
    );
};