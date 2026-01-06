import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { TopBar } from '../../components/navigation/TopBar';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { exercises, exerciseCategories } from '../../data/workoutLibrary';
import { useTranslation } from 'react-i18next';

export const WorkoutScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { value: 'all', label: 'All', icon: '📋' },
        { value: exerciseCategories.STRENGTH, label: 'Strength', icon: '💪' },
        { value: exerciseCategories.CARDIO, label: 'Cardio', icon: '🏃' },
        { value: exerciseCategories.HIIT, label: 'HIIT', icon: '⚡' },
        { value: exerciseCategories.STRETCHING, label: 'Stretching', icon: '🧘' },
    ];

    const filteredExercises =
        selectedCategory === 'all'
            ? exercises
            : exercises.filter((ex) => ex.category === selectedCategory);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            padding: spacing.lg,
            paddingBottom: spacing.md,
        },
        title: {
            ...textStyles.h2,
            color: theme.colors.text,
            marginBottom: spacing.sm,
        },
        subtitle: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
        },
        categoriesContainer: {
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.md,
        },
        categoriesScroll: {
            flexDirection: 'row',
            gap: spacing.sm,
        },
        categoryChip: {
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: borderRadius.round,
            backgroundColor: theme.colors.backgroundSecondary,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
        },
        categoryChipActive: {
            backgroundColor: theme.colors.primary,
        },
        categoryIcon: {
            fontSize: 16,
        },
        categoryLabel: {
            ...textStyles.bodySmall,
            color: theme.colors.text,
        },
        categoryLabelActive: {
            color: '#FFFFFF',
            fontWeight: 'bold',
        },
        listContent: {
            padding: spacing.lg,
            paddingTop: 0,
        },
        exerciseCard: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            marginBottom: spacing.md,
            overflow: 'hidden',
            ...shadows.medium,
        },
        exerciseImage: {
            width: '100%',
            height: 150,
            backgroundColor: theme.colors.backgroundSecondary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        exercisePlaceholder: {
            fontSize: 48,
        },
        exerciseContent: {
            padding: spacing.md,
        },
        exerciseName: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.xs,
        },
        exerciseInfo: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
            marginBottom: spacing.sm,
        },
        infoBadge: {
            paddingHorizontal: spacing.sm,
            paddingVertical: 4,
            borderRadius: borderRadius.sm,
            backgroundColor: theme.colors.backgroundSecondary,
        },
        infoBadgeText: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
        },
        difficultyBadge: {
            backgroundColor: theme.colors.primary + '30',
        },
        difficultyText: {
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        viewDetailsButton: {
            ...textStyles.bodySmall,
            color: theme.colors.primary,
            fontWeight: 'bold',
            marginTop: spacing.xs,
        },
    });

    const renderExerciseCard = ({ item }) => (
        <TouchableOpacity
            style={styles.exerciseCard}
            onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
        >
            <View style={styles.exerciseImage}>
                <Text style={styles.exercisePlaceholder}>💪</Text>
            </View>
            <View style={styles.exerciseContent}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <View style={styles.exerciseInfo}>
                    <View style={[styles.infoBadge, styles.difficultyBadge]}>
                        <Text style={[styles.infoBadgeText, styles.difficultyText]}>
                            {item.difficulty}
                        </Text>
                    </View>
                    <View style={styles.infoBadge}>
                        <Text style={styles.infoBadgeText}>{item.targetMuscle}</Text>
                    </View>
                    <View style={styles.infoBadge}>
                        <Text style={styles.infoBadgeText}>{item.equipment}</Text>
                    </View>
                </View>
                <Text style={styles.viewDetailsButton}>View Details →</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TopBar />

            <View style={styles.header}>
                <Text style={styles.title}>{t('workout.library')}</Text>
                <Text style={styles.subtitle}>
                    {filteredExercises.length} exercises available
                </Text>
            </View>

            <View style={styles.categoriesContainer}>
                <View style={styles.categoriesScroll}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.value}
                            style={[
                                styles.categoryChip,
                                selectedCategory === category.value && styles.categoryChipActive,
                            ]}
                            onPress={() => setSelectedCategory(category.value)}
                        >
                            <Text style={styles.categoryIcon}>{category.icon}</Text>
                            <Text
                                style={[
                                    styles.categoryLabel,
                                    selectedCategory === category.value && styles.categoryLabelActive,
                                ]}
                            >
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <FlatList
                data={filteredExercises}
                renderItem={renderExerciseCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                initialNumToRender={10}
                windowSize={10}
                showsVerticalScrollIndicator={false}
                bounces={true}
            />
        </SafeAreaView>
    );
};
