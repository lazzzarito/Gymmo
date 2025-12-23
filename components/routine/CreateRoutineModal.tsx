"use client";

import { useState } from "react";
import { PixelModal } from "@/components/ui/PixelModal";
import { EXERCISE_DB, MuscleGroup, Exercise } from "@/lib/exercises";
import { useGameStore } from "@/lib/store";
import { PixelButton } from "@/components/ui/PixelButton";
import { PixelInput } from "@/components/ui/PixelInput";
import { Search, Plus, Filter } from "lucide-react";

interface CreateRoutineModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateRoutineModal({ isOpen, onClose }: CreateRoutineModalProps) {
    const { addToRoutine } = useGameStore();
    const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'All'>('All');
    const [search, setSearch] = useState("");

    // Configuration State for the selected exercise to add
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [config, setConfig] = useState({ sets: 4, reps: 10, weight: 20 });

    const muscleGroups: (MuscleGroup | 'All')[] = ['All', 'Pecho', 'Espalda', 'Piernas', 'Hombros', 'Bíceps', 'Tríceps', 'Abdominales', 'Cardio'];

    const filteredExercises = EXERCISE_DB.filter(ex => {
        const matchMuscle = selectedMuscle === 'All' || ex.muscle === selectedMuscle;
        const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
        return matchMuscle && matchSearch;
    }).slice(0, 50); // Limit visible for performance

    const handleAdd = () => {
        if (selectedExercise) {
            addToRoutine(selectedExercise, {
                sets: Number(config.sets),
                reps: Number(config.reps),
                weight: Number(config.weight),
                technique: 'Normal'
            });
            setSelectedExercise(null); // Reset selection
            // We keep the main modal open to add more
        }
    };

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="PLANIFICAR BATALLA">
            {selectedExercise ? (
                // Configuration View
                <div className="space-y-4">
                    <div className="border-b-2 border-gray-700 pb-2">
                        <h3 className="font-press-start text-xs text-secondary">{selectedExercise.name}</h3>
                        <p className="text-gray-400 text-sm">{selectedExercise.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="text-xs text-gray-500 block mb-1">SETS</label>
                            <PixelInput type="number" value={config.sets} onChange={(e) => setConfig({ ...config, sets: +e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 block mb-1">REPS</label>
                            <PixelInput type="number" value={config.reps} onChange={(e) => setConfig({ ...config, reps: +e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 block mb-1">KG</label>
                            <PixelInput type="number" value={config.weight} onChange={(e) => setConfig({ ...config, weight: +e.target.value })} />
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <PixelButton variant="outline" onClick={() => setSelectedExercise(null)} className="flex-1">
                            CANCELAR
                        </PixelButton>
                        <PixelButton variant="primary" onClick={handleAdd} className="flex-1">
                            AÑADIR A RUTINA
                        </PixelButton>
                    </div>
                </div>
            ) : (
                // Browser View
                <div className="space-y-4">
                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {muscleGroups.map(m => (
                            <button
                                key={m}
                                onClick={() => setSelectedMuscle(m)}
                                className={`px-2 py-1 text-[10px] whitespace-nowrap border border-gray-600 ${selectedMuscle === m ? 'bg-primary text-black' : 'bg-transparent text-gray-400'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
                        <PixelInput
                            placeholder="Buscar técnica..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="h-[40vh] overflow-y-auto space-y-2 border-t-2 border-dashed border-gray-800 pt-2">
                        {filteredExercises.map(ex => (
                            <div key={ex.id} className="flex justify-between items-center p-2 hover:bg-white/5 border border-transparent hover:border-white/20 cursor-pointer" onClick={() => setSelectedExercise(ex)}>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{ex.icon}</span>
                                    <div>
                                        <div className="text-sm leading-none">{ex.name}</div>
                                        <div className="text-[10px] text-gray-500">{ex.difficulty} • {ex.muscle}</div>
                                    </div>
                                </div>
                                <Plus className="w-4 h-4 text-primary" />
                            </div>
                        ))}
                    </div>

                    <PixelButton onClick={onClose} className="w-full" variant="secondary">
                        FINALIZAR PLANIFICACIÓN
                    </PixelButton>
                </div>
            )}
        </PixelModal>
    );
}
