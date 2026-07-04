"use client";

import { Component, type ReactNode } from "react";
import { PixelButton } from "./PixelButton";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
                    <span className="text-4xl mb-4">⚠</span>
                    <h2 className="font-press-start text-sm text-red-400 mb-2">ERROR FATAL</h2>
                    <p className="font-vt323 text-gray-400 mb-4 max-w-xs">
                        {this.state.error?.message || "Algo salió mal en esta sección."}
                    </p>
                    <PixelButton
                        variant="outline"
                        onClick={() => this.setState({ hasError: false, error: null })}
                    >
                        REINTENTAR
                    </PixelButton>
                </div>
            );
        }
        return this.props.children;
    }
}
