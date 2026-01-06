import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';

export const ExerciseDetailScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { exercise } = route.params;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: spacing.lg,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        backButton: {
            padding: spacing.sm,
            marginRight: spacing.md,
        },
        backButtonText: {
            fontSize: 24,
        },
        headerTitle: {
            ...textStyles.h3,
            color: theme.colors.text,
            flex: 1,
        },
        scrollContent: {
            padding: spacing.lg,
        },
        imageContainer: {
            width: '100%',
            height: 200,
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.lg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.lg,
        },
        imagePlaceholder: {
            fontSize: 64,
        },
        infoGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
            marginBottom: spacing.xl,
        },
        infoCard: {
            flex: 1,
            minWidth: '45%',
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            ...shadows.small,
        },
        infoLabel: {
            ...textStyles.caption,
            color: theme.colors.textSecondary,
            marginBottom: spacing.xs,
        },
        infoValue: {
            ...textStyles.body,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        section: {
            marginBottom: spacing.xl,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        list: {
            gap: spacing.sm,
        },
        listItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
        },
        listBullet: {
            ...textStyles.body,
            color: theme.colors.primary,
            marginRight: spacing.sm,
            fontWeight: 'bold',
        },
        listText: {
            ...textStyles.body,
            color: theme.colors.text,
            flex: 1,
        },
        warningBox: {
            backgroundColor: theme.colors.warningLight,
            borderLeftWidth: 4,
            borderLeftColor: theme.colors.warning,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.md,
        },
        warningTitle: {
            ...textStyles.bodyBold,
            color: theme.colors.warning,
            marginBottom: spacing.xs,
        },
        warningText: {
            ...textStyles.bodySmall,
            color: theme.colors.text,
        },
        alternativesContainer: {
            gap: spacing.sm,
        },
        alternativeChip: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        alternativeText: {
            ...textStyles.body,
            color: theme.colors.text,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{exercise.name}</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                {/* Exercise Image/GIF */}
                <View style={styles.imageContainer}>
                    {exercise.imagePath ? (
                        <Image
                            source={{ uri: exercise.imagePath }}
                            style={{ width: '100%', height: '100%', borderRadius: borderRadius.lg }}
                            resizeMode="cover"
                        />
                    ) : (
                        <Text style={styles.imagePlaceholder}>💪</Text>
                    )}
                </View>

                {/* Info Grid */}
                <View style={styles.infoGrid}>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoLabel}>{t('workout.targetMuscle')}</Text>
                        <Text style={styles.infoValue}>{exercise.targetMuscle}</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoLabel}>Difficulty</Text>
                        <Text style={styles.infoValue}>{exercise.difficulty}</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoLabel}>Category</Text>
                        <Text style={styles.infoValue}>{exercise.category}</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoLabel}>Equipment</Text>
                        <Text style={styles.infoValue}>{exercise.equipment}</Text>
                    </View>
                </View>

                {/* Instructions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How To Perform</Text>
                    <View style={styles.list}>
                        {exercise.instructions.map((instruction, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.listBullet}>{index + 1}.</Text>
                                <Text style={styles.listText}>{instruction}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Form Tips */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('workout.formTips')}</Text>
                    <View style={styles.list}>
                        {exercise.formTips.map((tip, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.listBullet}>✓</Text>
                                <Text style={styles.listText}>{tip}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Common Mistakes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('workout.commonMistakes')}</Text>
                    <View style={styles.warningBox}>
                        <Text style={styles.warningTitle}>⚠️ Avoid These Mistakes</Text>
                    </View>
                    <View style={styles.list}>
                        {exercise.commonMistakes.map((mistake, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.listBullet}>✗</Text>
                                <Text style={styles.listText}>{mistake}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Alternatives */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('workout.alternatives')}</Text>
                    <View style={styles.alternativesContainer}>
                        {exercise.alternatives.map((alternative, index) => (
                            <View key={index} style={styles.alternativeChip}>
                                <Text style={styles.alternativeText}>• {alternative}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <Button
                    title="Add to My Workout"
                    onPress={() => {
                        // TODO: Implement add to workout functionality
                        navigation.goBack();
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
