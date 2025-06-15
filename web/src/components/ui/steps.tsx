'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepProps {
    id: string;
    label: string;
    isActive?: boolean;
    isCompleted?: boolean;
}

interface StepsProps {
    children: React.ReactNode;
    currentStep: number;
    className?: string;
}

export function Step({ id, label, isActive, isCompleted }: StepProps) {
    return (
        <div className="flex flex-col items-center space-y-2 flex-1">
            <div
                className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
                    isCompleted
                        ? 'border-purple-500 bg-primary text-white'
                        : isActive
                          ? 'border-purple-500 bg-primary text-white'
                          : 'border-muted-foreground/30 bg-background text-muted-foreground'
                )}
            >
                {isCompleted ? <Check className="h-5 w-5" /> : isActive ? '●' : '○'}
            </div>
            <div className="text-center">
                <p
                    className={cn(
                        'text-sm font-medium',
                        isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    )}
                >
                    {label}
                </p>
            </div>
        </div>
    );
}

export function Steps({ children, currentStep, className }: StepsProps) {
    return (
        <div className={cn('w-full', className)}>
            <div className="flex items-center justify-between w-full relative">
                {/* Connection lines */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted-foreground/30 -z-10">
                    <div
                        className="h-full bg-purple-500 transition-all duration-300"
                        style={{ width: `${(currentStep / 2) * 100}%` }}
                    />
                </div>
                {children}
            </div>
        </div>
    );
}
