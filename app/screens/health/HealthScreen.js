import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { textStyles } from '../../theme/typography';
import { spacing, borderRadius, shadows } from '../../theme/spacing';
import { useTranslation } from 'react-i18next';
import Slider from '@react-native-community/slider';

export const HealthScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const { user, updateProfile } = useAuth();
    const { t } = useTranslation();

    const [healthData, setHealthData] = useState({
        weight: user?.weight || 70,
        height: user?.height || 170,
        bodyFat: 20,
        waterIntake: 2500,
        sleepHours: 7,
        restingHeartRate: 70,
    });

    const [conditions, setConditions] = useState([]);

    const healthConditionsList = [
        { id: 'diabetes', label: 'Diabetes', icon: '🩺' },
        { id: 'hypertension', label: 'Hypertension', icon: '❤️‍🩹' },
        { id: 'asthma', label: 'Asthma', icon: '🫁' },
        { id: 'backPain', label: 'Back Pain', icon: '🦴' },
        { id: 'jointIssues', label: 'Joint Issues', icon: '🦵' },
        { id: 'none', label: 'None', icon: '✅' },
    ];

    useEffect(() => {
        loadHealthData();
    }, []);

    const loadHealthData = async () => {
        try {
            const data = await AsyncStorage.getItem('healthData');
            if (data) {
                const parsed = JSON.parse(data);
                setHealthData(parsed.metrics || healthData);
                setConditions(parsed.conditions || []);
            }
        } catch (error) {
            console.log('Error loading health data:', error);
        }
    };

    const saveHealthData = async () => {
        try {
            await AsyncStorage.setItem('healthData', JSON.stringify({
                metrics: healthData,
                conditions: conditions,
            }));

            // Also update user profile
            await updateProfile({
                weight: healthData.weight,
                height: healthData.height,
            });

            navigation.goBack();
        } catch (error) {
            console.log('Error saving health data:', error);
        }
    };

    const toggleCondition = (conditionId) => {
        if (conditionId === 'none') {
            setConditions([]);
        } else {
            if (conditions.includes(conditionId)) {
                setConditions(conditions.filter(c => c !== conditionId));
            } else {
                setConditions([...conditions.filter(c => c !== 'none'), conditionId]);
            }
        }
    };

    const calculateBMI = () => {
        const heightM = healthData.height / 100;
        const bmi = healthData.weight / (heightM * heightM);
        return bmi.toFixed(1);
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { label: 'Underweight', color: theme.colors.warning };
        if (bmi < 25) return { label: 'Normal', color: theme.colors.success };
        if (bmi < 30) return { label: 'Overweight', color: theme.colors.warning };
        return { label: 'Obese', color: theme.colors.error };
    };

    const bmi = calculateBMI();
    const bmiCategory = getBMICategory(parseFloat(bmi));

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
            color: theme.colors.text,
        },
        headerTitle: {
            ...textStyles.h3,
            color: theme.colors.text,
            flex: 1,
        },
        scrollContent: {
            padding: spacing.lg,
            paddingBottom: 200,
            flexGrow: 1,
        },
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            ...shadows.medium,
        },
        sectionTitle: {
            ...textStyles.h4,
            color: theme.colors.text,
            marginBottom: spacing.md,
        },
        bmiCard: {
            alignItems: 'center',
            paddingVertical: spacing.xl,
        },
        bmiValue: {
            fontSize: 48,
            fontWeight: 'bold',
            color: bmiCategory.color,
        },
        bmiLabel: {
            ...textStyles.h4,
            color: bmiCategory.color,
            marginBottom: spacing.md,
        },
        bmiDescription: {
            ...textStyles.body,
            color: theme.colors.textSecondary,
            textAlign: 'center',
        },
        sliderContainer: {
            marginBottom: spacing.lg,
        },
        sliderLabel: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing.xs,
        },
        sliderLabelText: {
            ...textStyles.body,
            color: theme.colors.text,
        },
        sliderValue: {
            ...textStyles.body,
            color: theme.colors.primary,
            fontWeight: 'bold',
        },
        conditionsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
        },
        conditionItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            minWidth: '45%',
            flex: 1,
            borderWidth: 2,
            borderColor: 'transparent',
        },
        conditionSelected: {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary + '20',
        },
        conditionIcon: {
            fontSize: 20,
            marginRight: spacing.sm,
        },
        conditionLabel: {
            ...textStyles.bodySmall,
            color: theme.colors.text,
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
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('health.title')}</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                {/* BMI Card */}
                <View style={[styles.card, styles.bmiCard]}>
                    <Text style={styles.sectionTitle}>Your BMI</Text>
                    <Text style={styles.bmiValue}>{bmi}</Text>
                    <Text style={styles.bmiLabel}>{bmiCategory.label}</Text>
                    <Text style={styles.bmiDescription}>
                        Based on your height and weight measurements
                    </Text>
                </View>

                {/* Body Metrics */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>{t('health.bodyMetrics')}</Text>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderLabel}>
                            <Text style={styles.sliderLabelText}>{t('profile.weight')}</Text>
                            <Text style={styles.sliderValue}>{healthData.weight} kg</Text>
                        </View>
                        <Slider
                            minimumValue={40}
                            maximumValue={150}
                            step={0.5}
                            value={healthData.weight}
                            onValueChange={(value) => setHealthData({ ...healthData, weight: value })}
                            minimumTrackTintColor={theme.colors.primary}
                            maximumTrackTintColor={theme.colors.border}
                        />
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderLabel}>
                            <Text style={styles.sliderLabelText}>{t('profile.height')}</Text>
                            <Text style={styles.sliderValue}>{healthData.height} cm</Text>
                        </View>
                        <Slider
                            minimumValue={140}
                            maximumValue={220}
                            step={1}
                            value={healthData.height}
                            onValueChange={(value) => setHealthData({ ...healthData, height: value })}
                            minimumTrackTintColor={theme.colors.primary}
                            maximumTrackTintColor={theme.colors.border}
                        />
                    </View>

                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderLabel}>
                            <Text style={styles.sliderLabelText}>Body Fat %</Text>
                            <Text style={styles.sliderValue}>{healthData.bodyFat}%</Text>
                        </View>
                        <Slider
                            minimumValue={5}
                            maximumValue={50}
                            step={1}
                            value={healthData.bodyFat}
                            onValueChange={(value) => setHealthData({ ...healthData, bodyFat: value })}
                            minimumTrackTintColor={theme.colors.primary}
                            maximumTrackTintColor={theme.colors.border}
                        />
                    </View>
                </View>

                {/* Health Conditions */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>{t('health.healthConditions')}</Text>
                    <View style={styles.conditionsGrid}>
                        {healthConditionsList.map((condition) => (
                            <TouchableOpacity
                                key={condition.id}
                                style={[
                                    styles.conditionItem,
                                    (conditions.includes(condition.id) || (condition.id === 'none' && conditions.length === 0)) && styles.conditionSelected,
                                ]}
                                onPress={() => toggleCondition(condition.id)}
                            >
                                <Text style={styles.conditionIcon}>{condition.icon}</Text>
                                <Text style={styles.conditionLabel}>{condition.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button title={t('health.saveChanges')} onPress={saveHealthData} />
            </View>
        </SafeAreaView>
    );
};
