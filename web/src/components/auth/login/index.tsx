'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useForm, SubmitHandler } from 'react-hook-form';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ModeToggle } from '@/components/ui/mode-toggle';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    rememberMe: z.boolean().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Login() {
    const { login } = useAuth();

    const { register, handleSubmit } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin: SubmitHandler<FormSchema> = async (data) => {
        try {
            setIsLoading(true);

            const rememberMe = !!data.rememberMe;

            await login(data.email, data.password, rememberMe);
        } catch (err: any) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex min-h-screen flex-col" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex h-16 items-center justify-between px-6 border-b">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Descomplica Logo"
                        width={32}
                        height={32}
                        className="rounded"
                    />
                    <span className="text-xl font-bold">Descomplica</span>
                </Link>
                <ModeToggle />
            </div>
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Welcome back</h1>
                        <p className="text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register('email')}
                                placeholder="Email"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input {...register('password')} placeholder="Password" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-primary hover:underline underline-offset-4"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-normal"
                                {...register('rememberMe')}
                            >
                                Remember me
                            </Label>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                                Facebook
                            </Button>
                            <Button variant="outline" className="w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/auth/register"
                            className="text-primary hover:underline underline-offset-4"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}
