"use client";

import { ACHIEVEMENTS, Achievement } from "@/lib/achievements";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Trophy, Lock } from "lucide-react";
import { useState } from "react";
import { PixelCard } from "@/components/ui/PixelCard";

export function TrophyRoom() {
    const { level, stats, activityHistory } = useGameStore();
    const [activeTier, setActiveTier] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Beginner');

    const totalWorkouts = activityHistory.filter(a => a.type === 'workout').length;
    const totalQuests = activityHistory.filter(a => a.type === 'quest').length;

    const isUnlocked = (achievement: Achievement) => {
        switch (achievement.requirementType) {
            case 'workout_count': return totalWorkouts >= achievement.requirementValue;
            case 'quest_count': return totalQuests >= achievement.requirementValue;
            case 'level': return level >= achievement.requirementValue;
            case 'stat_str': return stats.str >= achievement.requirementValue;
            case 'stat_sta': return stats.sta >= achievement.requirementValue;
            case 'stat_will': return stats.will >= achievement.requirementValue;
            default: return false;
        }
    };

    const tiers = [
        { name: 'NOVATO', key: 'Beginner' as const, color: 'border-gray-500', bg: 'bg-gray-500' },
        { name: 'VETERANO', key: 'Intermediate' as const, color: 'border-blue-500', bg: 'bg-blue-500' },
        { name: 'LEYENDA', key: 'Expert' as const, color: 'border-yellow-500', bg: 'bg-yellow-500' }
    ];

    const currentTier = tiers.find(t => t.key === activeTier)!;

    return (
        <PixelCard className="bg-black/40 border-gray-800 p-0 overflow-hidden min-h-[300px]">
            {/* Tier Tabs */}
            <div className="flex border-b-2 border-gray-800">
                {tiers.map(tier => (
                    <button
                        key={tier.key}
                        onClick={() => setActiveTier(tier.key)}
                        className={cn(
                            "flex-1 py-3 text-center font-press-start text-[8px] uppercase transition-colors",
                            activeTier === tier.key
                                ? `${tier.bg} text-black`
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {tier.name}
                    </button>
                ))}
            </div>

            <div className="p-4 grid grid-cols-4 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {ACHIEVEMENTS.filter(a => a.tier === activeTier).map(a => {
                    const unlocked = isUnlocked(a);
                    return (
                        <div
                            key={a.id}
                            className={cn(
                                "aspect-square flex flex-col items-center justify-center p-1 border-2 transition-all relative group",
                                unlocked
                                    ? `bg-gray-900/50 ${currentTier.color}/50 shadow-[0_0_15px_rgba(255,255,255,0.05)]`
                                    : "bg-black/40 border-gray-800 opacity-40"
                            )}
                        >
                            <span className={cn("text-2xl mb-1", !unlocked && "grayscale filter")}>
                                {a.icon}
                            </span>
                            {!unlocked && <Lock className="w-3 h-3 absolute top-1 right-1 text-gray-700" />}

                            {/* Hover Tooltip/Info */}
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-black border border-gray-700 p-2 text-center pointer-events-none z-50 rounded shadow-2xl">
                                <p className="font-vt323 text-white text-sm leading-none mb-1">{a.title}</p>
                                <p className="font-vt323 text-gray-500 text-[10px] leading-tight">
                                    {unlocked ? a.description : `Requisito: ${a.description}`}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Progress Bar for Tier */}
            <div className="px-4 pb-4">
                <div className="flex justify-between font-vt323 text-gray-500 text-xs mb-1">
                    <span>Progreso del Rango</span>
                    <span>
                        {ACHIEVEMENTS.filter(a => a.tier === activeTier && isUnlocked(a)).length} / {ACHIEVEMENTS.filter(a => a.tier === activeTier).length}
                    </span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                    <div
                        className={cn("h-full transition-all duration-1000", currentTier.bg)}
                        style={{ width: `${(ACHIEVEMENTS.filter(a => a.tier === activeTier && isUnlocked(a)).length / ACHIEVEMENTS.filter(a => a.tier === activeTier).length) * 100}%` }}
                    />
                </div>
            </div>
        </PixelCard>
    );
}
