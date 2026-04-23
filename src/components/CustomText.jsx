import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

const CustomText = ({ children, style, fontWeight = 'regular', color = COLORS.textMain, ...props }) => {
  const getFontFamily = () => {
    if (fontWeight === 'bold') return FONTS.bold;
    if (fontWeight === 'medium') return FONTS.medium;
    return FONTS.regular;
  };

  return (
    <Text style={[styles.text, { color }, getFontFamily(), style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 16 },
});

export default CustomText;