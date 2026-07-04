"use client";

import { PixelButton } from "@/components/ui/PixelButton";
import { PixelCard } from "@/components/ui/PixelCard";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <PixelCard className="max-w-sm w-full text-center space-y-6">
                <WifiOff className="mx-auto text-primary" size={64} strokeWidth={1.5} />
                <h1 className="text-xl font-press-start text-primary">Offline</h1>
                <p className="font-vt323 text-lg text-foreground/80">
                    You lost connection to the Gymmo servers.
                    <br />
                    Check your internet and try again.
                </p>
                <PixelButton
                    variant="primary"
                    size="md"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </PixelButton>
            </PixelCard>
        </div>
    );
}
