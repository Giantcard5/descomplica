'use client';

import { useState, useEffect, ReactNode, createContext } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { tokenService, IUser } from '@/lib/auth/token-service';

interface IAuthContext {
    user: IUser | null;
    isLoading: boolean;
    isOnboarding: boolean;
    setIsOnboarding: (isOnboarding: boolean) => void;
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    register: (
        name: string,
        email: string,
        password: string,
        type: 'retailer' | 'industry'
    ) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnboarding, setIsOnboarding] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`, {
                credentials: 'include',
            });

            if (!response.ok) {
                setUser(null);

                if (pathname !== '/' && !pathname.startsWith('/auth')) {
                    router.push('/auth/login');
                }

                return;
            }

            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            setUser(null);

            if (pathname !== '/' && !pathname.startsWith('/auth')) {
                router.push('/auth/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (
        email: string,
        password: string,
        rememberMe: boolean,
        onBoarding: boolean = false
    ) => {
        try {
            await tokenService.login(email, password, rememberMe);
            const userData = await tokenService.checkAuth();

            if (!userData) {
                throw new Error('User not found');
            }
            setUser(userData);

            if (!onBoarding) {
                router.push(`/${userData?.type}`);
            } else {
                setIsOnboarding(true);
                router.push(`/auth/onboarding?type=${userData?.type}`);
            }
        } catch (error) {
            throw new Error('Failed to login');
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        type: 'retailer' | 'industry'
    ) => {
        try {
            await tokenService.register(name, email, password, type);
            await login(email, password, false, true);
        } catch (error) {
            throw new Error('Failed to register');
        }
    };

    const logout = async () => {
        try {
            await tokenService.logout();
            setUser(null);
            router.push('/auth/login');
        } catch (error) {
            throw new Error('Failed to logout');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isOnboarding,
                setIsOnboarding,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
