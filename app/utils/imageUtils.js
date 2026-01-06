import { Platform } from 'react-native';

/**
 * Check if an image URI is valid for web display
 * Blob URLs don't persist after page refresh on web
 * Data URIs (base64) are allowed and persist
 */
export const isValidImageUri = (uri) => {
    if (!uri) return false;

    // Data URIs (base64) work everywhere
    if (uri.startsWith('data:')) return true;

    // HTTP/HTTPS URLs work everywhere
    if (uri.startsWith('http://') || uri.startsWith('https://')) return true;

    // On web, blob URLs and file:// URLs don't work after refresh
    if (Platform.OS === 'web') {
        if (uri.startsWith('blob:')) return false;
        if (uri.startsWith('file:')) return false;
    }

    // On native, allow all
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
