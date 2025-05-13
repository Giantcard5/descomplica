'use client';

import { useRef, useState } from 'react';
import { useSearchParams  } from 'next/navigation'

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import Header from '@/components/auth/header';

export default function Register() {
    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const pathName = useSearchParams();
    const pathRole = pathName.get('role');

    const [type, setType] = useState<string | null>(pathRole);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const fullName = fullNameRef.current?.value ?? '';
        const email = emailRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';

        console.log('Full Name: ', fullName, ' Email: ', email, ' Password: ', password, ' Type: ', type);
    };

    return (
        <form className="flex min-h-screen flex-col" onSubmit={handleSubmit}>
            <Header/>
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Create an account</h1>
                        <p className="text-muted-foreground">
                            Enter your information to get started
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input ref={fullNameRef} id="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input ref={emailRef} id="email" placeholder="m@example.com" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                ref={passwordRef}
                                id="password"
                                placeholder="examplePassword"
                                type="password"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Account Type</Label>
                            <RadioGroup defaultValue={type!} className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2 rounded-md border p-3">
                                    <RadioGroupItem value="retailer" id="retailer" onClick={() => setType('retailer')} />
                                    <Label htmlFor="retailer" className="flex flex-col">
                                        <span>Retailer</span>
                                        <span className="text-xs text-muted-foreground">
                                            Small store owner
                                        </span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 rounded-md border p-3">
                                    <RadioGroupItem value="industry" id="industry" onClick={() => setType('industry')} />
                                    <Label htmlFor="industry" className="flex flex-col">
                                        <span>Industry</span>
                                        <span className="text-xs text-muted-foreground">
                                            Company analyst
                                        </span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <Button type="submit" className="w-full">
                            Create Account
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
            </div>
        </form>
    );
};