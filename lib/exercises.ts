
export type MuscleGroup = 'Pecho' | 'Espalda' | 'Piernas' | 'Hombros' | 'Bíceps' | 'Tríceps' | 'Abdominales' | 'Cardio';
export type ExerciseType = 'Fuerza' | 'Cardio' | 'Flexibilidad' | 'Potencia';
export type Difficulty = 'Novato' | 'Intermedio' | 'Pro' | 'Deidad';

export interface Exercise {
    id: string;
    name: string;
    description: string;
    muscle: MuscleGroup;
    type: ExerciseType;
    difficulty: Difficulty;
    xpReward: number;
    icon: string;
    tags: string[]; // e.g. "Compound", "Isolation", "Machine", "Dumbbell"
}

// Helper to generate exercises
const generateExercises = (): Exercise[] => {
    const exercises: Exercise[] = [];

    const muscles: Record<MuscleGroup, { base: string[], icons: string[] }> = {
        'Pecho': { base: ['Press Banca', 'Aperturas', 'Flexiones', 'Press Inclinado', 'Cruce de Poleas', 'Pullover', 'Fondos'], icons: ['🏋️', '🤸'] },
        'Espalda': { base: ['Dominadas', 'Remo con Barra', 'Jalón al Pecho', 'Remo Gironda', 'Peso Muerto', 'Pull Face', 'Remo Unilateral'], icons: ['🏋️', '🧗'] },
        'Piernas': { base: ['Sentadilla', 'Prensa', 'Zancadas', 'Extensión de Cuádriceps', 'Curl Femoral', 'Elevación de Gemelos', 'Hip Thrust', 'Sentadilla Búlgara'], icons: ['🦵', '🏃'] },
        'Hombros': { base: ['Press Militar', 'Elevaciones Laterales', 'Pájaros', 'Press Arnold', 'Elevaciones Frontales', 'Remo al Mentón'], icons: ['🤷', '🏋️'] },
        'Bíceps': { base: ['Curl con Barra', 'Curl Martillo', 'Curl Predicador', 'Curl Concentrado', 'Curl 21', 'Dominadas Supinas'], icons: ['💪', '🏋️'] },
        'Tríceps': { base: ['Press Francés', 'Extensión de Polea', 'Fondos', 'Patada de Tríceps', 'Rompecráneos', 'Extensión sobre a Cabeza'], icons: ['💪', '🏋️'] },
        'Abdominales': { base: ['Crunch', 'Plancha', 'Elevación de Piernas', 'Rueda Abdominal', 'Russian Twist', 'V-Ups'], icons: ['🍫', '🤸'] },
        'Cardio': { base: ['Correr', 'Bicicleta', 'Elíptica', 'Remo', 'Comba', 'Burpees', 'Jumping Jacks'], icons: ['🏃', '❤️'] }
    };

    const variants = [
        { suffix: '', diff: 'Novato', xp: 10, tags: ['Standard'] },
        { suffix: 'con Mancuernas', diff: 'Novato', xp: 12, tags: ['Dumbbell'] },
        { suffix: 'con Barra', diff: 'Intermedio', xp: 15, tags: ['Barbell'] },
        { suffix: 'en Máquina', diff: 'Novato', xp: 10, tags: ['Machine', 'Isolation'] },
        { suffix: 'con Cable', diff: 'Intermedio', xp: 14, tags: ['Cable', 'Isolation'] },
        { suffix: 'Unilateral', diff: 'Intermedio', xp: 18, tags: ['Unilateral', 'Stabilization'] },
        { suffix: 'Explosivo', diff: 'Pro', xp: 20, tags: ['Power'] },
        { suffix: 'Pausa 3s', diff: 'Pro', xp: 22, tags: ['TimeUnderTension'] },
        { suffix: 'Tempo Lento', diff: 'Pro', xp: 22, tags: ['TimeUnderTension'] },
        { suffix: 'Dropset', diff: 'Deidad', xp: 30, tags: ['Hypertrophy', 'Intensity'] },
        { suffix: 'Supeserie', diff: 'Deidad', xp: 35, tags: ['Hypertrophy', 'Intensity'] },
        { suffix: 'Fallo Técnico', diff: 'Deidad', xp: 40, tags: ['Intensity'] }
    ];

    let idCounter = 1;

    Object.entries(muscles).forEach(([muscle, data]) => {
        data.base.forEach((baseName) => {
            variants.forEach((variant) => {
                // Not all combinations make sense (e.g. Cardio + Barbell), simple filter
                if (muscle === 'Cardio' && (variant.tags.includes('Barbell') || variant.tags.includes('Dumbbell'))) return;

                exercises.push({
                    id: `ex_${idCounter++}`,
                    name: `${baseName} ${variant.suffix}`.trim(),
                    description: `Variante ${variant.diff} de ${baseName}. Enfoca ${muscle}.`,
                    muscle: muscle as MuscleGroup,
                    type: muscle === 'Cardio' ? 'Cardio' : 'Fuerza',
                    difficulty: variant.diff as Difficulty,
                    xpReward: variant.xp,
                    icon: data.icons[Math.floor(Math.random() * data.icons.length)],
                    tags: [...variant.tags, muscle]
                });
            });
        });
    });

    // Add some specific compound combos manually for high levels
    const specialCombos = [
        { name: "Curl Predicador + Curl Martillo", muscle: "Bíceps", desc: "Super serie mortal para brazos." },
        { name: "Sentadilla Pesada + Salto al Cajón", muscle: "Piernas", desc: "Potenciación post-activación." },
        { name: "Press Banca + Flexiones Plyo", muscle: "Pecho", desc: "Destrucción pectoral." },
        { name: "Peso Muerto + Clean & Jerk", muscle: "Espalda", desc: "Poder total." }
    ];

    specialCombos.forEach((c) => {
        exercises.push({
            id: `ex_${idCounter++}`,
            name: c.name,
            description: c.desc,
            muscle: c.muscle as MuscleGroup,
            type: "Fuerza",
            difficulty: "Deidad",
            xpReward: 50,
            icon: "🔥",
            tags: ["Compound", "Superset", "Pro"]
        });
    });

    return exercises;
};

export const EXERCISE_DB = generateExercises();
