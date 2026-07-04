"use client";

import { PixelModal } from "@/components/ui/PixelModal";
import { useGameStore } from "@/lib/store";
import { PixelButton } from "@/components/ui/PixelButton";
import { Check, Timer, ArrowRight, Info } from "lucide-react";
import { useWorkoutSession } from "@/hooks/useWorkoutSession";

interface WorkoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WorkoutModal({ isOpen, onClose }: WorkoutModalProps) {
    const { activeRoutine } = useGameStore();
    const {
        currentExercise,
        currentSetsDone,
        isFinished,
        seconds,
        isResting,
        restSeconds,
        currentIndex,
        handleCompleteSet,
        skipRest,
        handleNext,
        addRestTime,
        formatTime,
        totalExercises,
    } = useWorkoutSession(activeRoutine, onClose);

    if (activeRoutine.length === 0) return null;
    if (!currentExercise && !isFinished) return null;

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title={isFinished ? "¡VICTORIA!" : "INCURSIÓN"}>
            {/* Rest Timer Overlay */}
            {isResting && (
                <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center space-y-6">
                    <h3 className="font-press-start text-xl text-blue-400 animate-pulse">DESCANSO</h3>
                    <div className="text-6xl font-vt323 text-white">
                        {Math.floor(restSeconds / 60)}:{restSeconds % 60 < 10 ? '0' : ''}{restSeconds % 60}
                    </div>
                    <div className="flex gap-4">
                        <PixelButton onClick={() => addRestTime(10)} variant="outline" size="sm">+10s</PixelButton>
                        <PixelButton onClick={skipRest} variant="primary">¡A LA BATALLA!</PixelButton>
                    </div>
                </div>
            )}

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
                        <span>EJERCICIO {currentIndex + 1}/{totalExercises}</span>
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

                        {/* Instructions (Permanently Visible) */}
                        {currentExercise.instructions && currentExercise.instructions.length > 0 && (
                            <div className="mt-4 border-t border-gray-800 pt-4 text-left">
                                <div className="flex items-center gap-2 mb-3">
                                    <Info className="w-3 h-3 text-secondary" />
                                    <span className="font-press-start text-[8px] text-secondary">GUÍA DE COMBATE</span>
                                </div>
                                <div className="bg-black/40 p-3 border border-gray-800 rounded max-h-40 overflow-y-auto scrollbar-hide">
                                    <ul className="space-y-2">
                                        {currentExercise.instructions.map((inst, i) => (
                                            <li key={i} className="flex gap-2 text-sm font-vt323 text-gray-300 leading-tight">
                                                <span className="text-secondary font-press-start text-[8px] mt-1">{i + 1}.</span>
                                                <span>{inst}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
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
                            <PixelButton onClick={handleNext} className="w-full animate-bounce">
                                {currentIndex === totalExercises - 1 ? "FINALIZAR" : "SIGUIENTE EJERCICIO"} <ArrowRight className="ml-2 w-4 h-4" />
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
