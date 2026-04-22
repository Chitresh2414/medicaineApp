import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { COLORS, FONTS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.55; // Scales ring based on screen width

const IntakeTracker = ({ current = 0, total = 0, day = "Today" }) => {
  // Logic: Avoid division by zero and keep code clean
  const progressPercent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.outerCircle, SHADOWS.medium]}>
        <View style={styles.innerCircle}>
          <Text style={styles.label}>INTAKES</Text>
          
          <View style={styles.countContainer}>
            <Text style={styles.currentCount}>{current}</Text>
            <Text style={styles.totalCount}> / {total}</Text>
          </View>

          <Text style={styles.dayText}>{day}</Text>
          
          {/* Subtle percentage indicator */}
          <View style={styles.percentageBadge}>
            <Text style={styles.percentageText}>{progressPercent}% Done</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    marginVertical: 20 
  },
  outerCircle: { 
    width: CIRCLE_SIZE, 
    height: CIRCLE_SIZE, 
    borderRadius: CIRCLE_SIZE / 2, 
    backgroundColor: COLORS.white,
    borderWidth: 10, 
    borderColor: '#F1F5F9', // Modern Slate-50
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  innerCircle: { 
    width: CIRCLE_SIZE - 30, 
    height: CIRCLE_SIZE - 30, 
    borderRadius: (CIRCLE_SIZE - 30) / 2, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  label: { 
    ...FONTS.bold, 
    fontSize: 14, 
    color: COLORS.textSub, 
    letterSpacing: 2,
    textTransform: 'uppercase'
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 2,
  },
  currentCount: { 
    ...FONTS.bold, 
    fontSize: 58, 
    color: COLORS.primary 
  },
  totalCount: { 
    ...FONTS.bold, 
    fontSize: 28, 
    color: COLORS.primaryDark 
  },
  dayText: { 
    ...FONTS.medium, 
    fontSize: 16, 
    color: COLORS.textMain,
    marginTop: -5
  },
  percentageBadge: {
    marginTop: 10,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  percentageText: {
    ...FONTS.bold,
    fontSize: 12,
    color: COLORS.primary,
  }
});

export default IntakeTracker;