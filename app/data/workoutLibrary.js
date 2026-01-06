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
    // CHEST EXERCISES
    {
        id: 'push_up',
        name: 'Push-Up',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.CHEST,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'None',
        instructions: [
            'Start in a plank position with hands shoulder-width apart',
            'Lower your body until chest nearly touches the floor',
            'Push back up to starting position',
            'Keep core engaged throughout',
        ],
        formTips: [
            'Keep your body in a straight line',
            'Don\'t let hips sag or pike up',
            'Elbows should be at 45-degree angle',
            'Breathe in going down, out going up',
        ],
        commonMistakes: [
            'Flaring elbows out too wide',
            'Not going low enough',
            'Holding breath',
            'Arching lower back',
        ],
        alternatives: [
            'Knee Push-Ups (easier)',
            'Incline Push-Ups (easier)',
            'Decline Push-Ups (harder)',
            'Diamond Push-Ups (harder)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },
    {
        id: 'bench_press',
        name: 'Bench Press',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.CHEST,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'Barbell, Bench',
        instructions: [
            'Lie on bench with feet flat on floor',
            'Grip bar slightly wider than shoulder-width',
            'Lower bar to mid-chest with control',
            'Press bar back up to starting position',
        ],
        formTips: [
            'Keep shoulder blades retracted',
            'Maintain slight arch in lower back',
            'Bar path should be slightly diagonal',
            'Keep wrists straight',
        ],
        commonMistakes: [
            'Bouncing bar off chest',
            'Lifting hips off bench',
            'Flaring elbows excessively',
            'Not using full range of motion',
        ],
        alternatives: [
            'Dumbbell Bench Press',
            'Machine Chest Press',
            'Push-Ups (bodyweight)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },

    // BACK EXERCISES
    {
        id: 'pull_up',
        name: 'Pull-Up',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.BACK,
        difficulty: difficultyLevels.ADVANCED,
        equipment: 'Pull-up Bar',
        instructions: [
            'Hang from bar with hands shoulder-width apart, palms facing away',
            'Pull yourself up until chin is above bar',
            'Lower with control to full extension',
            'Repeat without swinging',
        ],
        formTips: [
            'Engage lats before pulling',
            'Keep core tight',
            'Pull elbows down and back',
            'Full extension at bottom',
        ],
        commonMistakes: [
            'Using momentum/swinging',
            'Not going to full extension',
            'Shrugging shoulders',
            'Kipping when not intended',
        ],
        alternatives: [
            'Assisted Pull-Ups (easier)',
            'Lat Pulldown (easier)',
            'Negative Pull-Ups (progression)',
            'Band-Assisted Pull-Ups (easier)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },
    {
        id: 'bent_over_row',
        name: 'Bent Over Row',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.BACK,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'Barbell',
        instructions: [
            'Bend at hips with slight knee bend',
            'Grip bar with hands shoulder-width apart',
            'Pull bar to lower chest/upper abdomen',
            'Lower with control',
        ],
        formTips: [
            'Keep back flat, not rounded',
            'Pull with elbows, not hands',
            'Squeeze shoulder blades together',
            'Maintain hip hinge position',
        ],
        commonMistakes: [
            'Rounding lower back',
            'Standing too upright',
            'Using too much momentum',
            'Not retracting shoulder blades',
        ],
        alternatives: [
            'Dumbbell Rows',
            'Cable Rows',
            'T-Bar Rows',
            'Inverted Rows (bodyweight)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },

    // LEG EXERCISES
    {
        id: 'squat',
        name: 'Squat',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.LEGS,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'None',
        instructions: [
            'Stand with feet shoulder-width apart',
            'Lower hips back and down as if sitting',
            'Keep chest up and knees tracking over toes',
            'Push through heels to stand',
        ],
        formTips: [
            'Keep weight in heels',
            'Chest and head up',
            'Knees in line with toes',
            'Go as low as mobility allows',
        ],
        commonMistakes: [
            'Knees caving inward',
            'Heels lifting off ground',
            'Leaning too far forward',
            'Not going deep enough',
        ],
        alternatives: [
            'Goblet Squat (easier)',
            'Box Squat (easier)',
            'Barbell Back Squat (harder)',
            'Front Squat (harder)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },
    {
        id: 'deadlift',
        name: 'Deadlift',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.LEGS,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'Barbell',
        instructions: [
            'Stand with feet hip-width apart, bar over mid-foot',
            'Bend at hips and knees to grip bar',
            'Keep back flat, chest up',
            'Drive through heels to stand, pulling bar up legs',
            'Lower with control',
        ],
        formTips: [
            'Keep bar close to body',
            'Neutral spine throughout',
            'Engage lats',
            'Hip hinge, not squat',
        ],
        commonMistakes: [
            'Rounding lower back',
            'Bar drifting away from body',
            'Jerking the weight',
            'Hyperextending at top',
        ],
        alternatives: [
            'Romanian Deadlift',
            'Trap Bar Deadlift',
            'Sumo Deadlift',
            'Kettlebell Deadlift (easier)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },

    // SHOULDER EXERCISES
    {
        id: 'overhead_press',
        name: 'Overhead Press',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.SHOULDERS,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'Barbell or Dumbbells',
        instructions: [
            'Stand with feet shoulder-width apart',
            'Hold bar at shoulder height',
            'Press bar overhead until arms fully extended',
            'Lower with control to shoulders',
        ],
        formTips: [
            'Keep core tight',
            'Don\'t arch back excessively',
            'Press in straight line',
            'Full lockout at top',
        ],
        commonMistakes: [
            'Excessive back arch',
            'Not pressing straight up',
            'Flaring elbows too wide',
            'Using legs (unless push press)',
        ],
        alternatives: [
            'Dumbbell Shoulder Press',
            'Arnold Press',
            'Machine Shoulder Press',
            'Pike Push-Ups (bodyweight)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },

    // CORE EXERCISES
    {
        id: 'plank',
        name: 'Plank',
        category: exerciseCategories.STRENGTH,
        targetMuscle: muscleGroups.CORE,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'None',
        instructions: [
            'Start in forearm plank position',
            'Keep body in straight line from head to heels',
            'Engage core and glutes',
            'Hold for prescribed time',
        ],
        formTips: [
            'Don\'t let hips sag',
            'Don\'t pike hips up',
            'Keep neck neutral',
            'Breathe normally',
        ],
        commonMistakes: [
            'Sagging hips',
            'Holding breath',
            'Looking up',
            'Not engaging core',
        ],
        alternatives: [
            'Knee Plank (easier)',
            'Side Plank',
            'Plank with Leg Lift (harder)',
            'RKC Plank (harder)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },

    // CARDIO EXERCISES
    {
        id: 'burpees',
        name: 'Burpees',
        category: exerciseCategories.HIIT,
        targetMuscle: muscleGroups.FULL_BODY,
        difficulty: difficultyLevels.INTERMEDIATE,
        equipment: 'None',
        instructions: [
            'Start standing',
            'Drop into squat, hands on floor',
            'Jump feet back to plank',
            'Do a push-up',
            'Jump feet back to squat',
            'Jump up with arms overhead',
        ],
        formTips: [
            'Maintain good push-up form',
            'Land softly',
            'Keep core engaged',
            'Move with control',
        ],
        commonMistakes: [
            'Sagging hips in plank',
            'Skipping the push-up',
            'Landing too hard',
            'Rushing form',
        ],
        alternatives: [
            'Step-Back Burpees (easier)',
            'Burpees without Push-Up (easier)',
            'Burpee Box Jumps (harder)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
    },
    {
        id: 'mountain_climbers',
        name: 'Mountain Climbers',
        category: exerciseCategories.HIIT,
        targetMuscle: muscleGroups.CORE,
        difficulty: difficultyLevels.BEGINNER,
        equipment: 'None',
        instructions: [
            'Start in high plank position',
            'Drive one knee toward chest',
            'Quickly switch legs',
            'Continue alternating at a fast pace',
        ],
        formTips: [
            'Keep hips level',
            'Maintain plank position',
            'Land on balls of feet',
            'Keep core tight',
        ],
        commonMistakes: [
            'Hips too high',
            'Not bringing knee far enough',
            'Losing plank position',
            'Going too slow',
        ],
        alternatives: [
            'Slow Mountain Climbers (easier)',
            'Cross-Body Mountain Climbers',
            'Spiderman Climbers (harder)',
        ],
        imagePath: null, // Placeholder - add actual image path when available
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
