import { StateCreator } from 'zustand';
import type { UserState, RoutineSlice, RoutineConfig } from './types';

export const createRoutineSlice: StateCreator<UserState, [], [], RoutineSlice> = (set) => ({
    dailyQuest: null,
    activeRoutine: [],
    weeklyPlan: {},

    addToRoutine: (ex, config) => set((state) => ({
        activeRoutine: [
            ...state.activeRoutine,
            {
                ...ex,
                instanceId: crypto.randomUUID(),
                config: {
                    sets: 3,
                    reps: 12,
                    weight: 0,
                    restTime: 120,
                    technique: 'Normal' as RoutineConfig['technique'],
                    ...config,
                },
            },
        ],
    })),

    removeFromRoutine: (id) => set((state) => ({
        activeRoutine: state.activeRoutine.filter(item => item.instanceId !== id),
    })),

    updateRoutineItem: (instanceId, config) => set((state) => ({
        activeRoutine: state.activeRoutine.map(item =>
            item.instanceId === instanceId ? { ...item, config: { ...item.config, ...config } } : item
        ),
    })),

    reorderRoutine: (newRoutine) => set({ activeRoutine: newRoutine }),

    updateWeeklyPlan: (plan) => set({ weeklyPlan: plan }),

    setRoutine: (routine) => set({ activeRoutine: routine }),

    setDailyQuest: (quest) => set({ dailyQuest: quest }),
});
