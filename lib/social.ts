export interface Friend {
    id: string;
    name: string;
    level: number;
    heroClass: string;
    lastActive: string;
    hasAura: boolean;
    isOnline: boolean;
    avatarSeed?: string;
}

export interface SocialUser {
    id: string;
    displayName: string;
    class: string;
    level: number;
    avatarSeed: string;
    isOnline: boolean;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    type: 'text' | 'image' | 'routine';
}

export interface ChatThread {
    id: string;
    participants: SocialUser[];
    lastMessage: ChatMessage;
    unreadCount: number;
}

export interface GuildMember extends Friend {
    role: 'leader' | 'officer' | 'member';
    contribution: number; // Volume contributed this week
}

export interface Guild {
    id: string;
    name: string;
    description: string;
    emblem: string; // Emoji-based emblem
    members: GuildMember[];
    totalPower: number; // Sum of current week volume
    requiredLevel: number;
}

export interface Message {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    type: 'text' | 'routine_share';
    routineId?: string; // Optional link to a routine
}

export interface GuildExpedition {
    id: string;
    bossName: string;
    totalHealth: number;
    currentHealth: number;
    rewards: { xp: number; achievementId?: string };
    endsAt: string;
}

// Mock initial data for demonstration
export const MOCK_FRIENDS: Friend[] = [
    { id: 'f1', name: 'Arturo_Fit', level: 12, heroClass: 'Warrior', lastActive: new Date().toISOString(), hasAura: true, isOnline: true, avatarSeed: 'Arturo' },
    { id: 'f2', name: 'Elena_Swift', level: 8, heroClass: 'Rogue', lastActive: new Date().toISOString(), hasAura: false, isOnline: false, avatarSeed: 'Elena' },
    { id: 'f3', name: 'HeavyStriker', level: 25, heroClass: 'Paladin', lastActive: new Date().toISOString(), hasAura: true, isOnline: true, avatarSeed: 'Heavy' },
];

export const MOCK_USERS: SocialUser[] = MOCK_FRIENDS.map(f => ({
    id: f.id,
    displayName: f.name,
    class: f.heroClass,
    level: f.level,
    avatarSeed: f.avatarSeed || f.name,
    isOnline: f.isOnline
}));

export const MOCK_CHATS: ChatThread[] = [
    {
        id: 'c1',
        participants: [MOCK_USERS[0]],
        lastMessage: { id: 'm1', senderId: 'f1', content: '¿Vienes a la mazmorra de hoy?', timestamp: '10:45', type: 'text' },
        unreadCount: 1
    },
    {
        id: 'c2',
        participants: [MOCK_USERS[1]],
        lastMessage: { id: 'm2', senderId: 'me', content: '¡Nueva PR conseguida!', timestamp: 'Ayer', type: 'text' },
        unreadCount: 0
    }
];

export const MOCK_GUILDS: Guild[] = [
    {
        id: 'g1',
        name: 'Los Titanes del Hierro',
        description: 'Buscamos la fuerza absoluta. Solo los más constantes.',
        emblem: '⚒️',
        members: [
            { id: 'f1', name: 'Arturo_Fit', level: 12, heroClass: 'Warrior', lastActive: '', hasAura: true, isOnline: true, role: 'leader', contribution: 15000 },
        ],
        totalPower: 45000,
        requiredLevel: 5
    }
];
