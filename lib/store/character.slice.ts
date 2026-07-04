import { StateCreator } from 'zustand';
import type { UserState, CharacterSlice, Talent } from './types';
import { TALENTS } from '@/lib/talents';

const DEFAULT_TALENT: Omit<Talent, 'id'> = { name: '', description: '', level: 1, maxLevel: 1, type: 'xp_boost' };

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
        let state = get();
        let remaining = state.xp + amount;

        while (remaining >= state.maxXp) {
            remaining -= state.maxXp;
            state = {
                ...state,
                xp: remaining,
                level: state.level + 1,
                maxXp: Math.floor(state.maxXp * 1.2),
                stats: {
                    str: state.stats.str + 2,
                    sta: state.stats.sta + 2,
                    will: state.stats.will + 2,
                },
                skillPoints: state.skillPoints + 1,
            };
            set(state);
            get().checkAchievements();
        }

        if (remaining !== state.xp) {
            set({ xp: remaining });
        }
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
        const existing = state.talents.find(t => t.id === talentId);
        if (existing) {
            if (existing.level >= existing.maxLevel) return state;
            return {
                skillPoints: state.skillPoints - 1,
                talents: state.talents.map(t =>
                    t.id === talentId ? { ...t, level: t.level + 1 } : t
                ),
            };
        }
        const talentDef = TALENTS.find(t => t.id === talentId);
        return {
            skillPoints: state.skillPoints - 1,
            talents: [...state.talents, talentDef ? { ...talentDef, level: 1 } : { id: talentId, ...DEFAULT_TALENT }],
        };
    }),
});
