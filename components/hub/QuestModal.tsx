"use client";

import { PixelModal } from "@/components/ui/PixelModal";
import { PixelButton } from "@/components/ui/PixelButton";
import { useGameStore } from "@/lib/store";
import { useState } from "react";
import { Check, Trophy } from "lucide-react";
import { playSfx } from "@/lib/sound";

interface QuestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QuestModal({ isOpen, onClose }: QuestModalProps) {
    const { dailyQuest, addXp, logActivity } = useGameStore();
    const [status, setStatus] = useState<'pending' | 'active' | 'completed'>('pending');

    const handleAccept = () => {
        setStatus('active');
        // In a real app, this would persist the "active" state to the store
    };


    const handleComplete = () => {
        addXp(dailyQuest.xpReward);
        setStatus('completed');
        playSfx('success');

        // Log to history
        logActivity({
            type: 'quest',
            title: dailyQuest.title,
            xpEarned: dailyQuest.xpReward
        });
    };

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="MISIÓN DIARIA">
            <div className="text-center space-y-6">

                {status === 'completed' ? (
                    <div className="py-8 animate-pulse">
                        <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
                        <h3 className="font-press-start text-xl text-yellow-400 mb-2">¡MISIÓN COMPLETADA!</h3>
                        <p className="font-vt323 text-gray-400">Has ganado {dailyQuest.xpReward} XP.</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-2">
                            <h3 className="font-press-start text-lg text-primary">{dailyQuest.title}</h3>
                            <div className="bg-black/30 p-4 rounded border border-gray-700 text-left space-y-2">
                                {dailyQuest.description.map((step, i) => (
                                    <div key={i} className="flex items-center gap-2 font-vt323 text-xl">
                                        <div className={`w-4 h-4 border-2 border-white ${status === 'active' ? 'cursor-pointer hover:bg-white/20' : ''}`} />
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="font-press-start text-[10px] text-yellow-500 mt-2">RECOMPENSA: {dailyQuest.xpReward} XP</p>
                        </div>

                        <div className="flex gap-2 justify-center">
                            {status === 'pending' && (
                                <PixelButton onClick={handleAccept} className="w-full">
                                    ACEPTAR RETO
                                </PixelButton>
                            )}

                            {status === 'active' && (
                                <PixelButton onClick={handleComplete} variant="secondary" className="w-full">
                                    <Check className="w-4 h-4 mr-2" /> COMPLETAR
                                </PixelButton>
                            )}
                        </div>
                    </>
                )}
            </div>
        </PixelModal>
    );
}
