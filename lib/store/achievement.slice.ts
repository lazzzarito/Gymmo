import { StateCreator } from 'zustand';
import type { UserState, AchievementSlice } from './types';
import { ACHIEVEMENTS } from '@/lib/achievements';

export const createAchievementSlice: StateCreator<UserState, [], [], AchievementSlice> = (set, get) => ({
    activityHistory: [],
    bossKills: [],
    weightHistory: [],
    unlockedAchievementIds: [],

    logActivity: (activity) => {
        const exercisesSnapshot = [...get().activeRoutine];
        set((state) => ({
            activityHistory: [
                {
                    ...activity,
                    id: crypto.randomUUID(),
                    date: new Date().toISOString(),
                    exercises: exercisesSnapshot,
                },
                ...state.activityHistory,
            ],
        }));
        get().checkAchievements();
    },

    updateWeight: (newWeight) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const updatedHistory = [...state.weightHistory];
        const existingIndex = updatedHistory.findIndex(r => r.date === today);

        if (existingIndex !== -1) {
            updatedHistory[existingIndex].weight = newWeight;
        } else {
            updatedHistory.push({ date: today, weight: newWeight });
        }

        return {
            weight: newWeight,
            weightHistory: updatedHistory,
        };
    }),

    checkAchievements: () => {
        const state = get();
        const { activityHistory, level, stats, unlockedAchievementIds } = state;
        const newUnlocks = [...unlockedAchievementIds];
        let changed = false;

        const workoutCount = activityHistory.filter(a => a.type === 'workout').length;
        const questCount = activityHistory.filter(a => a.type === 'quest').length;

        ACHIEVEMENTS.forEach(ach => {
            if (newUnlocks.includes(ach.id)) return;

            let achieved = false;
            switch (ach.requirementType) {
                case 'workout_count': achieved = workoutCount >= ach.requirementValue; break;
                case 'quest_count': achieved = questCount >= ach.requirementValue; break;
                case 'level': achieved = level >= ach.requirementValue; break;
                case 'stat_str': achieved = stats.str >= ach.requirementValue; break;
                case 'stat_sta': achieved = stats.sta >= ach.requirementValue; break;
                case 'stat_will': achieved = stats.will >= ach.requirementValue; break;
            }

            if (achieved) {
                newUnlocks.push(ach.id);
                changed = true;
            }
        });

        if (changed) {
            set({ unlockedAchievementIds: newUnlocks });
        }
    },
});
