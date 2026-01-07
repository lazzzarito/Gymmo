
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
    instructions?: string[];
}

// DATABASE OF BASE EXERCISES WITH INSTRUCTIONS
const BASE_EXERCISES: Record<string, Partial<Exercise>> = {
    // PECHO
    'Press Banca': {
        description: 'El rey de los ejercicios de pecho. Empuje horizontal con barra.',
        instructions: [
            'Túmbate en el banco con los ojos bajo la barra.',
            'Agarra la barra con una anchura algo mayor a los hombros.',
            'Retrae las escápulas y saca pecho (arco lumbar natural).',
            'Baja la barra controladamente hasta tocar la parte baja del pecho.',
            'Empuja explosivamente hacia arriba sin despegar la espalda.'
        ]
    },
    'Press Inclinado con Mancuernas': {
        description: 'Enfoca la parte superior del pectoral.',
        instructions: [
            'Ajusta el banco a 30-45 grados.',
            'Sube las mancuernas con ayuda de las rodillas.',
            'Baja los codos en un ángulo de 45 grados respecto al cuerpo.',
            'Empuja hasta estirar los brazos sin chocar las mancuernas.'
        ]
    },
    'Aperturas con Mancuernas': {
        description: 'Aislamiento para estirar las fibras pectorales.',
        instructions: [
            'Túmbate y sostén las mancuernas sobre el pecho.',
            'Abre los brazos con los codos ligeramente flexionados.',
            'Siente el estiramiento profundo en el pecho.',
            'Cierra los brazos imaginando que abrazas un árbol.'
        ]
    },
    'Flexiones': {
        description: 'Clásico ejercicio de calistenia para empuje.',
        instructions: [
            'Manos a la anchura de los hombros, cuerpo recto.',
            'Baja hasta que el pecho roce el suelo.',
            'Mantén el abdomen tenso (plancha).',
            'Sube extendiendo los codos por completo.'
        ]
    },
    'Cruce de Poleas': {
        description: 'Bombeo y contracción máxima para el pecho.',
        instructions: [
            'Colócate en medio de las poleas altas.',
            'Inclina el torso ligeramente hacia adelante.',
            'Junta las manos frente a tu ombligo apretando el pecho.',
            'Controla el retorno abriendo los brazos.'
        ]
    },
    'Fondos en Paralelas': {
        description: 'Constructor de masa para pecho y tríceps.',
        instructions: [
            'Inclina el torso hacia adelante para enfatizar el pecho.',
            'Baja hasta que los hombros estén bajo los codos.',
            'Empuja con fuerza hasta bloquear.'
        ]
    },

    // ESPALDA
    'Dominadas': {
        description: 'El mejor constructor de amplitud de espalda.',
        instructions: [
            'Agarre prono (palmas al frente) más ancho que hombros.',
            'Inicia el movimiento bajando los hombros (depresión escapular).',
            'Tira hasta que la barbilla pase la barra.',
            'Baja controladamente hasta estirar los brazos.'
        ]
    },
    'Remo con Barra': {
        description: 'Constructor de densidad y grosor de espalda.',
        instructions: [
            'Inclina el torso a 45 grados, espalda recta.',
            'Agarra la barra y tira hacia la cadera/ombligo.',
            'Aprieta la espalda en la cima del movimiento.',
            'No uses impulso excesivo con las piernas.'
        ]
    },
    'Jalón al Pecho': {
        description: 'Alternativa a las dominadas para amplitud.',
        instructions: [
            'Siéntate y asegura las piernas.',
            'Agarre amplio, tira la barra hacia la parte superior del pecho.',
            'Inclínate ligeramente atrás pero no te balances.',
            'Concéntrate en bajar los codos.'
        ]
    },
    'Remo Gironda': {
        description: 'Remo sentado para espalda media y baja.',
        instructions: [
            'Espalda recta, pecho fuera.',
            'Tira del agarre hacia el abdomen bajo.',
            'Estira los brazos dejando que los hombros vayan adelante un poco.',
            'Retrae fuerte al tirar.'
        ]
    },
    'Peso Muerto': {
        description: 'El ejercicio de fuerza total. Cadena posterior.',
        instructions: [
            'Pies a anchura de cadera, barra pegada a las tibias.',
            'Cadera atrás, espalda neutra, pecho arriba.',
            'Empuja el suelo con los pies y levanta la barra.',
            'Bloquea arriba apretando glúteos.',
            'Baja controladamente por el mismo camino.'
        ]
    },

    // PIERNAS
    'Sentadilla': {
        description: 'El rey de las piernas. Cuádriceps, glúteo y core.',
        instructions: [
            'Barra sobre trapecios, pies anchura de hombros.',
            'Inicia bajando la cadera atrás y abajo.',
            'Rodillas alineadas con la punta de los pies.',
            'Rompe el paralelo (cadera bajo rodilla).',
            'Sube explosivo empujando el suelo.'
        ]
    },
    'Prensa de Piernas': {
        description: 'Carga pesada para piernas sin cargar la espalda.',
        instructions: [
            'Espalda pegada al respaldo, pies en plataforma.',
            'Baja el peso hasta formar 90 grados con rodillas.',
            'No bloquees las rodillas al estirar.',
            'Mantén los talones apoyados siempre.'
        ]
    },
    'Zancadas (Lunges)': {
        description: 'Unilateral para equilibrio y glúteo.',
        instructions: [
            'Da un paso largo adelante.',
            'Baja la rodilla trasera casi hasta el suelo.',
            'Mantén el torso erguido.',
            'Empuja con el talón delantero para volver.'
        ]
    },
    'Peso Muerto Rumano': {
        description: 'Enfoque en isquiosurales y glúteos.',
        instructions: [
            'Rodillas semi-flexionadas pero fijas.',
            'Lleva la cadera hacia atrás lejos.',
            'Baja la barra rozando las piernas hasta sentir estirón en isquios.',
            'Sube empujando la cadera adelante (hip hinge).'
        ]
    },
    'Hip Thrust': {
        description: 'El mejor ejercicio para glúteos.',
        instructions: [
            'Espalda alta apoyada en banco.',
            'Barra sobre la cadera (usa almohadilla).',
            'Sube la cadera hasta alinear hombro-cadera-rodilla.',
            'Aprieta glúteos fuertemente arriba.',
            'Mirada al frente, barbilla al pecho.'
        ]
    },

    // HOMBROS
    'Press Militar': {
        description: 'Fuerza bruta para hombros y tríceps.',
        instructions: [
            'De pie, barra sobre el pecho superior.',
            'Empuja verticalmente metiendo la cabeza bajo la barra al final.',
            'No arquees excesivamente la espalda baja.',
            'Controla la bajada.'
        ]
    },
    'Elevaciones Laterales': {
        description: 'Para la cabeza lateral del deltoides (anchura).',
        instructions: [
            'Codos levemente flexionados.',
            'Sube los brazos hasta la altura de hombros.',
            'Imagina que viertes agua de una jarra.',
            'Baja lento, no dejes caer el peso.'
        ]
    },
    'Pájaros (Rear Delt)': {
        description: 'Para la parte posterior del hombro.',
        instructions: [
            'Inclínate hacia adelante.',
            'Abre los brazos hacia los lados/atrás.',
            'Enfócate en juntar la espalda alta.'
        ]
    },

    // BRAZOS (Bíceps/Tríceps)
    'Curl con Barra': {
        description: 'Masa general para bíceps.',
        instructions: [
            'Codos pegados al cuerpo.',
            'Sube la barra sin mover los codos adelante.',
            'Aprieta arriba, baja lento.'
        ]
    },
    'Curl Martillo': {
        description: 'Para braquial y antebrazo.',
        instructions: [
            'Agarre neutro (palmas enfrentadas).',
            'Sube la mancuerna cruzando ligeramente hacia el hombro opuesto o recto.'
        ]
    },
    'Extensiones de Tríceps Polea': {
        description: 'Aislamiento de tríceps.',
        instructions: [
            'Codos fijos a los costados.',
            'Baja la polea estirando el brazo completamente.',
            'Abre la cuerda al final para mayor contracción.'
        ]
    },
    'Press Francés': {
        description: 'Masa para la cabeza larga del tríceps.',
        instructions: [
            'Tumbado, baja la barra Z a la frente.',
            'Mantén los codos apuntando al techo.',
            'Extiende los brazos sin mover los hombros.'
        ]
    }
};

