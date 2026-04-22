import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Updated import to match your new theme file
import { COLORS, FONTS, SHADOWS } from '../constants/theme';

const DateCard = ({ date, day, active }) => (
  <View style={[
    styles.card, 
    active ? [styles.activeCard, SHADOWS.small] : styles.inactiveCard
  ]}>
    <Text style={[styles.dayText, active && styles.activeText]}>{day}</Text>
    <Text style={[styles.dateText, active && styles.activeText]}>{date}</Text>
    
    {/* Modern indicator dot for active day */}
    {active && <View style={styles.activeDot} />}
  </View>
);

const styles = StyleSheet.create({
  card: { 
    width: 60, 
    height: 90, 
    borderRadius: 20, // More rounded for modern look
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12,
    borderWidth: 1,
  },
  inactiveCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  activeCard: { 
    backgroundColor: COLORS.primary, // Using your new Teal
    borderColor: COLORS.primary,
  },
  dayText: { 
    ...FONTS.medium, // Using font spread
    fontSize: 12, 
    color: COLORS.textSub, 
    textTransform: 'uppercase' 
  },
  dateText: { 
    ...FONTS.bold, 
    fontSize: 20, 
    color: COLORS.primaryDark, 
    marginTop: 4 
  },
  activeText: { 
    color: COLORS.white 
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.white,
    marginTop: 6
  }
});

export default DateCard;