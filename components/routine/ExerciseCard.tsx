"use client";

import { memo } from "react";
import type { Exercise } from "@/lib/exercises";
import { PixelCard } from "@/components/ui/PixelCard";
import { Plus } from "lucide-react";

interface ExerciseCardProps {
    exercise: Exercise;
    onAdd?: () => void;
}

const ExerciseCardBase = ({ exercise, onAdd }: ExerciseCardProps) => (
    <PixelCard
        className="flex items-center gap-3 p-2 bg-gray-900 border-gray-800 hover:border-secondary transition-colors cursor-pointer group min-h-[4rem]"
        onClick={onAdd}
    >
        <div className="w-8 h-8 flex-shrink-0 bg-black border border-gray-700 rounded flex items-center justify-center text-lg group-hover:bg-secondary/20 group-hover:border-secondary transition-colors">
            {exercise.icon}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
            <h3 className="font-vt323 text-xs text-white leading-tight break-words group-hover:text-secondary transition-colors">
                {exercise.name}
            </h3>
            <div className="flex items-center gap-2">
                <span className="text-[8px] font-press-start text-gray-500 uppercase px-1 bg-gray-800 rounded">
                    {exercise.muscle}
                </span>
            </div>
        </div>

        <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-gray-800 rounded flex items-center justify-center text-secondary hover:bg-secondary hover:text-black transition-colors border border-gray-700">
                <Plus className="w-5 h-5" />
            </div>
        </div>
    </PixelCard>
);

export const ExerciseCard = memo(ExerciseCardBase);
