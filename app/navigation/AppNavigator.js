import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

// Auth Screens
import { SplashScreen } from '../screens/auth/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';

// Onboarding
import { ProfileSetupScreen } from '../screens/onboarding/ProfileSetupScreen';
import { CoachSetupScreen } from '../screens/onboarding/CoachSetupScreen';

// Main Screens
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { WorkoutScreen } from '../screens/workout/WorkoutScreen';
import { ExerciseDetailScreen } from '../screens/workout/ExerciseDetailScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { RewardsScreen } from '../screens/rewards/RewardsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { QRCodeScreen } from '../screens/qr/QRCodeScreen';

// Placeholder screens - defined as proper components to avoid re-render issues
const HealthScreen = () => {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.text, fontSize: 24 }}>Health</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>Coming soon...</Text>
        </View>
    );
};

const SettingsScreen = () => {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.text, fontSize: 24 }}>Settings</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>Coming soon...</Text>
        </View>
    );
};

const EditProfileScreen = () => {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.text, fontSize: 24 }}>Edit Profile</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>Coming soon...</Text>
        </View>
    );
};

const HydrationScreen = () => {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.text, fontSize: 24 }}>Hydration</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>Coming soon...</Text>
        </View>
    );
};

const ProgressScreen = () => {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.text, fontSize: 24 }}>Progress</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>Coming soon...</Text>
        </View>
    );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
            <Stack.Screen name="CoachSetup" component={CoachSetupScreen} />
        </Stack.Navigator>
    );
};

// Workout Stack
const WorkoutStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WorkoutHome" component={WorkoutScreen} />
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
        </Stack.Navigator>
    );
};

// Chat Stack
const ChatStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ChatHome" component={ChatScreen} />
        </Stack.Navigator>
    );
};

// Profile Stack
const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileHome" component={ProfileScreen} />
            <Stack.Screen name="QRCode" component={QRCodeScreen} />
            <Stack.Screen name="Health" component={HealthScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    );
};

// Main Tab Navigator
const MainTabs = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.card,
                    borderTopColor: theme.colors.border,
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textTertiary,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
                tabBarLabelPosition: 'below-icon',
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Text style={{ fontSize: focused ? 26 : 24 }}>🏠</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Workout"
                component={WorkoutStack}
                options={{
                    tabBarLabel: 'Workout',
                    tabBarIcon: ({ color, focused }) => (
                        <Text style={{ fontSize: focused ? 26 : 24 }}>💪</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatStack}
                options={{
                    tabBarLabel: 'Coach',
                    tabBarIcon: ({ color, focused }) => (
                        <Text style={{ fontSize: focused ? 26 : 24 }}>💬</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Rewards"
                component={RewardsScreen}
                options={{
                    tabBarLabel: 'Rewards',
                    tabBarIcon: ({ color, focused }) => (
                        <Text style={{ fontSize: focused ? 26 : 24 }}>🏆</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Text style={{ fontSize: focused ? 26 : 24 }}>👤</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// Root Navigator
export const AppNavigator = () => {
    const { theme } = useTheme();
    const { isAuthenticated, onboardingComplete, isLoading } = useAuth();

    // Debug logging
    console.log('🔍 AppNavigator State:', { isAuthenticated, onboardingComplete, isLoading });

    // Show loading screen instead of null to prevent blank page
    if (isLoading) {
        console.log('⏳ Showing loading screen...');
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 48, marginBottom: 16 }}>💪</Text>
                <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: 'bold' }}>GRIT</Text>
                <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>Loading...</Text>
            </View>
        );
    }

    // FIX: If not logged in OR onboarding isn't finished, show AuthStack
    if (!isAuthenticated || !onboardingComplete) {
        console.log('🔐 Showing Auth Stack');
    } else {
        console.log('✅ Showing Main Tabs');
    }

    return (
        <NavigationContainer
            theme={{
                dark: theme.isDark,
                colors: {
                    primary: theme.colors.primary,
                    background: theme.colors.background,
                    card: theme.colors.card,
                    text: theme.colors.text,
                    border: theme.colors.border,
                    notification: theme.colors.primary,
                },
                fonts: {
                    regular: {
                        fontFamily: 'System',
                        fontWeight: '400',
                    },
                    medium: {
                        fontFamily: 'System',
                        fontWeight: '500',
                    },
                    bold: {
                        fontFamily: 'System',
                        fontWeight: '700',
                    },
                    heavy: {
                        fontFamily: 'System',
                        fontWeight: '800',
                    },
                },
            }}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated || !onboardingComplete ? (
                    <Stack.Screen name="Auth" component={AuthStack} />
                ) : (
                    <>
                        <Stack.Screen name="Main" component={MainTabs} />
                        <Stack.Screen name="Hydration" component={HydrationScreen} />
                        <Stack.Screen name="Progress" component={ProgressScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
