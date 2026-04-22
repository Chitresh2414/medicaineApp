import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { formatTo12Hour } from '../utils/timeHelper';

// Added default values in destructuring for robustness
const MedicineItem = memo(({ 
  name = "Unnamed Medicine", 
  dose = "Dosage not set", 
  time = new Date(), 
  iconName = 'pill', 
  completed = false, 
  onPress 
}) => {
  
  // Clean Code: Move style logic to variables for readability
  const statusColor = completed ? COLORS.primary : COLORS.border;
  const tagBackground = completed ? COLORS.primaryLight : '#F1F5F9';
  const textColor = completed ? COLORS.primary : COLORS.primaryDark;

  return (
    <TouchableOpacity 
      style={[styles.card, completed && styles.completedCard]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress} // Disable feedback if no action is provided
    >
      {/* Left: Status Checkbox */}
      <View style={styles.iconContainer}>
         <MaterialCommunityIcons 
           name={completed ? "check-circle" : "circle-outline"} 
           size={26} 
           color={statusColor} 
         />
      </View>
      
      {/* Middle: Name & Dose */}
      <View style={styles.info}>
        <Text 
          numberOfLines={1} 
          style={[styles.name, completed && styles.completedText]}
        >
          {name}
        </Text>
        <Text style={styles.dose}>{dose}</Text>
      </View>

      {/* Right: Time Tag & Type Icon */}
      <View style={styles.rightSection}>
        <View style={[styles.timeTag, { backgroundColor: tagBackground }]}>
          <Text style={[styles.timeText, { color: textColor }]}>
            {formatTo12Hour(time)}
          </Text>
        </View>
        
        <MaterialCommunityIcons 
          name={iconName} 
          size={22} 
          color={completed ? COLORS.primary : COLORS.textSub} 
        />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: 20,
    marginBottom: SPACING.m,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  completedCard: {
    opacity: 0.7,
    backgroundColor: '#F8FAFC',
  },
  iconContainer: { marginRight: SPACING.m },
  info: { flex: 1 },
  name: { 
    ...FONTS.bold, 
    fontSize: 17, 
    color: COLORS.primaryDark, 
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.textSub,
  },
  dose: { 
    ...FONTS.regular, 
    fontSize: 13, 
    color: COLORS.textSub,
    marginTop: 2,
  },
  rightSection: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  timeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  timeText: { 
    ...FONTS.bold, 
    fontSize: 12,
  }
});

export default MedicineItem;