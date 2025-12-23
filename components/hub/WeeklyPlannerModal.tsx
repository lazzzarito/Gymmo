"use client";

import { PixelModal } from "@/components/ui/PixelModal";
import { PixelButton } from "@/components/ui/PixelButton";
import { useGameStore, WeeklyPlan, DaySchedule } from "@/lib/store";
import { useState } from "react";
import { MuscleGroup } from "@/lib/exercises";
import { cn } from "@/lib/utils";

interface WeeklyPlannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MUSCLE_OPTIONS: MuscleGroup[] = ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Bíceps', 'Tríceps', 'Abdominales', 'Cardio'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_LABELS: Record<string, string> = { 'Mon': 'Lunes', 'Tue': 'Martes', 'Wed': 'Mié', 'Thu': 'Jue', 'Fri': 'Vie', 'Sat': 'Sáb', 'Sun': 'Dom' };

export function WeeklyPlannerModal({ isOpen, onClose }: WeeklyPlannerModalProps) {
    const { weeklyPlan, updateWeeklyPlan } = useGameStore();

    // Defensive merge: Ensure all days exist even if store data is old
    const defaultPlan: WeeklyPlan = {};
    DAYS.forEach(day => {
        defaultPlan[day] = { muscles: [], time: '18:00', mode: 'solo', isActive: false };
    });

    // Merge defaults with existing plan
    const initialPlan = { ...defaultPlan, ...weeklyPlan };

    const [tempPlan, setTempPlan] = useState<WeeklyPlan>(initialPlan);
    const [selectedDay, setSelectedDay] = useState<string>('Mon');

    const handleToggleMuscle = (muscle: MuscleGroup) => {
        const currentDay = tempPlan[selectedDay];
        const isSelected = currentDay.muscles.includes(muscle);

        let newMuscles = isSelected
            ? currentDay.muscles.filter(m => m !== muscle)
            : [...currentDay.muscles, muscle];

        setTempPlan({
            ...tempPlan,
            [selectedDay]: {
                ...currentDay,
                muscles: newMuscles,
                isActive: newMuscles.length > 0
            }
        });
    };

    const handleSave = () => {
        updateWeeklyPlan(tempPlan);
        onClose();
    };

    const currentSchedule = tempPlan[selectedDay] || { muscles: [], time: '18:00', mode: 'solo', isActive: false };

    return (
        <PixelModal isOpen={isOpen} onClose={onClose} title="PLANIFY (WEEKLY)">
            <div className="space-y-6">

                {/* Day Selector */}
                <div className="flex justify-between bg-black/30 p-2 rounded">
                    {DAYS.map(day => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={cn(
                                "flex flex-col items-center p-2 border-2 transition-all w-10 h-14 justify-center",
                                selectedDay === day ? "border-white bg-primary text-black translate-y-[-4px]" : "border-transparent text-gray-400 hover:text-white",
                                tempPlan[day]?.isActive && selectedDay !== day ? "border-primary/50 text-white" : ""
                            )}
                        >
                            <span className="font-press-start text-[8px]">{day.charAt(0)}</span>
                            {tempPlan[day]?.isActive && <div className="w-1.5 h-1.5 bg-green-400 mt-1" />}
                        </button>
                    ))}
                </div>

                {/* Editor for Selected Day */}
                <div className="bg-gray-900 border-2 border-gray-700 p-4 rounded space-y-4">
                    <div className="flex justify-between items-center text-primary font-press-start text-xs border-b border-gray-700 pb-2">
                        <span>{DAY_LABELS[selectedDay]}</span>
                        <span>{currentSchedule.isActive ? "ENTRENAMIENTO" : "DESCANSO"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {MUSCLE_OPTIONS.map(muscle => (
                            <button
                                key={muscle}
                                onClick={() => handleToggleMuscle(muscle)}
                                className={cn(
                                    "text-left p-2 text-xs font-vt323 border hover:bg-white/5 transition-colors",
                                    currentSchedule.muscles.includes(muscle)
                                        ? "border-secondary text-secondary bg-secondary/10"
                                        : "border-gray-800 text-gray-500"
                                )}
                            >
                                {currentSchedule.muscles.includes(muscle) ? "[x] " : "[ ] "}
                                {muscle}
                            </button>
                        ))}
                    </div>

                    <div className="pt-2 border-t border-gray-700 font-vt323 text-gray-400 text-sm flex justify-between">
                        <label>Hora: <input type="time" className="bg-transparent border-b border-gray-500 text-white" defaultValue={currentSchedule.time} /></label>
                        <span>Mode: {currentSchedule.mode.toUpperCase()}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <PixelButton onClick={handleSave} className="w-full">
                        GUARDAR PLAN
                    </PixelButton>
                </div>
            </div>
        </PixelModal>
    );
}
