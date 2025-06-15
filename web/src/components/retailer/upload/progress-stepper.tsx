import { Check } from 'lucide-react';

export function ProgressStepper({
    steps,
    currentStep,
}: {
    steps: { id: string; label: string }[];
    currentStep: number;
}) {
    return (
        <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                currentStep === index
                                    ? 'bg-purple-600 text-white'
                                    : currentStep > index
                                      ? 'bg-green-600 text-white'
                                      : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            {currentStep > index ? (
                                <Check className="h-5 w-5" />
                            ) : (
                                <span>{index + 1}</span>
                            )}
                        </div>
                        <span className="mt-2 text-sm font-medium">{step.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`h-0.5 w-24 mx-4 transition-colors ${currentStep > index ? 'bg-green-600' : 'bg-muted'}`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
