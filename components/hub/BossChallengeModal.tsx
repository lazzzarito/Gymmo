"use client";

import { PixelModal } from "../ui/PixelModal";
import { useGameStore } from "@/lib/store";
import { PixelCard } from "../ui/PixelCard";
import { Skull, Trophy, Zap, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BossModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BossChallengeModal({ isOpen, onClose }: BossModalProps) {
    const { activityHistory, addXp } = useGameStore();
    const [victory, setVictory] = useState(false);

    // Mock boss data - in a real app, this would be calculated based on PRs
    const bossName = "EL SEÑOR DE LAS SOMBRAS";
    const requirement = "Supera tu récord de 15 reps en Press de Banca";

    const handleDefeatBoss = () => {
        addXp(500);
        setVictory(true);
    };

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="BATALLA DE JEFE">
            {!victory ? (
                <div className="space-y-6 text-center">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 bg-red-900/20 border-4 border-red-900 flex items-center justify-center animate-pulse">
                            <Skull className="w-16 h-16 text-red-600" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white font-press-start text-[8px] px-2 py-1">ÉLITE</div>
                    </div>

                    <div>
                        <h3 className="font-press-start text-sm text-white mb-2">{bossName}</h3>
                        <div className="bg-red-900/10 border border-red-900/50 p-4 rounded-sm">
                            <div className="flex items-center gap-2 text-red-500 mb-2 justify-center">
                                <AlertCircle className="w-4 h-4" />
                                <span className="font-press-start text-[8px]">OBJETIVO DE VICTORIA</span>
                            </div>
                            <p className="font-vt323 text-lg text-white">{requirement}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleDefeatBoss}
                            className="w-full bg-red-900 hover:bg-red-800 text-white font-press-start text-[10px] py-4 border-b-4 border-red-950 transition-all active:border-b-0 active:translate-y-1"
                        >
                            ¡LOGRADO! RECLAMAR VICTORIA
                        </button>
                        <p className="font-vt323 text-gray-500 text-sm italic">
                            Esta batalla requiere que superes tus límites actuales.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 text-center py-4">
                    <div className="w-20 h-20 bg-secondary/20 border-4 border-secondary flex items-center justify-center mx-auto scale-110">
                        <Trophy className="w-10 h-10 text-secondary" />
                    </div>
                    <div>
                        <h3 className="font-press-start text-sm text-secondary mb-2">¡BOSS DERROTADO!</h3>
                        <p className="font-vt323 text-gray-400 text-lg">Has superado la oscuridad con tu disciplina.</p>
                    </div>
                    <div className="bg-surface p-4 border-2 border-secondary/30 rounded-sm">
                        <div className="text-secondary font-press-start text-[8px] mb-2">RECOMPENSA</div>
                        <div className="text-white font-vt323 text-2xl">+500 XP</div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full bg-secondary text-black font-press-start text-[10px] py-3 uppercase"
                    >
                        Continuar Senda
                    </button>
                </div>
            )}
        </PixelModal>
    );
}
