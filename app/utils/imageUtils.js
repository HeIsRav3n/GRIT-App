import { Platform } from 'react-native';

/**
 * Check if an image URI is valid for web display
 * Blob URLs don't persist after page refresh on web
 */
export const isValidImageUri = (uri) => {
    if (!uri) return false;

    // On web, blob URLs and file:// URLs don't work after refresh
    if (Platform.OS === 'web') {
        if (uri.startsWith('blob:')) return false;
        if (uri.startsWith('file:')) return false;
    }

    return true;
};

/**
 * Get a safe image URI or null if invalid
 */
export const getSafeImageUri = (uri) => {
    if (isValidImageUri(uri)) {
        return uri;
    }
    return null;
};
