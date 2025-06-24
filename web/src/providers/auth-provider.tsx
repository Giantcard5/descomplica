'use client';

import {
    useState,
    useEffect,
    useCallback,
    useMemo,
    ReactNode,
    createContext
} from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { tokenService, IUser } from '@/lib/auth/token-service';
import { useLoadingBar } from '@/hooks/use-loading';

interface IAuthContext {
    user: IUser | null;
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

    const { setLoading } = useLoadingBar();

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = useCallback(async () => {
        setLoading(true);
        try {
            await tokenService.checkAuth().then((res) => {
                setUser(res);
            });
        } catch (error) {
            setUser(null);
            if (pathname !== '/' && !pathname.startsWith('/auth')) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (
        email: string,
        password: string,
        rememberMe: boolean,
    ) => {
        setLoading(true);
        try {
            await tokenService.login(email, password, rememberMe);
            await checkAuth();
        } catch (error) {
            throw new Error('Failed to login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    const logout = useCallback(async () => {
        setLoading(true);
        try {
            await tokenService.logout();
            setUser(null);
            router.push('/auth/login');
        } catch (error) {
            throw new Error('Failed to logout');
        } finally {
            setLoading(false);
        };
    }, [router]);

    const register = useCallback(async (
        name: string,
        email: string,
        password: string,
        type: 'retailer' | 'industry'
    ) => {
        setLoading(true);
        try {
            await tokenService.register(name, email, password, type);
            await login(email, password, false);

            router.push(`/auth/onboarding?type=${type}`);
        } catch (error) {
            throw new Error('Failed to register');
        } finally {
            setLoading(false);
        };
    }, [router]);

    const value = useMemo(() => ({
        user,
        login,
        register,
        logout,
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
