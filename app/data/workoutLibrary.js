// Comprehensive workout library for GRIT app
// Each exercise includes name, target muscle, difficulty, instructions, tips, and alternatives

export const exerciseCategories = {
    STRENGTH: 'Strength',
    HYPERTROPHY: 'Hypertrophy',
    MOBILITY: 'Mobility',
    HIIT: 'HIIT',
    CARDIO: 'Cardio',
    STRETCHING: 'Stretching',
};

export const muscleGroups = {
    CHEST: 'Chest',
    BACK: 'Back',
    SHOULDERS: 'Shoulders',
    ARMS: 'Arms',
    LEGS: 'Legs',
    CORE: 'Core',
    FULL_BODY: 'Full Body',
};

export const difficultyLevels = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
};

export const exercises = [
    // --- STRENGTH EXERCISES ---
    {
        id: 'push_up',
        name: 'Push-Up',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.CHEST,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'None',
        recommendedGender: 'all',
        suitableLevel: ['beginner', 'intermediate'],
        tags: ['muscle-gain', 'upper-body'],
        instructions: [
            'Start in a plank position with hands shoulder-width apart',
            'Lower your body until chest nearly touches the floor',
            'Push back up to starting position',
            'Keep core engaged throughout',
        ],
        formTips: ['Keep body in straight line', 'Don\'t sag hips'],
        commonMistakes: ['Flaring elbows', 'Not going low enough'],
        alternatives: ['Knee Push-Ups', 'Incline Push-Ups'],
        imagePath: 'app/assets/exercises/push_up.png',
    },
    {
        id: 'bench_press',
        name: 'Bench Press',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.CHEST,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'Barbell, Bench',
        recommendedGender: 'male',
        suitableLevel: ['intermediate', 'advanced'],
        tags: ['muscle-gain', 'strength'],
        instructions: [
            'Lie on bench with feet flat on floor',
            'Grip bar slightly wider than shoulder-width',
            'Lower bar to mid-chest with control',
            'Press bar back up to starting position',
        ],
        formTips: ['Retract shoulder blades', 'Keep wrists straight'],
        commonMistakes: ['Bouncing bar off chest', 'Lifting hips'],
        alternatives: ['Dumbbell Bench Press', 'Machine Press'],
        imagePath: 'app/assets/exercises/bench_press.png',
    },
    {
        id: 'squat',
        name: 'Bodyweight Squat',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.LEGS,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'None',
        recommendedGender: 'all',
        suitableLevel: ['beginner', 'intermediate', 'advanced'],
        tags: ['muscle-gain', 'lower-body'],
        instructions: [
            'Stand with feet shoulder-width apart',
            'Lower hips back and down',
            'Keep chest up',
            'Push through heels to stand',
        ],
        formTips: ['Weight in heels', 'Knees track over toes'],
        commonMistakes: ['Knees caving in', 'Heels lifting'],
        alternatives: ['Goblet Squat', 'Box Squat'],
        imagePath: 'app/assets/exercises/squat.png',
    },

    // --- CARDIO EXERCISES (Newly Added) ---
    {
        id: 'running_place',
        name: 'Running in Place',
        category: exerciseCategories.CARDIO,
        targetMuscle: muscleGroups.FULL_BODY,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'None',
        recommendedGender: 'all',
        suitableLevel: ['beginner', 'intermediate'],
        tags: ['weight-loss', 'stamina'],
        instructions: [
            'Stand with feet hip-width apart',
            'Lift knees high while pumping arms',
            'Stay on the balls of your feet',
            'Maintain a steady rhythm',
        ],
        formTips: ['Keep core engaged', 'Breathe rhythmically'],
        commonMistakes: ['Flat-footed running', 'Slouching'],
        alternatives: ['High Knees', 'Jumping Jacks'],
        imagePath: 'app/assets/exercises/running_place.png',
    },
    {
        id: 'jump_rope',
        name: 'Jump Rope',
        category: exerciseCategories.CARDIO,
        targetMuscle: muscleGroups.FULL_BODY,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'Jump Rope',
        recommendedGender: 'all',
        suitableLevel: ['intermediate', 'advanced'],
        tags: ['weight-loss', 'coordination'],
        instructions: [
            'Hold rope handles at waist height',
            'Rotate wrists to swing rope overhead',
            'Jump slightly as rope passes under feet',
            'Keep jumps small and efficient',
        ],
        formTips: ['Use wrists, not arms', 'Quiet landings'],
        commonMistakes: ['Jumping too high', 'Using whole arms'],
        alternatives: ['Simulated Jump Rope', 'Jumping Jacks'],
        imagePath: 'app/assets/exercises/jump_rope.png',
    },
    {
        id: 'cycling',
        name: 'Stationary Cycling',
        category: exerciseCategories.CARDIO,
        targetMuscle: muscleGroups.LEGS,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'Stationary Bike',
        recommendedGender: 'all',
        suitableLevel: ['beginner', 'intermediate', 'advanced'],
        tags: ['weight-loss', 'low-impact'],
        instructions: [
            'Adjust seat height to hip level',
            'Pedal at a consistent cadence',
            'Vary resistance for challenge',
            'Keep upper body relaxed',
        ],
        formTips: ['Keep back neutral', 'Push and pull the pedals'],
        commonMistakes: ['Seat too low', 'Death-grip on handlebars'],
        alternatives: ['Outdoor Cycling', 'Elliptical'],
        imagePath: 'app/assets/exercises/cycling.png',
    },

    // --- STRETCHING EXERCISES (Newly Added) ---
    {
        id: 'cobra_stretch',
        name: 'Cobra Stretch',
        category: exerciseCategories.STRETCHING,
        targetMuscle: muscleGroups.CORE,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'Mat',
        recommendedGender: 'all',
        suitableLevel: ['beginner', 'intermediate', 'advanced'],
        tags: ['flexibility', 'recovery'],
        instructions: [
            'Lie face down with hands under shoulders',
            'Gently push upper body up',
            'Keep hips on the floor',
            'Look slightly upward',
        ],
        formTips: ['Don\'t force the height', 'Relax shoulders'],
        commonMistakes: ['Locking elbows too hard', 'Scoping lower back'],
        alternatives: ['Sphinx Pose', 'Upward Dog'],
        imagePath: 'app/assets/exercises/cobra_stretch.png',
    },
    {
        id: 'hamstring_stretch',
        name: 'Seated Hamstring Stretch',
        category: exerciseCategories.STRETCHING,
        targetMuscle: muscleGroups.LEGS,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'None',
        recommendedGender: 'all',
        suitableLevel: ['beginner', 'intermediate', 'advanced'],
        tags: ['flexibility', 'injury-prevention'],
        instructions: [
            'Sit with one leg straight, other tucked in',
            'Reach toward your toes with both hands',
            'Keep your back as flat as possible',
            'Hold and breathe deep',
        ],
        formTips: ['Focus on hinges at the hip', 'Keep toes up'],
        commonMistakes: ['Rounding the back', 'Holding breath'],
        alternatives: ['Standing Hamstring Stretch', 'Lying Leg Stretch'],
        imagePath: 'app/assets/exercises/hamstring_stretch.png',
    },
    {
        id: 'downward_dog',
        name: 'Downward Dog',
        category: exerciseCategories.STRETCHING,
        targetMuscle: muscleGroups.FULL_BODY,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'Mat',
        recommendedGender: 'female',
        suitableLevel: ['intermediate', 'advanced'],
        tags: ['flexibility', 'yoga'],
        instructions: [
            'Start on hands and knees',
            'Lift hips up and back to form "V" shape',
            'Press heels toward the floor',
            'Spread fingers wide',
        ],
        formTips: ['Push away from the floor', 'Engage core'],
        commonMistakes: ['Rounding shoulders', 'Walking feet too close'],
        alternatives: ['Puppy Pose', 'Child\'s Pose'],
        imagePath: 'app/assets/exercises/downward_dog.png',
    },

    // --- HIIT EXERCISES ---
    {
        id: 'burpees',
        name: 'Standard Burpee',
        category: exerciseCategories.HIIT,
        targetMuscle: muscleGroups.FULL_BODY,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'None',
        recommendedGender: 'all',
        suitableLevel: ['intermediate', 'advanced'],
        tags: ['weight-loss', 'explosive'],
        instructions: [
            'Lower into squat',
            'Kick feet back to plank',
            'Perform push-up',
            'Jump feet forward and jump up',
        ],
        formTips: ['Control the descent', 'Land softly'],
        commonMistakes: ['Sagging hips', 'Skipping push-up'],
        alternatives: ['Step-back Burpees', 'No-pushup Burpees'],
        imagePath: 'app/assets/exercises/burpees.png',
    },

    // --- MOBILITY EXERCISES ---
    {
        id: 'world_greatest_stretch',
        name: "World's Greatest Stretch",
        category: exerciseCategories.MOBILITY,
        targetMuscle: muscleGroups.FULL_BODY,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'None',
        recommendedGender: 'all',
        suitableLevel: ['beginner', 'intermediate', 'advanced'],
        tags: ['warm-up', 'flexibility'],
        instructions: [
            'Lunge forward with right foot',
            'Place left hand on floor',
            'Rotate right arm up toward ceiling',
            'Switch sides and repeat',
        ],
        formTips: ['Keep back leg straight', 'Follow hand with eyes'],
        commonMistakes: ['Rushing the rotation', 'Bent back knee'],
        alternatives: ['Lunge with Twist', 'Cat-Cow'],
        imagePath: 'app/assets/exercises/world_greatest_stretch.png',
    },
];

// Helper functions
export const getExercisesByCategory = (category) => {
    return exercises.filter((ex) => ex.category === category);
};

export const getExercisesByMuscleGroup = (muscleGroup) => {
    return exercises.filter((ex) => ex.targetMuscle === muscleGroup);
};

export const getExercisesByDifficulty = (difficulty) => {
    return exercises.filter((ex) => ex.difficulty === difficulty);
};

export const getExerciseById = (id) => {
    return exercises.find((ex) => ex.id === id);
};
