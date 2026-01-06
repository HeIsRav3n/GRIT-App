// Color palette for GRIT app with dark and light themes
// Ensures high contrast and legibility

export const colors = {
  light: {
    // Primary colors
    primary: '#FF6B35',        // Vibrant orange for primary actions
    primaryDark: '#E85A2A',    // Darker shade for pressed states
    secondary: '#4ECDC4',      // Teal for secondary elements
    accent: '#FFE66D',         // Yellow for highlights
    
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F7F7F7',
    backgroundTertiary: '#EEEEEE',
    card: '#FFFFFF',
    cardElevated: '#FAFAFA',
    
    // Text colors - High contrast for legibility
    text: '#1A1A1A',
    textSecondary: '#4A4A4A',
    textTertiary: '#7A7A7A',
    textInverse: '#FFFFFF',
    
    // Border colors
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    
    // Status colors
    success: '#4CAF50',
    successLight: '#E8F5E9',
    warning: '#FF9800',
    warningLight: '#FFF3E0',
    error: '#F44336',
    errorLight: '#FFEBEE',
    info: '#2196F3',
    infoLight: '#E3F2FD',
    
    // Feature-specific colors
    streak: '#FF6B35',
    hydration: '#2196F3',
    workout: '#9C27B0',
    cardio: '#FF5722',
    
    // Footer color - Sleepy green
    footer: '#7BA05B',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
  },
  
  dark: {
    // Primary colors
    primary: '#FF6B35',
    primaryDark: '#E85A2A',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
    
    // Background colors
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    backgroundTertiary: '#2A2A2A',
    card: '#1E1E1E',
    cardElevated: '#2A2A2A',
    
    // Text colors - High contrast for legibility
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    textInverse: '#1A1A1A',
    
    // Border colors
    border: '#3A3A3A',
    borderLight: '#2A2A2A',
    
    // Status colors
    success: '#66BB6A',
    successLight: '#1B5E20',
    warning: '#FFA726',
    warningLight: '#E65100',
    error: '#EF5350',
    errorLight: '#B71C1C',
    info: '#42A5F5',
    infoLight: '#0D47A1',
    
    // Feature-specific colors
    streak: '#FF6B35',
    hydration: '#42A5F5',
    workout: '#AB47BC',
    cardio: '#FF7043',
    
    // Footer color - Sleepy green
    footer: '#7BA05B',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
  },
};

// Gradient combinations
export const gradients = {
  primary: ['#FF6B35', '#E85A2A'],
  secondary: ['#4ECDC4', '#3DBDB4'],
  success: ['#66BB6A', '#4CAF50'],
  workout: ['#9C27B0', '#7B1FA2'],
  cardio: ['#FF5722', '#E64A19'],
};
