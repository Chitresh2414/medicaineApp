import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { COLORS, SPACING, FONTS } from '../constants/theme';

const AppInput = ({ 
  label, 
  icon, 
  rightIcon,          // New Prop
  onRightIconPress,   // New Prop 
  error, 
  ...props 
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    
    <View style={[
      styles.inputContainer, 
      error ? styles.inputError : null
    ]}>
      {/* Left Icon */}
      {icon && (
        <MaterialCommunityIcons 
          name={icon} 
          size={22} 
          color={error ? COLORS.error : COLORS.primary} 
          style={styles.icon} 
        />
      )}

      <TextInput 
        style={styles.input} 
        placeholderTextColor={COLORS.textSub} 
        {...props} 
      />

      {/* Right Action Icon (For Password Visibility) */}
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} activeOpacity={0.6}>
          <MaterialCommunityIcons 
            name={rightIcon} 
            size={22} 
            color={COLORS.textSub} 
            style={styles.rightIcon} 
          />
        </TouchableOpacity>
      )}
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
    borderRadius: 16,
    paddingHorizontal: SPACING.m,
    height: 58,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  input: { 
    flex: 1, 
    color: COLORS.textMain, 
    fontSize: 16,
    ...FONTS.regular,
    paddingVertical: 0, // Fixes vertical alignment on some Android devices
  },
  icon: { marginRight: SPACING.s },
  rightIcon: { marginLeft: SPACING.s },
  errorText: { 
    ...FONTS.regular,
    color: COLORS.error, 
    fontSize: 12, 
    marginTop: 4 
  },
  inputError: { borderColor: COLORS.error }
});

export default AppInput;