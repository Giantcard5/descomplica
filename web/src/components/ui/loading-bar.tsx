"use client";

import { cn } from "@/lib/utils";

interface LoadingBarProps {
    isLoading: boolean;
    className?: string;
};

export function LoadingBar({ isLoading, className }: LoadingBarProps) {
    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 z-50 h-0.5 bg-purple-600 transition-all duration-300 ease-out",
                isLoading ? "opacity-100 animate-pulse" : "opacity-0",
                className,
            )}
            style={{
                backgroundImage: isLoading ? "linear-gradient(90deg, #8b5cf6 0%, #a855f7 50%, #8b5cf6 100%)" : "none",
                backgroundColor: isLoading ? "transparent" : "transparent",
                backgroundSize: "200% 100%",
                animation: isLoading ? "loading-bar 2s ease-in-out infinite" : "none",
            }}
        >
            <style jsx>{`
                @keyframes loading-bar {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }`}
            </style>
        </div>
    );
};
