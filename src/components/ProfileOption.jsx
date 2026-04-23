import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const ProfileOption = ({ icon, label, onPress, isDestructive = false }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <MaterialCommunityIcons 
      name={icon} 
      size={24} 
      color={isDestructive ? COLORS.error : COLORS.primary} 
    />
    <Text style={[styles.label, isDestructive && { color: COLORS.error }]}>
      {label}
    </Text>
    <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.border} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  label: { ...FONTS.medium, flex: 1, marginLeft: SPACING.m, fontSize: 16, color: COLORS.textMain },
});

export default ProfileOption;