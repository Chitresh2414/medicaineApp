import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
// CHANGE THIS IMPORT
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { COLORS, SPACING, FONTS } from '../constants/theme';

const AppInput = ({ label, icon, error, ...props }) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <View style={[styles.inputContainer, error && styles.inputError]}>
      {/* CHANGE COMPONENT NAME HERE */}
      <MaterialCommunityIcons name={icon} size={22} color={error ? COLORS.error : COLORS.primary} style={styles.icon} />
      <TextInput 
        style={styles.input} 
        placeholderTextColor={COLORS.textSub} 
        {...props} 
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.m, width: '100%' },
  label: {
    ...FONTS.medium,
    color: COLORS.textMain,
    marginBottom: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16, // Matching your new modern look
    paddingHorizontal: SPACING.m,
    height: 58,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  input: { 
    flex: 1, 
    color: COLORS.textMain, 
    fontSize: 16,
    ...FONTS.regular // Apply your Montserrat font
  },
  icon: { marginRight: SPACING.s },
  errorText: { 
    ...FONTS.regular,
    color: 'red', // Or COLORS.error
    fontSize: 12, 
    marginTop: 4 
  },
  inputError: { borderColor: 'red' } // Or COLORS.error
});

export default AppInput;