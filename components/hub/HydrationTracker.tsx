"use client";

import { PixelCard } from "../ui/PixelCard";
import { GlassWater, Beef } from "lucide-react"; // Beef icon as protein proxy
import { useState } from "react";
import { cn } from "@/lib/utils";
import { playSfx } from "@/lib/sound";
import { vibrate } from "@/lib/haptics";
import { useGameStore } from "@/lib/store";

export function HydrationTracker() {
    const { dailyHydration, updateHydration } = useGameStore();

    const water = dailyHydration?.water || 0;
    const protein = dailyHydration?.protein || 0;
    const waterGoal = 8;
    const proteinGoal = 4;

    const addWater = () => {
        if (water < waterGoal) {
            updateHydration('water', 1);
            playSfx('click');
            vibrate(10);
        }
    };

    const addProtein = () => {
        if (protein < proteinGoal) {
            updateHydration('protein', 1);
            playSfx('click');
            vibrate(10);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Water Tracker */}
            <PixelCard className="p-4 bg-blue-900/20 border-blue-500/30 flex flex-col items-center cursor-pointer active:scale-95 transition-transform" onClick={addWater}>
                <div className="flex gap-1 mb-2">
                    <GlassWater className={cn("w-6 h-6", water >= waterGoal ? "text-blue-400" : "text-blue-700")} />
                </div>
                <h4 className="font-press-start text-[10px] text-blue-300 mb-2">AGUA</h4>

                {/* Pixel Progress Bar */}
                <div className="flex gap-0.5 w-full justify-center">
                    {Array.from({ length: waterGoal }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-1.5 h-3 rounded-[1px] transition-all",
                                i < water ? "bg-blue-400 shadow-[0_0_5px_rgba(96,165,250,0.8)]" : "bg-gray-800"
                            )}
                        />
                    ))}
                </div>
                <span className="font-vt323 text-xs text-gray-400 mt-1">{water}/{waterGoal}</span>
            </PixelCard>

            {/* Protein Tracker */}
            <PixelCard className="p-4 bg-red-900/20 border-red-500/30 flex flex-col items-center cursor-pointer active:scale-95 transition-transform" onClick={addProtein}>
                <div className="flex gap-1 mb-2">
                    <Beef className={cn("w-6 h-6", protein >= proteinGoal ? "text-red-400" : "text-red-700")} />
                </div>
                <h4 className="font-press-start text-[10px] text-red-300 mb-2">PROTEÍNA</h4>

                {/* Pixel Progress Bar */}
                <div className="flex gap-0.5 w-full justify-center">
                    {Array.from({ length: proteinGoal }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-3 h-3 rounded-[1px] transition-all",
                                i < protein ? "bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" : "bg-gray-800"
                            )}
                        />
                    ))}
                </div>
                <span className="font-vt323 text-xs text-gray-400 mt-1">{protein}/{proteinGoal}</span>
            </PixelCard>
        </div>
    );
}
