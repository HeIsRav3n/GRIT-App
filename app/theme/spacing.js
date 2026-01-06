// Spacing constants for consistent layout
import { Platform } from 'react-native';

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999,
};

export const shadows = {
    small: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
        android: {
            elevation: 2,
        },
        web: {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        },
        default: {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        },
    }),
    medium: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
        },
        android: {
            elevation: 4,
        },
        web: {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
        },
        default: {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
        },
    }),
    large: Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
        },
        android: {
            elevation: 8,
        },
        web: {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
        default: {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
    }),
};
