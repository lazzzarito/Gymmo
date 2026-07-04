import { StateCreator } from 'zustand';
import type { UserState, SocialSlice } from './types';
import { Guild, MOCK_GUILDS } from '@/lib/social';

export const createSocialSlice: StateCreator<UserState, [], [], SocialSlice> = (set) => ({
    friends: [],
    guilds: [],
    activeGuildId: null,
    socialMessages: [],

    addFriend: (friend) => set((state) => ({
        friends: [...state.friends.filter(f => f.id !== friend.id), friend],
    })),

    removeFriend: (id) => set((state) => ({
        friends: state.friends.filter(f => f.id !== id),
        socialMessages: state.socialMessages.filter(m => m.senderId !== id),
    })),

    joinGuild: (id) => set((state) => {
        const guild = [...state.guilds, ...MOCK_GUILDS].find(g => g.id === id);
        if (guild && state.level >= guild.requiredLevel) {
            return { activeGuildId: id };
        }
        return state;
    }),

    createGuild: (newGuild) => set((state) => {
        if (state.level < 50) return state;
        if (state.guilds.some(g => g.name.toLowerCase() === newGuild.name.toLowerCase())) return state;
        const guild: Guild = {
            ...newGuild,
            id: crypto.randomUUID(),
            totalPower: 0,
            members: [{
                id: 'me',
                name: state.name,
                level: state.level,
                heroClass: state.class,
                lastActive: new Date().toISOString(),
                hasAura: state.streak >= 7,
                isOnline: true,
                role: 'leader' as const,
                contribution: 0,
            }],
        };
        return {
            guilds: [...state.guilds, guild],
            activeGuildId: guild.id,
        };
    }),

    sendSocialMessage: (msg) => set((state) => ({
        socialMessages: [
            ...state.socialMessages,
            {
                ...msg,
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
            },
        ],
    })),

    clearSocialMessages: (targetId) => set((state) => ({
        socialMessages: state.socialMessages.filter(m => m.senderId !== targetId),
    })),
});
