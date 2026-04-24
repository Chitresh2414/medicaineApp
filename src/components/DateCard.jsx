import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';

// STYLES AT TOP: Industry standard to prevent reference errors
const styles = StyleSheet.create({
  card: { 
    width: 62, // Slightly wider for better spacing
    height: 95, 
    borderRadius: 22, 
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
    backgroundColor: COLORS.primary, 
    borderColor: COLORS.primary,
  },
  dayText: { 
    ...FONTS.medium, 
    fontSize: 11, 
    color: COLORS.textSub, 
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  dateText: { 
    ...FONTS.bold, 
    fontSize: 22, 
    color: COLORS.primaryDark, 
    marginTop: 2 
  },
  activeText: { 
    color: COLORS.white 
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.white,
    marginTop: 8,
    opacity: 0.9
  }
});

const DateCard = ({ date, day, active }) => (
  <View style={[
    styles.card, 
    active ? [styles.activeCard, SHADOWS.medium] : styles.inactiveCard
  ]}>
    <Text style={[styles.dayText, active && styles.activeText]}>
      {day}
    </Text>
    
    <Text style={[styles.dateText, active && styles.activeText]}>
      {date}
    </Text>
    
    {/* Modern indicator dot - helps the eye find "Today" instantly */}
    {active && <View style={styles.activeDot} />}
  </View>
);

export default DateCard;