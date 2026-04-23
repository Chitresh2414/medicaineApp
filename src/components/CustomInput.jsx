import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { COLORS, SPACING, FONTS } from '../constants/theme';

const CustomInput = ({ icon, error, ...props }) => (
  <View style={styles.container}>
    <View style={[styles.inputContainer, error && styles.inputError]}>
      {icon && (
        <MaterialCommunityIcons 
          name={icon} 
          size={20} 
          color={error ? COLORS.error : COLORS.primary} 
          style={styles.icon} 
        />
      )}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.m,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: { flex: 1, color: COLORS.textMain, fontSize: 16, ...FONTS.regular },
  icon: { marginRight: SPACING.s },
  errorText: { color: COLORS.error, fontSize: 12, marginTop: 4, ...FONTS.regular },
  inputError: { borderColor: COLORS.error }
});

export default CustomInput;