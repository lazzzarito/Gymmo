"use client";

import { useGameStore } from "@/lib/store";
import { PixelCard } from "@/components/ui/PixelCard";
import { cn } from "@/lib/utils";

export function StatsCard() {
    const { stats, level, xp, maxXp } = useGameStore();

    const statRows = [
        { label: "STR", value: stats.str, color: "text-secondary", desc: "Fuerza Física" },
        { label: "STA", value: stats.sta, color: "text-primary", desc: "Resistencia" },
        { label: "WILL", value: stats.will, color: "text-blue-400", desc: "Disciplina" },
    ];

    return (
        <PixelCard>
            <div className="space-y-4">
                {statRows.map((s) => (
                    <div key={s.label}>
                        <div className="flex justify-between items-end mb-1">
                            <span className={cn("font-press-start text-xs", s.color)}>{s.label}</span>
                            <span className="font-vt323 text-xl">{s.value}</span>
                        </div>
                        {/* Fake progress bar per stat */}
                        <div className="h-2 bg-black/50 border border-gray-700">
                            <div
                                className={cn("h-full opacity-60", s.color.replace("text-", "bg-"))}
                                style={{ width: `${Math.min(s.value * 2, 100)}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 font-vt323 text-right mt-0.5">{s.desc}</p>
                    </div>
                ))}

                <div className="pt-4 border-t-2 border-dashed border-gray-700 mt-4">
                    <p className="font-press-start text-[10px] text-gray-400 mb-2">NEXT LEVEL PROGRESS</p>
                    <div className="h-4 bg-black border-2 border-white p-0.5">
                        <div
                            className="h-full bg-white transition-all duration-500"
                            style={{ width: `${(xp / maxXp) * 100}%` }}
                        />
                    </div>
                    <p className="text-right font-vt323 text-xs mt-1 text-gray-400">{xp} / {maxXp} XP</p>
                </div>
            </div>
        </PixelCard>
    );
}
