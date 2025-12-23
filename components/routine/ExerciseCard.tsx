"use client";

import { Exercise } from "@/lib/exercises";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";

interface ExerciseCardProps {
    exercise: Exercise;
    onAdd?: () => void;
    onRemove?: () => void;
    isAdded?: boolean;
}

export function ExerciseCard({ exercise, onAdd, onRemove, isAdded }: ExerciseCardProps) {
    return (
        <PixelCard className={cn(
            "transition-all active:scale-95 flex flex-col justify-between gap-2 h-full",
            isAdded ? "border-primary bg-primary/10" : ""
        )}>
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-surface border-2 border-gray-600 flex items-center justify-center text-2xl">
                    {exercise.icon}
                </div>
                <div className={cn(
                    "px-1.5 py-0.5 text-[8px] font-press-start border border-black",
                    exercise.difficulty === 'Novato' ? "bg-green-400 text-black" :
                        exercise.difficulty === 'Intermedio' ? "bg-yellow-400 text-black" :
                            "bg-red-500 text-white"
                )}>
                    {exercise.difficulty.substring(0, 3)}
                </div>
            </div>

            <div>
                <h4 className="font-press-start text-[10px] leading-tight mb-1">{exercise.name}</h4>
                <p className="font-vt323 text-gray-400 text-xs line-clamp-2">{exercise.description}</p>
            </div>

            <div className="mt-auto pt-2">
                {isAdded ? (
                    <PixelButton variant="outline" size="sm" className="w-full text-red-400 hover:bg-red-900/20" onClick={onRemove}>
                        <Trash2 className="w-4 h-4 mr-1" /> ELIMINAR
                    </PixelButton>
                ) : (
                    <PixelButton variant="secondary" size="sm" className="w-full" onClick={onAdd}>
                        <Plus className="w-4 h-4 mr-1" /> AÑADIR
                    </PixelButton>
                )}
            </div>
        </PixelCard>
    );
}
