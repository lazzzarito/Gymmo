"use client";

import { useState, useEffect } from "react";
import { PixelModal } from "@/components/ui/PixelModal";
import { useGameStore } from "@/lib/store";
import { PixelButton } from "@/components/ui/PixelButton";
import { PixelCard } from "@/components/ui/PixelCard";
import { Check, Timer, ArrowRight } from "lucide-react";
import { RoutineItem } from "@/lib/store";

interface WorkoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WorkoutModal({ isOpen, onClose }: WorkoutModalProps) {
    const { activeRoutine, addXp, logActivity } = useGameStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completedSets, setCompletedSets] = useState<Record<string, number>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [seconds, setSeconds] = useState(0);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isOpen && !isFinished) {
            interval = setInterval(() => {
                setSeconds(s => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, isFinished]);

    // Reset timer when exercise changes
    useEffect(() => {
        setSeconds(0);
    }, [currentIndex]);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (activeRoutine.length === 0) return null;

    const currentExercise = activeRoutine[currentIndex];

    // Safety check just in case index goes out of bounds
    if (!currentExercise && !isFinished) return null;

    // Initialize set count for this exercise if not exists
    const currentSetsDone = completedSets[currentExercise?.instanceId || ''] || 0;

    const handleCompleteSet = () => {
        if (!currentExercise) return;

        const newCount = currentSetsDone + 1;
        setCompletedSets({ ...completedSets, [currentExercise.instanceId]: newCount });
    };

    const handleNextExercise = () => {
        if (currentIndex < activeRoutine.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            finishWorkout();
        }
    };

    const finishWorkout = () => {
        setIsFinished(true);
        const totalXp = activeRoutine.reduce((acc, ex) => acc + ex.xpReward, 0);
        addXp(totalXp);

        // Log to history
        logActivity({
            type: 'workout',
            title: `Dungeon Run: ${activeRoutine[0]?.muscle || 'Entrenamiento'}`,
            xpEarned: totalXp
        });
    };

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title={isFinished ? "¡VICTORIA!" : "INCURSIÓN"}>
            {isFinished ? (
                <div className="text-center py-8 space-y-4">
                    <h3 className="font-press-start text-xl text-yellow-400">ENTRENAMIENTO COMPLETADO</h3>
                    <p className="font-vt323 text-lg text-gray-400">Has sobrevivido a la mazmorra.</p>
                    <PixelButton onClick={onClose} className="w-full mt-4">VOLVER AL HUB</PixelButton>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Header: Progress */}
                    <div className="flex justify-between text-xs font-press-start text-gray-500">
                        <span>EJERCICIO {currentIndex + 1}/{activeRoutine.length}</span>
                        <span className="text-secondary flex items-center gap-1 font-mono">
                            <Timer className="w-3 h-3" /> {formatTime(seconds)}
                        </span>
                    </div>

                    {/* Current Exercise Card */}
                    <div className="text-center space-y-2">
                        <div className="text-4xl mb-2">{currentExercise.icon}</div>
                        <h2 className="font-press-start text-lg text-white">{currentExercise.name}</h2>
                        <div className="font-vt323 text-xl text-gray-400">
                            {currentExercise.config?.sets || 0} SERIES x {currentExercise.config?.reps || 0} REPS @ {currentExercise.config?.weight || 0}KG
                        </div>
                    </div>

                    {/* Sets Management */}
                    <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: currentExercise.config?.sets || 0 }).map((_, i) => (
                            <button
                                key={i}
                                disabled={i > currentSetsDone}
                                onClick={handleCompleteSet}
                                className={`
                                    h-12 border-2 flex items-center justify-center transition-all
                                    ${i < currentSetsDone ? 'bg-primary border-primary text-black' : 'bg-transparent border-gray-600 text-gray-600'}
                                    ${i === currentSetsDone ? 'border-white animate-pulse cursor-pointer' : ''}
                                `}
                            >
                                {i < currentSetsDone ? <Check className="w-6 h-6" /> : i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="pt-4 border-t-2 border-dashed border-gray-700">
                        {currentSetsDone >= (currentExercise.config?.sets || 0) ? (
                            <PixelButton onClick={handleNextExercise} className="w-full animate-bounce">
                                {currentIndex === activeRoutine.length - 1 ? "FINALIZAR" : "SIGUIENTE EJERCICIO"} <ArrowRight className="ml-2 w-4 h-4" />
                            </PixelButton>
                        ) : (
                            <p className="text-center font-vt323 text-gray-500">Completa los sets para avanzar.</p>
                        )}
                    </div>
                </div>
            )}
        </PixelModal>
    );
}
