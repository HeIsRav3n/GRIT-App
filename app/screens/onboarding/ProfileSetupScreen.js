import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';
import Slider from '@react-native-community/slider';

export const ProfileSetupScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { updateProfile } = useAuth();
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        gender: '',
        age: 25,
        height: 170,
        weight: 70,
        fitnessLevel: '',
    });
    const [errors, setErrors] = useState({});

    const genderOptions = [
        { value: 'male', label: t('profile.male'), icon: '♂️' },
        { value: 'female', label: t('profile.female'), icon: '♀️' },
        { value: 'other', label: t('profile.preferNotToSay'), icon: '⚧' },
    ];

    const fitnessLevels = [
        { value: 'beginner', label: t('profile.beginner'), icon: '🌱' },
        { value: 'intermediate', label: t('profile.intermediate'), icon: '💪' },
        { value: 'advanced', label: t('profile.advanced'), icon: '🔥' },
    ];

    const handleContinue = async () => {
        if (!formData.gender || !formData.fitnessLevel) {
            setErrors({ general: 'Please complete all required fields' });
            return;
        }

        const result = await updateProfile(formData);
        if (result.success) {
            navigation.navigate('CoachSetup');
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollContent: {
            padding: spacing.lg,
            paddingBottom: spacing.xxl,
        },
        title: {
            ...textStyles.h2,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        subtitle: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            marginBottom: spacing.xl,
        },
        section: {
            marginBottom: spacing.xl,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        optionsContainer: {
            flexDirection: 'row',
            gap: spacing.sm,
        },
        option: {
            flex: 1,
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'transparent',
        },
        optionSelected: {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary + '20',
        },
        optionIcon: {
            fontSize: 32,
            marginBottom: spacing.xs,
        },
        optionLabel: {
            ...textStyles.bodySmall,
            color: theme.colors.text,
            textAlign: 'center',
        },
        sliderContainer: {
            marginBottom: spacing.lg,
        },
        sliderLabel: {
            ...textStyles.body,
            color: theme.colors.text,
            marginBottom: spacing.xs,
        },
        sliderValue: {
            ...textStyles.h3,
            color: theme.colors.primary,
            textAlign: 'center',
            marginBottom: spacing.sm,
        },
        sliderUnit: {
            ...textStyles.bodySmall,
            color: theme.colors.textSecondary,
        },
        error: {
            ...textStyles.bodySmall,
            color: theme.colors.error,
            textAlign: 'center',
            marginBottom: spacing.md,
        },
        buttonContainer: {
            padding: spacing.lg,
            paddingBottom: spacing.xl,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                <Text style={styles.title}>Let's Set Up Your Profile</Text>
                <Text style={styles.subtitle}>
                    This helps us personalize your fitness journey
                </Text>

                {errors.general && <Text style={styles.error}>{errors.general}</Text>}

                {/* Gender Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('profile.gender')}</Text>
                    <View style={styles.optionsContainer}>
                        {genderOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.option,
                                    formData.gender === option.value && styles.optionSelected,
                                ]}
                                onPress={() => setFormData({ ...formData, gender: option.value })}
                            >
                                <Text style={styles.optionIcon}>{option.icon}</Text>
                                <Text style={styles.optionLabel}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Age Slider */}
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderLabel}>{t('profile.age')}</Text>
                    <Text style={styles.sliderValue}>
                        {formData.age} <Text style={styles.sliderUnit}>years</Text>
                    </Text>
                    <Slider
                        minimumValue={15}
                        maximumValue={80}
                        step={1}
                        value={formData.age}
                        onValueChange={(value) => setFormData({ ...formData, age: value })}
                        minimumTrackTintColor={theme.colors.primary}
                        maximumTrackTintColor={theme.colors.border}
                    />
                </View>

                {/* Height Slider */}
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderLabel}>{t('profile.height')}</Text>
                    <Text style={styles.sliderValue}>
                        {formData.height} <Text style={styles.sliderUnit}>cm</Text>
                    </Text>
                    <Slider
                        minimumValue={140}
                        maximumValue={220}
                        step={1}
                        value={formData.height}
                        onValueChange={(value) => setFormData({ ...formData, height: value })}
                        minimumTrackTintColor={theme.colors.primary}
                        maximumTrackTintColor={theme.colors.border}
                    />
                </View>

                {/* Weight Slider */}
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderLabel}>{t('profile.currentWeight')}</Text>
                    <Text style={styles.sliderValue}>
                        {formData.weight} <Text style={styles.sliderUnit}>kg</Text>
                    </Text>
                    <Slider
                        minimumValue={40}
                        maximumValue={150}
                        step={1}
                        value={formData.weight}
                        onValueChange={(value) => setFormData({ ...formData, weight: value })}
                        minimumTrackTintColor={theme.colors.primary}
                        maximumTrackTintColor={theme.colors.border}
                    />
                </View>

                {/* Fitness Level */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('profile.fitnessLevel')}</Text>
                    <View style={styles.optionsContainer}>
                        {fitnessLevels.map((level) => (
                            <TouchableOpacity
                                key={level.value}
                                style={[
                                    styles.option,
                                    formData.fitnessLevel === level.value && styles.optionSelected,
                                ]}
                                onPress={() => setFormData({ ...formData, fitnessLevel: level.value })}
                            >
                                <Text style={styles.optionIcon}>{level.icon}</Text>
                                <Text style={styles.optionLabel}>{level.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Fixed Button Outside ScrollView */}
            <View style={styles.buttonContainer}>
                <Button title={t('common.next')} onPress={handleContinue} />
            </View>
        </SafeAreaView>
    );
};
