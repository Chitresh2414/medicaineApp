import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, FONTS, SPACING } from "../constants/theme";

import { formatTo12Hour } from "../utils/timeHelper";
import { getMedicineIcon } from "../constants/iconsmap";

const MedicineItem = ({
  name = "Unnamed Medicine",
  dose = "Dosage not set",

  // support multiple times
  time = [],

  iconName = "other",
  completed = false,

  onPress, // circle = Mark Done
  onCardPress, // double tap = Details Screen
}) => {
  const statusColor = completed ? COLORS.primary : COLORS.border;

  const tagBackground = completed ? COLORS.primaryLight : "#F1F5F9";

  const textColor = completed ? COLORS.primary : COLORS.primaryDark;

  // double tap logic
  const lastTap = React.useRef(null);

  const handleCardPress = () => {
    const now = Date.now();

    
      // single tap = Details Screen open
      onCardPress && onCardPress();
  

    lastTap.current = now;
  };

  // multiple reminder time formatter
  const renderTime = () => {
    if (Array.isArray(time) && time.length > 0) {
      return time.map((t) => formatTo12Hour(t)).join(", ");
    }

    if (typeof time === "string" && time) {
      return formatTo12Hour(time);
    }

    return "No Time";
  };

  return (
    <View style={[styles.card, completed && styles.completedCard]}>
      {/* LEFT → Mark as Done */}
      <TouchableOpacity
        onPress={onPress}
        style={styles.iconContainer}
        hitSlop={{
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        }}
      >
        <MaterialCommunityIcons
          name={completed ? "check-circle" : "circle-outline"}
          size={26}
          color={statusColor}
        />
      </TouchableOpacity>

      {/* CARD → Double tap for details */}
      <TouchableOpacity
        style={styles.cardContent}
        activeOpacity={0.7}
        onPress={handleCardPress}
      >
        <View style={styles.info}>
          <Text
            numberOfLines={1}
            style={[styles.name, completed && styles.completedText]}
          >
            {name}
          </Text>

          <Text style={styles.dose}>{dose}</Text>
        </View>

        <View style={styles.rightSection}>
          <View
            style={[
              styles.timeTag,
              {
                backgroundColor: tagBackground,
              },
            ]}
          >
            <Text
              numberOfLines={2}
              style={[
                styles.timeText,
                {
                  color: textColor,
                },
              ]}
            >
              {renderTime()}
            </Text>
          </View>

          <MaterialCommunityIcons
            name={getMedicineIcon(iconName)}
            size={22}
            color={completed ? COLORS.primary : COLORS.textSub}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: 20,
    marginBottom: SPACING.m,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  completedCard: {
    opacity: 0.7,
    backgroundColor: "#F8FAFC",
  },

  iconContainer: {
    marginRight: SPACING.m,
  },

  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  info: {
    flex: 1,
    paddingRight: 10,
  },

  name: {
    ...FONTS.bold,
    fontSize: 17,
    color: COLORS.primaryDark,
  },

  completedText: {
    textDecorationLine: "line-through",
    color: COLORS.textSub,
  },

  dose: {
    ...FONTS.regular,
    fontSize: 13,
    color: COLORS.textSub,
    marginTop: 2,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "50%",
  },

  timeTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    maxWidth: 140,
  },

  timeText: {
    ...FONTS.bold,
    fontSize: 12,
    textAlign: "center",
  },
});

export default MedicineItem;
