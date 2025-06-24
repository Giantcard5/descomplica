'use client';

import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { StoreInfo } from '@/components/auth/onboarding/retailer/store-info';
import { PersonalInfo } from '@/components/auth/onboarding/retailer/personal-info';
import { PreferencesInfo } from '@/components/auth/onboarding/retailer/preferences-info';

import {
    RetailerFormSchema,
    personalInfoSchema,
    storeInfoSchema,
    preferencesInfoSchema,
    PersonalInfoSchema,
    PreferencesInfoSchema,
    StoreInfoSchema,
} from '../../(utils)/schema';

import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';

import { apiService } from '../../(lib)/api-service';

import { useAuth } from '@/hooks/use-auth';

interface RetailerOnboardingFormProps {
    step: number;
    onComplete: () => void;
}

export function RetailerOnboardingForm({ step, onComplete }: RetailerOnboardingFormProps) {
    const router = useRouter();

    const { user } = useAuth();
    const { toast } = useToast();

    const getStepSchema = () => {
        switch (step) {
            case 1:
                return personalInfoSchema;
            case 2:
                return storeInfoSchema;
            case 3:
                return preferencesInfoSchema;
            default:
                return personalInfoSchema;
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<RetailerFormSchema>({
        resolver: zodResolver(getStepSchema()),
    });

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [storeImage, setStoreImage] = useState<string | null>(null);

    const handleOnboardingSubmit = async (data: RetailerFormSchema) => {
        const response = await apiService.registerRetailer({
            personalInfo: {
                phoneNumber: data.phoneNumber,
                bio: data.bio,
                dateOfBirth: data.dateOfBirth,
            },
            storeInfo: {
                name: data.name,
                type: data.type,
                size: data.size,
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                country: data.country,
                description: data.description,
                employees: data.employees,
            },
            preferencesInfo: {
                language: data.language,
                theme: data.theme,
                dateFormat: data.dateFormat,
                notification: data.notification,
            },
        });

        if (response) {
            toast({
                title: 'Retailer registered successfully',
                description: 'You can now start using the app',
            });
        } else {
            toast({
                title: 'Error registering retailer',
                description: 'Please try again',
            });
        }

        router.push(`/${user?.type}`);
    };

    const onStepSubmit = (data: any) => {
        if (step < 3) {
            onComplete();
        } else {
            handleOnboardingSubmit({
                ...getValues(),
                ...data,
            });
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <PersonalInfo
                        register={register}
                        errors={errors}
                        profileImage={profileImage}
                        setProfileImage={setProfileImage}
                    />
                );
            case 2:
                return (
                    <StoreInfo
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        errors={errors}
                        storeImage={storeImage}
                        setStoreImage={setStoreImage}
                    />
                );
            case 3:
                return <PreferencesInfo watch={watch} setValue={setValue} errors={errors} />;
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit(onStepSubmit)} className="space-y-6">
            {renderStep()}

            <Button type="submit" className="w-full">
                {step === 3 ? 'Complete Setup' : 'Next'}
            </Button>
        </form>
    );
}
