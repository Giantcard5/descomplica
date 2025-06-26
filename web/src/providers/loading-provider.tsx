'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { LoadingBar } from '@/components/ui/loading-bar';

interface LoadingBarContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

export const LoadingBarContext = createContext<LoadingBarContextType | undefined>(undefined);

interface LoadingBarProviderProps {
    children: ReactNode;
}

export function LoadingBarProvider({ children }: LoadingBarProviderProps) {
    const [isLoading, setIsLoading] = useState(false);

    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    return (
        <LoadingBarContext.Provider value={{ isLoading, setLoading }}>
            <LoadingBar isLoading={isLoading} />
            {children}
        </LoadingBarContext.Provider>
    );
}
