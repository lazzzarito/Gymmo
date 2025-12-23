import { Talent } from './store';

export const TALENTS: Talent[] = [
    {
        id: 'xp_boost_1',
        name: 'Aprendizaje Rápido',
        description: '+10% XP en todos los entrenamientos',
        level: 0,
        maxLevel: 1,
        type: 'xp_boost'
    },
    {
        id: 'stat_str_1',
        name: 'Fuerza Bruta',
        description: '+5 de Fuerza (STR) adicional',
        level: 0,
        maxLevel: 1,
        type: 'stat_boost'
    },
    {
        id: 'streak_shield_1',
        name: 'Escudo de Disciplina',
        description: 'Mantiene tu racha aunque faltes 1 día',
        level: 0,
        maxLevel: 1,
        type: 'streak_shield'
    },
    {
        id: 'xp_boost_2',
        name: 'Maestro de Mazmorras',
        description: '+20% XP en Mazmorras de Élite',
        level: 0,
        maxLevel: 1,
        type: 'xp_boost'
    }
];
