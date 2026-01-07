"use client";

import { motion } from "framer-motion";
import { Lock, Skull, CheckCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/lib/store";
import { PixelCard } from "@/components/ui/PixelCard";

export function MapComponent() {
    const { level } = useGameStore();

    // Generate levels 1-10
    const levels = Array.from({ length: 10 }, (_, i) => i + 1);

    // Calculate current progress within the 10-level block
    // E.g. level 12 -> display levels 11-20? Or just 1-10 always representing the current tier?
    // The requirement says: "cada 10 niveles haya un Desafío de un Enemigo ... serian 9 por cada nivel del usuario (Principiante, Intermedio...)"
    // It seems it implies a visual map of 10 steps.
    // Let's assume we show the current "World" (1-10, 11-20, etc.)

    // Determine the start of the current world
    const currentWorldStart = Math.floor((level - 1) / 10) * 10 + 1;
    const currentLevels = levels.map(l => currentWorldStart + l - 1);

    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center gap-4 px-2 min-w-max">
                {currentLevels.map((lvl, index) => {
                    const isBoss = (index + 1) === 10;
                    const isUnlocked = level >= lvl;
                    const isCurrent = level === lvl;
                    const isCompleted = level > lvl;

                    return (
                        <div key={lvl} className="flex flex-col items-center gap-2 relative">
                            {/* Connector Line */}
                            {index < 9 && (
                                <div className={cn(
                                    "absolute top-1/2 left-[50%] w-[calc(100%+16px)] h-1 -z-10",
                                    level > lvl ? "bg-secondary" : "bg-gray-800"
                                )} />
                            )}

                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={cn(
                                    "w-12 h-12 flex items-center justify-center border-2 rounded-lg transition-all relative",
                                    isCurrent ? "bg-secondary border-white shadow-[0_0_10px_rgba(255,200,0,0.5)] scale-110" :
                                        isCompleted ? "bg-secondary/20 border-secondary text-secondary" :
                                            "bg-black/60 border-gray-700 text-gray-500"
                                )}
                            >
                                {isBoss ? (
                                    <Skull className={cn("w-6 h-6", isCurrent ? "text-black animate-pulse" : isCompleted ? "text-secondary" : "text-gray-500")} />
                                ) : isCompleted ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : isCurrent ? (
                                    <span className="font-press-start text-xs text-black">{lvl}</span>
                                ) : (
                                    <Lock className="w-4 h-4" />
                                )}

                                {isCurrent && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="text-white"
                                        >
                                            ▼
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>

                            <span className={cn(
                                "font-press-start text-[8px]",
                                isCurrent ? "text-secondary" : "text-gray-600"
                            )}>
                                {isBoss ? "BOSS" : `NVL ${lvl}`}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
