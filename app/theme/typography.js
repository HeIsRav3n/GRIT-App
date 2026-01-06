// Typography system for GRIT app
// Clear hierarchy for headings, body text, and secondary text

export const typography = {
    // Font families
    fonts: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
    },

    // Font sizes
    sizes: {
        h1: 32,
        h2: 28,
        h3: 24,
        h4: 20,
        h5: 18,
        body: 16,
        bodySmall: 14,
        caption: 12,
        tiny: 10,
    },

    // Font weights
    weights: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },

    // Line heights
    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};

// Pre-defined text styles
export const textStyles = {
    h1: {
        fontSize: typography.sizes.h1,
        fontWeight: typography.weights.bold,
        lineHeight: typography.sizes.h1 * typography.lineHeights.tight,
    },
    h2: {
        fontSize: typography.sizes.h2,
        fontWeight: typography.weights.bold,
        lineHeight: typography.sizes.h2 * typography.lineHeights.tight,
    },
    h3: {
        fontSize: typography.sizes.h3,
        fontWeight: typography.weights.semibold,
        lineHeight: typography.sizes.h3 * typography.lineHeights.tight,
    },
    h4: {
        fontSize: typography.sizes.h4,
        fontWeight: typography.weights.semibold,
        lineHeight: typography.sizes.h4 * typography.lineHeights.normal,
    },
    h5: {
        fontSize: typography.sizes.h5,
        fontWeight: typography.weights.medium,
        lineHeight: typography.sizes.h5 * typography.lineHeights.normal,
    },
    body: {
        fontSize: typography.sizes.body,
        fontWeight: typography.weights.regular,
        lineHeight: typography.sizes.body * typography.lineHeights.normal,
    },
    bodyBold: {
        fontSize: typography.sizes.body,
        fontWeight: typography.weights.bold,
        lineHeight: typography.sizes.body * typography.lineHeights.normal,
    },
    bodySmall: {
        fontSize: typography.sizes.bodySmall,
        fontWeight: typography.weights.regular,
        lineHeight: typography.sizes.bodySmall * typography.lineHeights.normal,
    },
    caption: {
        fontSize: typography.sizes.caption,
        fontWeight: typography.weights.regular,
        lineHeight: typography.sizes.caption * typography.lineHeights.normal,
    },
    button: {
        fontSize: typography.sizes.body,
        fontWeight: typography.weights.semibold,
        lineHeight: typography.sizes.body * typography.lineHeights.tight,
    },
};
