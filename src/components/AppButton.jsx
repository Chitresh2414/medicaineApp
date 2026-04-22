import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';

const AppButton = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity 
    style={[styles.button, SHADOWS.small, style]} 
    onPress={onPress} 
    activeOpacity={0.8}
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary, // Brand Teal
    paddingVertical: 16,
    borderRadius: 16, // Matching the soft modern corners of your Login/SignUp
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: { 
    ...FONTS.bold, // Spreading the Montserrat-Bold object
    color: COLORS.white, // Changed to White for high contrast on Teal
    fontSize: 18,
  },
});

export default AppButton;