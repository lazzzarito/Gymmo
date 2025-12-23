export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    requirementType: 'workout_count' | 'quest_count' | 'level' | 'stat_str' | 'stat_will' | 'stat_sta';
    requirementValue: number;
    tier: 'Beginner' | 'Intermediate' | 'Expert';
}

export const ACHIEVEMENTS: Achievement[] = [
    // --- TIER: BEGINNER (12 items) ---
    { id: 'wood_1', title: 'Escudo de Madera', description: '1 Entrenamiento', icon: '🛡️', requirementType: 'workout_count', requirementValue: 1, tier: 'Beginner' },
    { id: 'wood_2', title: 'Daga de Práctica', description: '1 Misión', icon: '🗡️', requirementType: 'quest_count', requirementValue: 1, tier: 'Beginner' },
    { id: 'wood_3', title: 'Botas de Tela', description: 'Nivel 2', icon: '🥾', requirementType: 'level', requirementValue: 2, tier: 'Beginner' },
    { id: 'wood_4', title: 'Amuleto de Suerte', description: '5 Voluntad', icon: '🧿', requirementType: 'stat_will', requirementValue: 5, tier: 'Beginner' },
    { id: 'wood_5', title: 'Venda de Guerrero', description: '5 Fuerza', icon: '🩹', requirementType: 'stat_str', requirementValue: 5, tier: 'Beginner' },
    { id: 'wood_6', title: 'Poción Menor', description: '5 Estamina', icon: '🧪', requirementType: 'stat_sta', requirementValue: 5, tier: 'Beginner' },
    { id: 'wood_7', title: 'Cinto de Cuero', description: '5 Entrenamientos', icon: 'ベルト', requirementType: 'workout_count', requirementValue: 5, tier: 'Beginner' },
    { id: 'wood_8', title: 'Gorra de Viajero', description: '5 Misiones', icon: '🧢', requirementType: 'quest_count', requirementValue: 5, tier: 'Beginner' },
    { id: 'wood_9', title: 'Anillo de Cobre', description: 'Nivel 8', icon: '💍', requirementType: 'level', requirementValue: 8, tier: 'Beginner' },
    { id: 'wood_10', title: 'Guantes de Piel', description: '10 Fuerza', icon: '🧤', requirementType: 'stat_str', requirementValue: 10, tier: 'Beginner' },
    { id: 'wood_11', title: 'Antorcha', description: '10 Voluntad', icon: '🕯️', requirementType: 'stat_will', requirementValue: 10, tier: 'Beginner' },
    { id: 'wood_12', title: 'Mochila Vieja', description: '10 Estamina', icon: '🎒', requirementType: 'stat_sta', requirementValue: 10, tier: 'Beginner' },

    // --- TIER: INTERMEDIATE (12 items) ---
    { id: 'iron_1', title: 'Escudo de Hierro', description: '15 Entrenamientos', icon: '🛡️', requirementType: 'workout_count', requirementValue: 15, tier: 'Intermediate' },
    { id: 'iron_2', title: 'Espada de Acero', description: '15 Misiones', icon: '⚔️', requirementType: 'quest_count', requirementValue: 15, tier: 'Intermediate' },
    { id: 'iron_3', title: 'Botas de Placas', description: 'Nivel 15', icon: '👢', requirementType: 'level', requirementValue: 15, tier: 'Intermediate' },
    { id: 'iron_4', title: 'Capa de Viajero', description: '20 Voluntad', icon: '🧥', requirementType: 'stat_will', requirementValue: 20, tier: 'Intermediate' },
    { id: 'iron_5', title: 'Maza Pesada', description: '20 Fuerza', icon: '🔨', requirementType: 'stat_str', requirementValue: 20, tier: 'Intermediate' },
    { id: 'iron_6', title: 'Bebida de Energía', description: '20 Estamina', icon: '🥤', requirementType: 'stat_sta', requirementValue: 20, tier: 'Intermediate' },
    { id: 'iron_7', title: 'Lanza de Soldado', description: '30 Entrenamientos', icon: '🔱', requirementType: 'workout_count', requirementValue: 30, tier: 'Intermediate' },
    { id: 'iron_8', title: 'Estandarte Real', description: '30 Misiones', icon: '🚩', requirementType: 'quest_count', requirementValue: 30, tier: 'Intermediate' },
    { id: 'iron_9', title: 'Yelmo de Acero', description: 'Nivel 25', icon: '⛑️', requirementType: 'level', requirementValue: 25, tier: 'Intermediate' },
    { id: 'iron_10', title: 'Guanteletes Rúnicos', description: '30 Fuerza', icon: '🥊', requirementType: 'stat_str', requirementValue: 30, tier: 'Intermediate' },
    { id: 'iron_11', title: 'Grimorio Básico', description: '30 Voluntad', icon: '📖', requirementType: 'stat_will', requirementValue: 30, tier: 'Intermediate' },
    { id: 'iron_12', title: 'Tabardo Guerrero', description: '30 Estamina', icon: '🥋', requirementType: 'stat_sta', requirementValue: 30, tier: 'Intermediate' },

    // --- TIER: EXPERT (12 items) ---
    { id: 'gold_1', title: 'Aegis Divino', description: '50 Entrenamientos', icon: '🔱', requirementType: 'workout_count', requirementValue: 50, tier: 'Expert' },
    { id: 'gold_2', title: 'Excalibur', description: '50 Misiones', icon: '🗡️✨', requirementType: 'quest_count', requirementValue: 50, tier: 'Expert' },
    { id: 'gold_3', title: 'Botas de Hermes', description: 'Nivel 40', icon: '💸', requirementType: 'level', requirementValue: 40, tier: 'Expert' },
    { id: 'gold_4', title: 'Ojo de la Verdad', description: '50 Voluntad', icon: '👁️', requirementType: 'stat_will', requirementValue: 50, tier: 'Expert' },
    { id: 'gold_5', title: 'Martillo de Thor', description: '50 Fuerza', icon: '⚡', requirementType: 'stat_str', requirementValue: 50, tier: 'Expert' },
    { id: 'gold_6', title: 'Ambrosía Estelar', description: '50 Estamina', icon: '🍶', requirementType: 'stat_sta', requirementValue: 50, tier: 'Expert' },
    { id: 'gold_7', title: 'Armadura Fénix', description: '100 Entrenamientos', icon: '🔥', requirementType: 'workout_count', requirementValue: 100, tier: 'Expert' },
    { id: 'gold_8', title: 'Cetro de Mago', description: '100 Misiones', icon: '🪄', requirementType: 'quest_count', requirementValue: 100, tier: 'Expert' },
    { id: 'gold_9', title: 'Corona de Zeus', description: 'Nivel 60', icon: '👑', requirementType: 'level', requirementValue: 60, tier: 'Expert' },
    { id: 'gold_10', title: 'Puño de Titán', description: '80 Fuerza', icon: '👊', requirementType: 'stat_str', requirementValue: 80, tier: 'Expert' },
    { id: 'gold_11', title: 'Capa de Invisibilidad', description: '80 Voluntad', icon: '🌫️', requirementType: 'stat_will', requirementValue: 80, tier: 'Expert' },
    { id: 'gold_12', title: 'Corazón de Dragón', description: '80 Estamina', icon: '❤️‍🔥', requirementType: 'stat_sta', requirementValue: 80, tier: 'Expert' }
];
