'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import Header from '@/components/auth/header';

import { RetailerOnboardingForm } from '@/app/auth/onboarding/(pages)/(retailer)/form';
import { IndustryOnboardingForm } from '@/app/auth/onboarding/(pages)/(industry)/form';

export default function OnboardingPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [accountType, setAccountType] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    useEffect(() => {
        const type = searchParams.get('type');
        if (!type || (type !== 'retailer' && type !== 'industry')) {
            router.push('/auth/register');
            return;
        }

        setAccountType(type);
    }, [searchParams, router]);

    const handleStepComplete = () => {
        if (step < totalSteps) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1 flex-col p-4 md:p-6">
                <div className="mx-auto w-full max-w-3xl space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Complete Your Profile
                        </h1>
                        <p className="text-muted-foreground">
                            Let's set up your account. This information helps us personalize your
                            experience.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Step {step} of {totalSteps}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {Math.round((step / totalSteps) * 100)}% Complete
                            </span>
                        </div>
                        <Progress value={(step / totalSteps) * 100} className="h-2" />
                    </div>

                    <Card className="p-6">
                        {accountType === 'retailer' ? (
                            <RetailerOnboardingForm step={step} onComplete={handleStepComplete} />
                        ) : accountType === 'industry' ? (
                            <IndustryOnboardingForm step={step} onComplete={handleStepComplete} />
                        ) : (
                            <div className="flex items-center justify-center h-40">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        )}
                    </Card>

                    <div className="flex justify-between">
                        {step > 1 && (
                            <Button variant="outline" onClick={() => setStep(step - 1)}>
                                Back
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
