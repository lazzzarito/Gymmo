"use client";

import { useGameStore } from "@/lib/store";
import { EXERCISE_DB, Exercise } from "@/lib/exercises";
import { ExerciseCard } from "./ExerciseCard";
import { PixelCard } from "@/components/ui/PixelCard";
import { PixelButton } from "@/components/ui/PixelButton";
import { Swords, Scroll } from "lucide-react";

import { ExerciseDetailsModal } from "./ExerciseDetailsModal";
import { useState } from "react";
import { PixelInput } from "@/components/ui/PixelInput";
import { cn } from "@/lib/utils";
import { RoutineManagerModal } from "./RoutineManagerModal";

export function RoutineBuilder() {
    const { activeRoutine } = useGameStore();

    // Grimoire State
    const [selectedMuscle, setSelectedMuscle] = useState<import('@/lib/exercises').MuscleGroup | 'All'>('All');
    const [search, setSearch] = useState("");
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [isManagerOpen, setIsManagerOpen] = useState(false);

    const muscleGroups: (import('@/lib/exercises').MuscleGroup | 'All')[] = ['All', 'Pecho', 'Espalda', 'Piernas', 'Hombros', 'Bíceps', 'Tríceps', 'Abdominales', 'Cardio'];

    const filteredExercises = EXERCISE_DB.filter(ex => {
        const matchMuscle = selectedMuscle === 'All' || ex.muscle === selectedMuscle;
        const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
        return matchMuscle && matchSearch;
    }).slice(0, 50);

    return (
        <div className="h-full flex flex-col pt-4">
            {/* Header: GRIMORIO */}
            <div className="px-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                    <Scroll className="w-6 h-6 animate-pulse" />
                    <h1 className="font-press-start text-lg">GRIMORIO</h1>
                </div>

                <PixelButton
                    variant="outline"
                    size="sm"
                    onClick={() => setIsManagerOpen(true)}
                    className={cn(activeRoutine.length > 0 ? "animate-pulse border-secondary text-secondary" : "")}
                >
                    <div className="flex items-center gap-2">
                        <Swords className="w-4 h-4" />
                        <span>RUTINA ({activeRoutine.length})</span>
                    </div>
                </PixelButton>
            </div>

            {/* Exercise Database (The Grimoire) */}
            <div className="flex-1 min-h-0 border-t-2 border-gray-800 p-2 overflow-hidden flex flex-col">
                <div className="space-y-4 h-full flex flex-col">
                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-shrink-0">
                        {muscleGroups.map(m => (
                            <button
                                key={m}
                                onClick={() => setSelectedMuscle(m)}
                                className={cn(
                                    "px-3 py-1 text-[10px] font-press-start whitespace-nowrap border-2 transition-all",
                                    selectedMuscle === m
                                        ? "bg-secondary text-black border-secondary shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transform -translate-y-0.5"
                                        : "bg-black/40 text-gray-500 border-gray-700 hover:border-gray-500"
                                )}
                            >
                                {m === 'All' ? 'TODO' : m.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative flex-shrink-0">
                        <PixelInput
                            placeholder="🔍 Buscar técnica prohibida..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-4 border-gray-700 focus:border-secondary"
                        />
                    </div>

                    {/* List */}
                    <div className="grid grid-cols-1 gap-1 overflow-y-auto pr-2 scrollbar-hide flex-1">
                        {filteredExercises.map(ex => (
                            <div
                                key={ex.id}
                                className="transform transition-all duration-200 hover:translate-x-1"
                            >
                                <ExerciseCard
                                    exercise={ex}
                                    onAdd={() => setSelectedExercise(ex)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedExercise && (
                <ExerciseDetailsModal
                    isOpen={!!selectedExercise}
                    onClose={() => setSelectedExercise(null)}
                    exercise={selectedExercise}
                    mode="ADD" // Always ADD mode from Grimoire
                />
            )}

            <RoutineManagerModal
                isOpen={isManagerOpen}
                onClose={() => setIsManagerOpen(false)}
            />
        </div>
    );
}
