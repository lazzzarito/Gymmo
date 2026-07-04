import { StateCreator } from 'zustand';
import type { UserState, HydrationSlice } from './types';

export const createHydrationSlice: StateCreator<UserState, [], [], HydrationSlice> = (set) => ({
    dailyHydration: { water: 0, protein: 0, date: '' },

    updateHydration: (type, change) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const current = state.dailyHydration?.date === today
            ? state.dailyHydration
            : { water: 0, protein: 0, date: today };
        return {
            dailyHydration: {
                ...current,
                [type]: Math.max(0, current[type] + change),
                date: today,
            },
        };
    }),
});
