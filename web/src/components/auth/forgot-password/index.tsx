'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ArrowLeft, Check, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { apiService } from '@/lib/api-service';

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ForgotPassword() {
    const { register, handleSubmit, getValues } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleForgotPassword: SubmitHandler<FormSchema> = async (data) => {
        try {
            setIsLoading(true);

            await apiService.forgotPassword(data.email);

            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you instructions to reset your
                        password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                        <Alert className="bg-green-50 border-green-200">
                            <Check className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Email sent</AlertTitle>
                            <AlertDescription className="text-green-700">
                                If an account exists with the email {getValues('email')}, you will
                                receive password reset instructions.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <form onSubmit={handleSubmit(handleForgotPassword)}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        {...register('email')}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )} */}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Reset Instructions'
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4">
                    <div className="text-center text-sm text-muted-foreground">
                        {isSubmitted ? (
                            <Button
                                variant="ghost"
                                className="underline"
                                onClick={() => router.push('/auth/login')}
                            >
                                Return to login
                            </Button>
                        ) : (
                            <div className="flex flex-col gap-2 w-full">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => router.push('/auth/login')}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to login
                                </Button>
                            </div>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
