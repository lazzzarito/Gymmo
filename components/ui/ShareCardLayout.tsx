"use client";

import { useGameStore } from "@/lib/store";
import { Swords, Flame, Trophy } from "lucide-react";
import { forwardRef } from "react";

export const ShareCardLayout = forwardRef<HTMLDivElement>((props, ref) => {
    const { level, dailyQuest, streak, age, weight, name } = useGameStore();

    return (
        <div ref={ref} className="fixed top-0 left-0 -z-50 w-[400px] bg-black text-white p-6 font-press-start border-4 border-secondary">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b-2 border-gray-800 pb-4">
                <div>
                    <h1 className="text-secondary text-xl mb-2">GYMMO</h1>
                    <p className="font-vt323 text-gray-500 text-sm">DATOS DEL JUGADOR</p>
                </div>
                <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center rounded border border-secondary">
                    <Swords className="w-6 h-6 text-secondary" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 p-4 border border-gray-700">
                    <p className="text-[10px] text-gray-500 mb-1">NIVEL</p>
                    <p className="text-2xl text-white">{level}</p>
                </div>
                <div className="bg-gray-900/50 p-4 border border-gray-700">
                    <p className="text-[10px] text-gray-500 mb-1">RACHA</p>
                    <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <p className="text-2xl text-white">{streak}</p>
                    </div>
                </div>
            </div>

            {/* Daily Quest Highlight */}
            {dailyQuest && (
                <div className="mb-6 bg-gradient-to-r from-red-900/20 to-black border-l-4 border-red-500 p-4">
                    <p className="text-[10px] text-red-400 mb-2 uppercase">Misión Actual</p>
                    <p className="font-vt323 text-xl">{dailyQuest.title}</p>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-[8px] text-gray-600 uppercase border-t border-gray-800 pt-4">
                <span>{new Date().toLocaleDateString()}</span>
                <span>Levantar pesas es vida.</span>
            </div>
        </div>
    );
});
ShareCardLayout.displayName = "ShareCardLayout";
