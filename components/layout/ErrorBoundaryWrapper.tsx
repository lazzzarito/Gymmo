"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

function LoadingFallback() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-4">
                <div className="w-8 h-8 border-2 border-secondary border-t-transparent animate-spin mx-auto" />
                <p className="font-vt323 text-gray-500 animate-pulse">Cargando...</p>
            </div>
        </div>
    );
}

export function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
                {children}
            </Suspense>
        </ErrorBoundary>
    );
}
