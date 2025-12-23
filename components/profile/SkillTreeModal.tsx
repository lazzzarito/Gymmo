"use client";

import { PixelModal } from "../ui/PixelModal";
import { useGameStore } from "@/lib/store";
import { TALENTS } from "@/lib/talents";
import { PixelCard } from "../ui/PixelCard";
import { Sparkles, Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillTreeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SkillTreeModal({ isOpen, onClose }: SkillTreeModalProps) {
    const { skillPoints, talents: unlockedTalents, unlockTalent } = useGameStore();

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="ÁRBOL DE HABILIDADES">
            <div className="space-y-6">
                {/* Points Header */}
                <div className="bg-secondary/20 border border-secondary/40 p-3 flex justify-between items-center rounded-sm">
                    <div className="font-press-start text-[8px] text-secondary uppercase">Puntos Disponibles</div>
                    <div className="font-vt323 text-2xl text-white">{skillPoints}</div>
                </div>

                {/* Talent List */}
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {TALENTS.map((talent) => {
                        const isUnlocked = unlockedTalents.some(t => t.id === talent.id);
                        const canUnlock = skillPoints > 0 && !isUnlocked;

                        return (
                            <PixelCard
                                key={talent.id}
                                className={cn(
                                    "p-4 transition-all duration-300 relative overflow-hidden",
                                    isUnlocked ? "border-secondary bg-secondary/10" : "border-gray-800 bg-black/40"
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "p-2 rounded border",
                                            isUnlocked ? "border-secondary text-secondary" : "border-gray-700 text-gray-500"
                                        )}>
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-press-start text-[8px] text-white uppercase">{talent.name}</h3>
                                            <p className="font-vt323 text-sm text-gray-400 mt-1">{talent.description}</p>
                                        </div>
                                    </div>
                                    {isUnlocked && <Check className="w-5 h-5 text-secondary" />}
                                </div>

                                {!isUnlocked && (
                                    <button
                                        disabled={!canUnlock}
                                        onClick={() => unlockTalent(talent.id)}
                                        className={cn(
                                            "w-full mt-3 font-press-start text-[8px] py-2 border-2 transition-all",
                                            canUnlock
                                                ? "border-secondary text-secondary hover:bg-secondary hover:text-black"
                                                : "border-gray-800 text-gray-600 cursor-not-allowed"
                                        )}
                                    >
                                        {canUnlock ? "DESBLOQUEAR (1 PK)" : <span className="flex items-center justify-center gap-2"><Lock className="w-3 h-3" /> BLOQUEADO</span>}
                                    </button>
                                )}
                            </PixelCard>
                        );
                    })}
                </div>

                <p className="font-vt323 text-gray-500 text-center text-sm italic">
                    Gana puntos de habilidad subiendo de nivel en la mazmorra.
                </p>
            </div>
        </PixelModal>
    );
}
