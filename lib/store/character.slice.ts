import { StateCreator } from 'zustand';
import type { UserState, CharacterSlice } from './types';

export const createCharacterSlice: StateCreator<UserState, [], [], CharacterSlice> = (set, get) => ({
    name: 'Héroe',
    gender: '' as 'male' | 'female' | '',
    age: 0,
    weight: 0,
    height: 0,
    class: 'Novato' as 'Novato' | 'Intermedio' | 'Pro' | '',
    level: 1,
    xp: 0,
    maxXp: 1000,
    stats: { str: 10, sta: 10, will: 10 },
    streak: 0,
    skillPoints: 0,
    talents: [],

    updateProfile: (data) => set((state) => ({ ...state, ...data })),

    addXp: (amount) => {
        const state = get();
        const newXp = state.xp + amount;

        if (newXp >= state.maxXp) {
            set({
                xp: newXp - state.maxXp,
                level: state.level + 1,
                maxXp: Math.floor(state.maxXp * 1.2),
                stats: {
                    str: state.stats.str + 2,
                    sta: state.stats.sta + 2,
                    will: state.stats.will + 2,
                },
                skillPoints: state.skillPoints + 1,
            });
        } else {
            set({ xp: newXp });
        }

        get().checkAchievements();
    },

    checkStreak: () => {
        const { lastLogin } = get();
        const today = new Date().toISOString().split('T')[0];
        if (lastLogin === today) return;

        if (lastLogin) {
            const lastDate = new Date(lastLogin);
            const diffDays = Math.floor((new Date(today).getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
            if (diffDays === 1) {
                set({ streak: get().streak + 1, lastLogin: today });
            } else if (diffDays > 1) {
                set({ streak: 1, lastLogin: today });
            }
        } else {
            set({ streak: 1, lastLogin: today });
        }
    },

    unlockTalent: (talentId) => set((state) => {
        if (state.skillPoints <= 0) return state;
        if (state.talents.some(t => t.id === talentId)) return state;
        const talent = state.talents.find(t => t.id === talentId);
        if (talent && talent.level >= talent.maxLevel) return state;
        return {
            skillPoints: state.skillPoints - 1,
            talents: state.talents.map(t =>
                t.id === talentId ? { ...t, level: t.level + 1 } : t
            ),
        };
    }),
});
