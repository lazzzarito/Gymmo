"use client";

import { PixelCard } from "../ui/PixelCard";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function StreakFlame() {
    // This would ideally be persisted in store. 
    // For now we mock logic or check last login date if available.
    // Using level as a proxy for "progress" to show variety for now.
    const { streak, checkStreak } = useGameStore();

    useEffect(() => {
        checkStreak();
    }, [checkStreak]);

    const fireColors = [
        "text-orange-500",
        "text-red-500",
        "text-purple-500", // High streak
        "text-blue-500" // Legendary streak
    ];

    const colorClass = streak > 30 ? fireColors[3] : streak > 14 ? fireColors[2] : streak > 7 ? fireColors[1] : fireColors[0];

    return (
        <PixelCard className="relative overflow-hidden bg-black/40 border-orange-900/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 z-10">
                <div className={cn("relative", "animate-pulse")}>
                    <Flame className={cn("w-10 h-10", colorClass)} strokeWidth={1.5} />
                    <div className="absolute inset-0 blur-md bg-current opacity-40 rounded-full" />
                </div>
                <div>
                    <h3 className="font-press-start text-xs text-orange-200">RACHA DE FUEGO</h3>
                    <p className="font-vt323 text-gray-400 text-sm">Mantén la llama viva</p>
                </div>
            </div>

            <div className="text-right z-10">
                <span className={cn("font-press-start text-2xl", colorClass)}>{streak}</span>
                <span className="font-vt323 text-gray-500 block text-xs uppercase">Días Seguidos</span>
            </div>

            {/* Background Embers Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute bottom-0 right-10 w-2 h-2 bg-orange-500 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute bottom-2 right-20 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
            </div>
        </PixelCard>
    );
}
