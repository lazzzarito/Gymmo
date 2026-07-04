"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGameStore } from "@/lib/store";
import type { RoutineItem } from "@/lib/store";

export function useWorkoutSession(routine: RoutineItem[]) {
    const { addXp, logActivity } = useGameStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completedSets, setCompletedSets] = useState<Record<string, number>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [restSeconds, setRestSeconds] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const restIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (routine.length === 0) return;
        if (isResting) {
            if (restIntervalRef.current) clearInterval(restIntervalRef.current);
            restIntervalRef.current = setInterval(() => {
                setRestSeconds(s => {
                    if (s <= 1) {
                        setIsResting(false);
                        return 0;
                    }
                    return s - 1;
                });
            }, 1000);
        }
        return () => {
            if (restIntervalRef.current) clearInterval(restIntervalRef.current);
        };
    }, [isResting, routine.length]);

    useEffect(() => {
        if (isFinished || isResting || routine.length === 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isFinished, isResting, routine.length]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSeconds(0);
    }, [currentIndex]);

    const currentExercise = routine[currentIndex];
    const currentSetsDone = completedSets[currentExercise?.instanceId || ''] || 0;

    const handleCompleteSet = useCallback(() => {
        if (!currentExercise) return;
        const newCount = currentSetsDone + 1;
        setCompletedSets(prev => ({ ...prev, [currentExercise.instanceId]: newCount }));

        if (newCount < currentExercise.config.sets) {
            setRestSeconds(currentExercise.config.restTime || 60);
            setIsResting(true);
        }
    }, [currentExercise, currentSetsDone]);

    const skipRest = useCallback(() => {
        setIsResting(false);
        setRestSeconds(0);
    }, []);

    const finishWorkout = useCallback(() => {
        setIsFinished(true);
        const totalXp = routine.reduce((acc, ex) => acc + ex.xpReward, 0);
        addXp(totalXp);
        logActivity({
            type: 'workout',
            title: `Dungeon Run: ${routine[0]?.muscle || 'Entrenamiento'}`,
            xpEarned: totalXp,
        });
    }, [routine, addXp, logActivity]);

    const handleNext = useCallback(() => {
        if (currentIndex < routine.length - 1) {
            setCurrentIndex(i => i + 1);
        } else {
            finishWorkout();
        }
    }, [currentIndex, routine.length, finishWorkout]);

    const addRestTime = useCallback((seconds: number) => {
        setRestSeconds(s => s + seconds);
    }, []);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        currentIndex,
        currentExercise,
        currentSetsDone,
        isFinished,
        seconds,
        isResting,
        restSeconds,
        completedSets,
        handleCompleteSet,
        skipRest,
        handleNext,
        finishWorkout,
        addRestTime,
        formatTime,
        totalExercises: routine.length,
    };
}
