"use client";

import { PixelModal } from "../ui/PixelModal";
import { useGameStore } from "@/lib/store";
import { PixelCard } from "../ui/PixelCard";
import { PixelButton } from "../ui/PixelButton";
import { Swords, Trash2, GripVertical, Settings2, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WorkoutModal } from "./WorkoutModal";
import { ExerciseDetailsModal } from "./ExerciseDetailsModal";

interface RoutineManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RoutineManagerModal({ isOpen, onClose }: RoutineManagerModalProps) {
    const { activeRoutine, removeFromRoutine, reorderRoutine } = useGameStore();
    const router = useRouter();
    const [selectedExercise, setSelectedExercise] = useState<any>(null);

    // Battle/Workout State
    const [isWorkoutOpen, setIsWorkoutOpen] = useState(false);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const handleStart = () => {
        if (activeRoutine.length === 0) return;
        setIsCountingDown(true);
        setCountdown(3);

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsCountingDown(false);
                    setIsWorkoutOpen(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // If workout is open, we shouldn't close the manager modal underneath?
    // Actually, maybe we should close the manager modal once the workout modal opens?
    // Or keep it mounted. Let's keep it mounted for now to preserve state flow.
    // but for now we focus on the "Manager" aspect: List, Details, Delete.

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="GESTIONAR COMBATE">
            <div className="space-y-4 max-h-[70vh] flex flex-col">

                {activeRoutine.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-vt323 border-2 border-dashed border-gray-800 rounded bg-black/20">
                        <p className="text-xl mb-2">Tu grimorio está vacío.</p>
                        <p className="text-sm">Añade ejercicios desde la pestaña Grimorio.</p>
                    </div>
                ) : (
                    <div className="space-y-2 overflow-y-auto pr-2 flex-1 min-h-0 scrollbar-hide">
                        {activeRoutine.map((ex, idx) => (
                            <PixelCard key={ex.instanceId || idx} className="flex items-center gap-3 p-3 bg-gray-900 border-gray-800 relative group">
                                <div className="text-gray-600 cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                                <div className="w-10 h-10 bg-black border border-gray-700 flex items-center justify-center text-xl rounded">
                                    {ex.icon}
                                </div>
                                <div className="flex-1 min-w-0" onClick={() => setSelectedExercise(ex)}>
                                    <h4 className="font-vt323 text-xs leading-tight text-white break-words">{ex.name}</h4>
                                    <div className="font-press-start text-[8px] text-gray-500 mt-1 flex gap-2">
                                        <span className="bg-gray-800 px-1 rounded">{ex.config?.sets}x{ex.config?.reps}</span>
                                        <span className="text-secondary">{ex.config?.technique}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setSelectedExercise(ex)}
                                        className="p-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Settings2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => removeFromRoutine(ex.instanceId!)}
                                        className="p-2 text-red-500 hover:bg-red-900/20 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </PixelCard>
                        ))}
                    </div>
                )}

                <div className="pt-2 border-t border-gray-800 mt-auto">
                    <PixelButton
                        className="w-full py-4 text-lg"
                        variant="primary"
                        onClick={handleStart}
                        disabled={activeRoutine.length === 0}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Swords className="w-5 h-5" />
                            <span>INICIAR RUTINA</span>
                        </div>
                    </PixelButton>
                </div>
            </div>

            {selectedExercise && (
                <ExerciseDetailsModal
                    isOpen={!!selectedExercise}
                    onClose={() => setSelectedExercise(null)}
                    exercise={selectedExercise}
                    mode="EDIT"
                    initialConfig={selectedExercise.config}
                />
            )}

            {isWorkoutOpen && (
                <WorkoutModal
                    isOpen={isWorkoutOpen}
                    onClose={() => {
                        setIsWorkoutOpen(false);
                        onClose(); // Close manager too when workout is done/cancelled
                    }}
                />
            )}

            {isCountingDown && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    <div className="text-[150px] font-press-start text-secondary animate-pulse">
                        {countdown}
                    </div>
                </div>
            )}
        </PixelModal>
    );
}
