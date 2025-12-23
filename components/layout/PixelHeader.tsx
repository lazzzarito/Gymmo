"use client";

import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Settings } from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "@/components/layout/SettingsModal";

export function PixelHeader({ className }: { className?: string }) {
    const { level, xp, maxXp, class: playerClass } = useGameStore();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 h-16 bg-background/90 backdrop-blur-sm border-b-4 border-black flex items-center justify-between px-4", className)}>
            <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-primary border-2 border-white rounded overflow-hidden">
                    {/* Avatar placeholder */}
                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=Hero`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="font-press-start text-[10px] text-white leading-none mb-1">LVL {level}</div>
                    <div className="font-vt323 text-gray-400 text-sm capitalize">{playerClass || 'Novato'}</div>
                </div>
            </Link>

            <div className="flex items-center gap-4">
                {/* XP Bar */}
                <div className="w-24">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
                        <div
                            className="h-full bg-secondary transition-all duration-500"
                            style={{ width: `${(xp / maxXp) * 100}%` }}
                        />
                    </div>
                    <div className="text-[8px] font-press-start text-right text-gray-500 mt-1">{xp}/{maxXp} XP</div>
                </div>

                {/* Settings */}
                <button onClick={() => setIsSettingsOpen(true)} className="text-gray-400 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </header>
    );
}