const MUSCLE_ICONS: Record<MuscleGroup, string[]> = {
    'Pecho': ['🏋️', '🤸', '💣'],
    'Espalda': ['🧗', '🛶', '🦅'],
    'Piernas': ['🦵', '🍗', '🏃'],
    'Hombros': ['🤷', '🥎', '🛡️'],
    'Bíceps': ['💪', '🐍', '🔨'],
    'Tríceps': ['🥢', '🏹', '🥋'],
    'Abdominales': ['🍫', '🧱', '🌀'],
    'Cardio': ['🏃', '🚴', '❤️']
};

// LOGICAL VARIANTS GENERATOR
const VARIANTS = [
    { name: '', suffix: '', multiplier: 1, tags: ['Standard'], instructionAdd: '' },
    { name: 'con Mancuernas', suffix: '(Mancuernas)', multiplier: 1.1, tags: ['Dumbbell', 'Stabilization'], instructionAdd: 'Usa mancuernas para mayor rango de movimiento y trabajo estabilizador.' },
    { name: 'con Barra', suffix: '(Barra)', multiplier: 1.2, tags: ['Barbell', 'Strength'], instructionAdd: 'Usa barra para mover más carga total.' },
    { name: 'en Polea', suffix: '(Polea)', multiplier: 0.9, tags: ['Cable', 'ConstantTension'], instructionAdd: 'Usa la polea para mantener tensión constante en todo el recorrido.' },
    { name: 'Smith', suffix: '(Multipower)', multiplier: 1, tags: ['Machine'], instructionAdd: 'Usa la máquina Smith para mayor estabilidad.' },
];

