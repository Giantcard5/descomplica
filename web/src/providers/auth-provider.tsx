'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { tokenService, type User } from '@/lib/auth/token-service';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    register: (name: string, email: string, password: string, type: 'retailer' | 'industry') => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (password: string, token: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in on mount
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const userData = await tokenService.checkAuth();
            setUser(userData);
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, rememberMe: boolean) => {
        try {
            await tokenService.login(email, password, rememberMe);
            // After successful login, get the user data
            const userData = await tokenService.checkAuth();
            setUser(userData);
            if (userData?.type === 'retailer') {
                router.push('/retailer');
            } else {
                router.push('/industry');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string, type: 'retailer' | 'industry') => {
        try {
            await tokenService.register(name, email, password, type);
            // After registration, log the user in
            await login(email, password, false);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await tokenService.logout();
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            await tokenService.forgotPassword(email);
        } catch (error) {
            console.error('Forgot password failed:', error);
            throw error;
        }
    };

    const resetPassword = async (password: string, token: string) => {
        try {
            await tokenService.resetPassword(password, token);
        } catch (error) {
            console.error('Reset password failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                forgotPassword,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}