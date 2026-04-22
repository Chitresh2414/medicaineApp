import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../constants/theme';

const InputField = ({ icon, error, ...props }) => (
  <View style={styles.outerContainer}>
    <View style={[
      styles.container, 
      error ? styles.errorBorder : styles.normalBorder
    ]}>
      {/* Icon with modern Teal primary color */}
      <MaterialCommunityIcons 
        name={icon} 
        size={22} 
        color={error ? COLORS.error : COLORS.primary} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholderTextColor={COLORS.textSub}
        autoCapitalize="none"
        {...props} 
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: SPACING.m,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white, // Contained look
    borderRadius: 16, // Softer, modern corners
    paddingHorizontal: SPACING.m,
    height: 58, // Taller touch target
    // Subtle shadow for the modern 2026 feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  normalBorder: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  errorBorder: {
    borderWidth: 1.5,
    borderColor: COLORS.error || '#EF4444',
  },
  input: { 
    flex: 1, 
    fontSize: 16, 
    marginLeft: SPACING.s, 
    color: COLORS.textMain,
    ...FONTS.regular, // Correctly spreading the font object
  },
});

export default InputField;