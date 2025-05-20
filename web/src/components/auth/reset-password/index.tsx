'use client';

import type React from 'react';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { Check, Eye, EyeOff, Loader2 } from 'lucide-react';

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
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ResetPassword() {
    const { register, handleSubmit, setError } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleResetPassword: SubmitHandler<FormSchema> = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { message: 'Passwords do not match' });
            return;
        };

        try {
            setIsLoading(true);

            await apiService.resetPassword(data.password, token!).then(() => {
                setIsSubmitted(true);
            });

            setIsLoading(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        };
    };

    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Invalid Reset Link</CardTitle>
                        <CardDescription>
                            The password reset link is invalid or has expired.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={() => router.push('/auth/forgot-password')}
                        >
                            Request a new reset link
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Create New Password</CardTitle>
                    <CardDescription>Enter a new password for your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                        <Alert className="bg-green-50 border-green-200">
                            <Check className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">
                                Password Reset Successful
                            </AlertTitle>
                            <AlertDescription className="text-green-700">
                                Your password has been reset successfully. You can now log in with
                                your new password.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <form onSubmit={handleSubmit(handleResetPassword)}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            {...register('password')}
                                            disabled={isLoading}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span className="sr-only">
                                                {showPassword ? 'Hide password' : 'Show password'}
                                            </span>
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Password must be at least 6 characters long
                                    </p>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('confirmPassword')}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
                {isSubmitted && (
                    <CardFooter>
                        <Button className="w-full" onClick={() => router.push('/auth/login')}>
                            Go to Login
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
