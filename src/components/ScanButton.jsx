import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomText from './CustomText';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';

/**
 * Clean Code Principle: 
 * This component has one responsibility: 
 * Rendering a clickable card for AI actions.
 */
const ScanButton = ({ icon, label, onPress }) => (
  <TouchableOpacity 
    style={[styles.card, SHADOWS.small]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.iconCircle}>
      <MaterialCommunityIcons name={icon} size={26} color={COLORS.primary} />
    </View>
    <CustomText fontWeight="medium" style={styles.text}>
      {label}
    </CustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    width: '48%', // Allows two buttons to sit side-by-side
    paddingVertical: SPACING.l,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9', // Subtle light border
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F7FF', // Very light blue background for the icon
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  text: { 
    fontSize: 14, 
    color: COLORS.primaryDark,
    textAlign: 'center'
  },
});

export default ScanButton;