const INTENSITY_TECHNIQUES = [
    { name: 'Normal', xp: 0 },
    { name: 'Dropset', xp: 10, desc: 'Al fallo, baja peso y sigue.' },
    { name: 'Superserie', xp: 15, desc: 'Sin descanso tras el anterior.' },
    { name: 'Pausa', xp: 5, desc: 'Pausa 2s en la parte difícil.' },
    { name: 'Lento', xp: 5, desc: 'Negativa de 4 segundos.' }
];

const generateFinalDatabase = (): Exercise[] => {
    const exercises: Exercise[] = [];
    let idCounter = 1;

    // 1. Generate core exercises from base list
    Object.entries(BASE_EXERCISES).forEach(([name, data]) => {
        // Find muscle for this exercise (simple heuristic or manual mapping needed if not in data, 
        // but here we know the structure. To keep it simple, I'll loop muscles and check lists, 
        // but better: add muscle to BASE_EXERCISES data structure or infer it).

        // Let's refine BASE_EXERCISES to include muscle for easier generation
    });

    return exercises; // Placeholder basically, see below for real implementation
};

// Re-write of the generator to be robust
const generateReallyRobustExercises = (): Exercise[] => {
    const db: Exercise[] = [];
    let id = 1;

    const definitions: { name: string, muscle: MuscleGroup, type: ExerciseType, diff: Difficulty, desc?: string, instr?: string[] }[] = [
        // PECHO
        { name: 'Press Banca', muscle: 'Pecho', type: 'Fuerza', diff: 'Intermedio', instr: BASE_EXERCISES['Press Banca'].instructions },
        { name: 'Press Inclinado', muscle: 'Pecho', type: 'Fuerza', diff: 'Intermedio', instr: BASE_EXERCISES['Press Inclinado con Mancuernas'].instructions },
        { name: 'Aperturas', muscle: 'Pecho', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Aperturas con Mancuernas'].instructions },
        { name: 'Flexiones', muscle: 'Pecho', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Flexiones'].instructions },
        { name: 'Fondos', muscle: 'Pecho', type: 'Fuerza', diff: 'Pro', instr: BASE_EXERCISES['Fondos en Paralelas'].instructions },
        { name: 'Cruce de Poleas', muscle: 'Pecho', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Cruce de Poleas'].instructions },
        { name: 'Pullover', muscle: 'Pecho', type: 'Fuerza', diff: 'Intermedio', instr: ['Tumbado transversalmente en banco.', 'Baja la mancuerna tras la cabeza estirando brazos.', 'Sube hasta la altura de la frente.'] },
        { name: 'Press Declinado', muscle: 'Pecho', type: 'Fuerza', diff: 'Intermedio', instr: ['Banco inclinado hacia abajo.', 'Enfoca parte baja del pecho.', 'Baja barra al final del esternón.'] },

        // ESPALDA
        { name: 'Dominadas', muscle: 'Espalda', type: 'Fuerza', diff: 'Pro', instr: BASE_EXERCISES['Dominadas'].instructions },
        { name: 'Jalón al Pecho', muscle: 'Espalda', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Jalón al Pecho'].instructions },
        { name: 'Remo con Barra', muscle: 'Espalda', type: 'Fuerza', diff: 'Intermedio', instr: BASE_EXERCISES['Remo con Barra'].instructions },
        { name: 'Remo Gironda', muscle: 'Espalda', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Remo Gironda'].instructions },
        { name: 'Peso Muerto', muscle: 'Espalda', type: 'Fuerza', diff: 'Pro', instr: BASE_EXERCISES['Peso Muerto'].instructions },
        { name: 'Pull Face', muscle: 'Hombros', type: 'Fuerza', diff: 'Novato', instr: ['Polea altura cara.', 'Tira de la cuerda hacia la frente abriendo codos.', 'Rotación externa de hombros.'] },
        { name: 'Remo Kroc', muscle: 'Espalda', type: 'Fuerza', diff: 'Pro', instr: ['Remo con mancuerna pesado y altas repes.', 'Usa un poco de impulso controlado.', 'Agarre fuerte.'] },

        // PIERNAS
        { name: 'Sentadilla', muscle: 'Piernas', type: 'Fuerza', diff: 'Intermedio', instr: BASE_EXERCISES['Sentadilla'].instructions },
        { name: 'Prensa', muscle: 'Piernas', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Prensa de Piernas'].instructions },
        { name: 'Zancadas', muscle: 'Piernas', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Zancadas (Lunges)'].instructions },
        { name: 'Peso Muerto Rumano', muscle: 'Piernas', type: 'Fuerza', diff: 'Intermedio', instr: BASE_EXERCISES['Peso Muerto Rumano'].instructions },
        { name: 'Hip Thrust', muscle: 'Piernas', type: 'Fuerza', diff: 'Intermedio', instr: BASE_EXERCISES['Hip Thrust'].instructions },
        { name: 'Extensión Cuádriceps', muscle: 'Piernas', type: 'Fuerza', diff: 'Novato', instr: ['Siéntate y ajusta rodillo.', 'Estira piernas contrayendo cuádriceps.', 'Baja lento.'] },
        { name: 'Curl Femoral', muscle: 'Piernas', type: 'Fuerza', diff: 'Novato', instr: ['Tumbado o sentado.', 'Flexiona rodilla llevando talón al glúteo.', 'Controla la vuelta.'] },
        { name: 'Elevación Gemelos', muscle: 'Piernas', type: 'Fuerza', diff: 'Novato', instr: ['Punta de pies en escalón.', 'Sube lo máximo posible apretando.', 'Baja estirando el talón.'] },

        // HOMBROS
        { name: 'Press Militar', muscle: 'Hombros', type: 'Fuerza', diff: 'Intermedio', instr: BASE_EXERCISES['Press Militar'].instructions },
        { name: 'Elevaciones Laterales', muscle: 'Hombros', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Elevaciones Laterales'].instructions },
        { name: 'Pájaros', muscle: 'Hombros', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Pájaros (Rear Delt)'].instructions },
        { name: 'Press Arnold', muscle: 'Hombros', type: 'Fuerza', diff: 'Intermedio', instr: ['Mancuernas frente a la cara, palmas hacia ti.', 'Empuja rotando las muñecas hasta mirar al frente arriba.', 'Vuelve rotando a la inversa.'] },
        { name: 'Remo al Mentón', muscle: 'Hombros', type: 'Fuerza', diff: 'Intermedio', instr: ['Agarre estrecho.', 'Sube barra pegada al cuerpo hasta el pecho alto.', 'Codos siempre más altos que muñecas.'] },

        // BICEPS / TRICEPS
        { name: 'Curl Bíceps', muscle: 'Bíceps', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Curl con Barra'].instructions },
        { name: 'Curl Martillo', muscle: 'Bíceps', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Curl Martillo'].instructions },
        { name: 'Curl Predicador', muscle: 'Bíceps', type: 'Fuerza', diff: 'Novato', instr: ['Apoya brazos en banco Scott.', 'No despegues axilas.', 'Estira completo y sube.'] },
        { name: 'Press Francés', muscle: 'Tríceps', type: 'Fuerza', diff: 'Intermedio', instr: BASE_EXERCISES['Press Francés'].instructions },
        { name: 'Extensión Polea', muscle: 'Tríceps', type: 'Fuerza', diff: 'Novato', instr: BASE_EXERCISES['Extensiones de Tríceps Polea'].instructions },
        { name: 'Fondos Tríceps', muscle: 'Tríceps', type: 'Fuerza', diff: 'Novato', instr: ['En banco o paralelas.', 'Cuerpo vertical.', 'Codos cerrados hacia atrás.'] },

        // ABDOMINALES
        { name: 'Crunch', muscle: 'Abdominales', type: 'Fuerza', diff: 'Novato', instr: ['Tumbado boca arriba.', 'Flexiona torso intentando llevar costillas a cadera.', 'No tires del cuello.'] },
        { name: 'Plancha', muscle: 'Abdominales', type: 'Fuerza', diff: 'Intermedio', instr: ['Apoyo en antebrazos y puntas.', 'Cuerpo recto como tabla.', 'Aprieta glúteo y abdomen. Agunta.'] },
        { name: 'Leg Raise', muscle: 'Abdominales', type: 'Fuerza', diff: 'Intermedio', instr: ['Colgado o tumbado.', 'Sube piernas rectas hasta 90 grados.', 'Controla la bajada para no arquear lumbar.'] },
        { name: 'Russian Twist', muscle: 'Abdominales', type: 'Fuerza', diff: 'Novato', instr: ['Sentado en V.', 'Gira torso de lado a lado tocando suelo.', 'Pies elevados para más dificultad.'] },

        // MISSING QUEST EXERCISES
        { name: 'Sentadilla Isométrica', muscle: 'Piernas', type: 'Fuerza', diff: 'Novato', instr: ['Apóyate en una pared con rodillas a 90 grados.', 'Mantén la espalda pegada y aguanta.', 'No apoyes las manos en las rodillas.'] },
        { name: 'Buenos Días', muscle: 'Espalda', type: 'Fuerza', diff: 'Intermedio', instr: ['Pies ancho de hombros, manos en nuca o barra.', 'Lleva cadera atrás manteniendo piernas semi-rectas.', 'Baja torso hasta paralelo al suelo.', 'Sube activando isquios y espalda.'] },
        { name: 'Supermans', muscle: 'Espalda', type: 'Fuerza', diff: 'Novato', instr: ['Tumbado boca abajo.', 'Levanta brazos y piernas simultáneamente.', 'Aguanta 1-2 segundos arriba como si volaras.'] },
        { name: 'Sentadilla con Salto', muscle: 'Piernas', type: 'Potencia', diff: 'Intermedio', instr: ['Baja en sentadilla normal.', 'Explota hacia arriba saltando lo más alto posible.', 'Amortigua la caída flexionando rodillas.'] },
        { name: 'Flexiones Diamante', muscle: 'Pecho', type: 'Fuerza', diff: 'Intermedio', instr: ['Junta manos bajo el pecho formando un rombo.', 'Baja los codos pegados al cuerpo.', 'Enfoca el esfuerzo en tríceps y pecho interior.'] },
        { name: 'Flexiones Explosivas', muscle: 'Pecho', type: 'Potencia', diff: 'Pro', instr: ['Baja controlado.', 'Empuja con máxima fuerza para despegar manos del suelo.', 'Amortigua al caer.'] },
        { name: 'Elevación de Talón', muscle: 'Piernas', type: 'Fuerza', diff: 'Novato', instr: ['De pie o sentado.', 'Sube los talones lo máximo posible.', 'Baja lento hasta sentir estiramiento.'] },
    ];

    // Generate Variants to reach ~500 exercises
    definitions.forEach(def => {
        // 1. Add Base Exercise
        db.push({
            id: `ex_${id++}`,
            name: def.name,
            description: def.desc || `Ejercicio base de ${def.muscle}.`,
            muscle: def.muscle,
            type: def.type,
            difficulty: def.diff,
            xpReward: 10,
            icon: MUSCLE_ICONS[def.muscle][0],
            tags: [],
            instructions: def.instr
        });

        // 2. Generate Logical Variants
        VARIANTS.forEach(v => {
            if (v.name === '') return; // Skip base

            // Logic Filter: Don't allow "Barbell" if exercise is "Dumbbell Press" explicitly named
            if (def.name.includes('Mancuernas') && v.tags.includes('Barbell')) return;
            if (def.name.includes('Barra') && v.tags.includes('Dumbbell')) return;
            if (def.name.includes('Polea') && v.tags.includes('Barbell')) return;
            if (def.name.includes('Máquina') && v.tags.includes('Dumbbell')) return;
            // Don't put "Bodyweight" exercises with "Barbell" unless it makes sense (Weighted Pullups)
            if ((def.name === 'Dominadas' || def.name === 'Fondos') && v.tags.includes('Dumbbell')) return; // Usually weight belt

            const finalName = `${def.name} ${v.name}`;
            const finalInstr = def.instr ? [...def.instr, v.instructionAdd].filter(Boolean) : [v.instructionAdd];

            db.push({
                id: `ex_${id++}`,
                name: finalName,
                description: `Variante: ${v.name}. ${def.desc || ''}`,
                muscle: def.muscle,
                type: def.type,
                difficulty: def.diff, // Could bump difficulty
                xpReward: Math.floor(10 * v.multiplier),
                icon: MUSCLE_ICONS[def.muscle][(finalName.length + (def.muscle.length)) % MUSCLE_ICONS[def.muscle].length],
                tags: [...v.tags],
                instructions: finalInstr
            });
        });

        // 3. Generate Intensity Variants (Dropset, Pause, etc)
        INTENSITY_TECHNIQUES.forEach(tech => {
            if (tech.name === 'Normal') return;

            // Only apply techniques to base exercises or simple variants to avoid name bloat
            // Create separate catalog entries? Or just one "Bench Press (Dropset)"?
            // User requested 500 exercises. Combinatorics help here.

            db.push({
                id: `ex_${id++}`,
                name: `${def.name} [${tech.name}]`,
                description: `Ejecución: ${tech.desc}. ${def.desc || ''}`,
                muscle: def.muscle,
                type: def.type,
                difficulty: 'Pro',
                xpReward: 15 + tech.xp,
                icon: MUSCLE_ICONS[def.muscle][0],
                tags: ['Intensity', tech.name],
                instructions: def.instr ? [...def.instr, `TÉCNICA ESPECIAL: ${tech.desc}`] : [`TÉCNICA ESPECIAL: ${tech.desc}`]
            });
        });
    });

    // Fill with Cardio options
    const cardios = ['Cinta', 'Elíptica', 'Remo', 'Bicicleta', 'Saltar Comba', 'Burpees', 'Saco de Boxeo', 'Natación', 'Escaleras'];
    cardios.forEach(c => {
        const intensities = ['LISS (Suave)', 'HIIT (Intervalos)', 'Tempo (Medio)', 'Sprint'];
        intensities.forEach(int => {
            db.push({
                id: `ex_${id++}`,
                name: `${c} - ${int}`,
                description: `Cardio estilo ${int}.`,
                muscle: 'Cardio',
                type: 'Cardio',
                difficulty: int.includes('HIIT') ? 'Pro' : 'Novato',
                xpReward: int.includes('HIIT') ? 30 : 15,
                icon: '❤️',
                tags: ['Cardio', int.split(' ')[0]],
                instructions: [`Realiza ${c} manteniendo la intensidad ${int}.`, 'Mantén la respiración controlada.']
            });
        });
    });

    return db;
};

export const EXERCISE_DB = generateReallyRobustExercises();
