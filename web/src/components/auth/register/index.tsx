'use client';

import { useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Loader2 } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    type: z.enum(['retailer', 'industry'], { message: 'Account type is required' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Register() {
    const { register: registerAuth } = useAuth();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: '' as 'retailer' | 'industry',
        },
    });

    const router = useRouter();
    const pathName = useSearchParams();
    const pathRole = pathName.get('role');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!pathRole) return;

        if (pathRole === 'retailer' || pathRole === 'industry') {
            setValue('type', pathRole);
        }
    }, [pathRole, setValue]);

    const handleRegister: SubmitHandler<FormSchema> = async (data) => {
        try {
            setIsLoading(true);

            await registerAuth(data.name, data.email, data.password, data.type);

            router.push('/auth/onboarding?type=' + data.type);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <div className="flex min-h-screen flex-col">
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
            <form
                className="flex flex-1 items-center justify-center p-4"
                onSubmit={handleSubmit(handleRegister)}
            >
                <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Create an account</h1>
                        <p className="text-muted-foreground">
                            Enter your information to get started
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                {...register('name')}
                                placeholder="John Doe"
                                disabled={isLoading}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register('email')}
                                placeholder="email@example.com"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                {...register('password')}
                                placeholder="examplePassword"
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Account Type</Label>
                            <RadioGroup className="grid grid-cols-2 gap-4" value={watch('type')}>
                                <div className="flex items-center space-x-2 rounded-md border p-3">
                                    <RadioGroupItem
                                        value="retailer"
                                        id="retailer"
                                        {...register('type')}
                                        onClick={() => setValue('type', 'retailer')}
                                    />
                                    <Label htmlFor="retailer" className="flex flex-col">
                                        <span>Retailer</span>
                                        <span className="text-xs text-muted-foreground">
                                            Small store owner
                                        </span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-md border p-3">
                                    <RadioGroupItem
                                        value="industry"
                                        id="industry"
                                        {...register('type')}
                                        onClick={() => setValue('type', 'industry')}
                                    />
                                    <Label htmlFor="industry" className="flex flex-col">
                                        <span>Industry</span>
                                        <span className="text-xs text-muted-foreground">
                                            Company analyst
                                        </span>
                                    </Label>
                                </div>
                            </RadioGroup>
                            {errors.type && (
                                <p className="text-red-500 text-sm">{errors.type.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground"></span>
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
                        Already have an account?{' '}
                        <Link
                            href="/auth/login"
                            className="text-primary hover:underline underline-offset-4"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
