import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserState } from './types';
import { createCharacterSlice } from './character.slice';
import { createRoutineSlice } from './routine.slice';
import { createSocialSlice } from './social.slice';
import { createAchievementSlice } from './achievement.slice';
import { createHydrationSlice } from './hydration.slice';
import { createSettingsSlice } from './settings.slice';
import { createModalSlice } from './modal.slice';

export const useGameStore = create<UserState>()(
    persist(
        (...a) => ({
            ...createCharacterSlice(...a),
            ...createRoutineSlice(...a),
            ...createSocialSlice(...a),
            ...createAchievementSlice(...a),
            ...createHydrationSlice(...a),
            ...createSettingsSlice(...a),
            ...createModalSlice(...a),
        }),
        {
            name: 'gymmo-storage',
            partialize: (state) => {
                const { ...rest } = state;
                return rest;
            },
        }
    )
);

export type {
    UserState,
    CharacterStats,
    DailyQuest,
    Talent,
    RoutineConfig,
    RoutineItem,
    Routine,
    ActivityLog,
    WeightRecord,
    DaySchedule,
    WeeklyPlan,
    CharacterSlice,
    RoutineSlice,
    SocialSlice,
    AchievementSlice,
    HydrationSlice,
    SettingsSlice,
    ModalSlice,
} from './types';
