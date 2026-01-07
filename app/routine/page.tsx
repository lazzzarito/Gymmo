"use client";

import { RoutineBuilder } from "@/components/routine/RoutineBuilder";
import { PixelHeader } from "@/components/layout/PixelHeader";
import { PixelBottomNav } from "@/components/layout/PixelBottomNav";

export default function RoutinePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <PixelHeader />
            <main className="pb-20 pt-20 min-h-screen px-2 max-w-md mx-auto">
                <RoutineBuilder />
            </main>
            <PixelBottomNav />
        </div>
    );
}
