import { StateCreator } from 'zustand';
import type { UserState, SettingsSlice } from './types';

export const createSettingsSlice: StateCreator<UserState, [], [], SettingsSlice> = (set) => ({
    soundEnabled: true,

    setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

    logout: () => {
        localStorage.removeItem('gymmo-storage');
        window.location.href = '/';
    },

    hardReset: () => {
        localStorage.removeItem('gymmo-storage');
        window.location.href = '/';
    },
});
