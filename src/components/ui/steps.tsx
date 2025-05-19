import type * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
    currentStep: number;
}

export function Steps({ currentStep, className, ...props }: StepsProps) {
    return <div className={cn('flex w-full', className)} {...props} />;
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    label: string;
    isActive?: boolean;
    isCompleted?: boolean;
}

export function Step({ id, label, isActive, isCompleted, className, ...props }: StepProps) {
    return (
        <div className={cn('flex-1 relative', className)} {...props}>
            <div className="flex items-center">
                <div
                    className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-full border text-sm font-medium',
                        isActive && 'border-primary bg-primary text-primary-foreground',
                        isCompleted && 'border-primary bg-primary text-primary-foreground',
                        !isActive &&
                            !isCompleted &&
                            'border-muted-foreground/30 text-muted-foreground'
                    )}
                >
                    {isCompleted ? <Check className="h-4 w-4" /> : null}
                    {!isCompleted && (Number.parseInt(id) || '')}
                </div>
                <div
                    className={cn(
                        'h-0.5 flex-1 mx-2',
                        isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
                    )}
                />
            </div>
            <div className="mt-2 text-sm font-medium">
                <span className={cn(isActive ? 'text-foreground' : 'text-muted-foreground')}>
                    {label}
                </span>
            </div>
        </div>
    );
}
