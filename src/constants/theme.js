// constants/theme.js

export const COLORS = {
  // A cleaner, softer off-white for the background
  background: '#F8FAFC', 
  
  // A more vibrant, professional Teal/Indigo for "Medical Trust"
  primary: '#0D9488',     // Teal 600 (Main buttons/brand)
  primaryLight: '#CCFBF1', // Teal 100 (For light backgrounds/badges)
  primaryDark: '#0F172A',  // Slate 900 (For high-contrast text/headers)

  // Feedback colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Typography
  textMain: '#1E293B',    // Slate 800 (Better readability than pure black)
  textSub: '#64748B',     // Slate 500 (For secondary info)
  
  white: '#FFFFFF',
  border: '#E2E8F0',      // Subtle Slate 200
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
  xxl: 64,
};

// Montserrat Font Mapping with Style Objects
// This allows you to use ...FONTS.bold in your StyleSheet
export const FONTS = {
  bold: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
  medium: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
  },
  regular: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  },
  light: {
    fontFamily: 'Montserrat-Light',
    fontWeight: '300',
  },
};

// Added Shadow Constants for that "Modern Card" look
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
};