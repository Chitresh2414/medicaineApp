import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';

const CustomButton = ({ title, onPress, disabled, loading, style, titleStyle }) => (
  <TouchableOpacity 
    onPress={onPress} 
    disabled={disabled || loading}
    style={[
      styles.button, 
      disabled && styles.disabled, 
      !disabled && SHADOWS.small,
      style
    ]}
  >
    {loading ? (
      <ActivityIndicator color={COLORS.white} />
    ) : (
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  disabled: { backgroundColor: COLORS.textSub, opacity: 0.6 },
  title: { ...FONTS.bold, color: COLORS.white, fontSize: 16 },
});

export default CustomButton;