"use client";

import { PixelModal } from "../ui/PixelModal";
import { useGameStore } from "@/lib/store";
import { PixelCard } from "../ui/PixelCard";
import { PixelButton } from "../ui/PixelButton";
import { Swords } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActiveRoutineModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ActiveRoutineModal({ isOpen, onClose }: ActiveRoutineModalProps) {
    const { activeRoutine } = useGameStore();
    const router = useRouter();

    const handleStart = () => {
        onClose();
        router.push('/routine');
    };

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="RUTINA ACTIVA">
            <div className="space-y-4">
                {activeRoutine.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 font-vt323 border-2 border-dashed border-gray-700">
                        Tu grimorio está vacío.
                    </div>
                ) : (
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
                        {activeRoutine.map((ex, idx) => (
                            <PixelCard key={idx} className="flex items-center gap-3 p-3 bg-black/40 border-gray-800">
                                <span className="text-2xl">{ex.icon}</span>
                                <div>
                                    <h4 className="font-vt323 text-lg leading-none text-white">{ex.name}</h4>
                                    <div className="font-press-start text-[8px] text-gray-500 mt-1">
                                        {ex.config?.sets}x{ex.config?.reps} • {ex.config?.technique || 'Normal'}
                                    </div>
                                </div>
                            </PixelCard>
                        ))}
                    </div>
                )}

                <PixelButton className="w-full" variant="primary" onClick={handleStart}>
                    <Swords className="w-4 h-4 mr-2" /> IR AL GRIMORIO
                </PixelButton>
            </div>
        </PixelModal>
    );
}
