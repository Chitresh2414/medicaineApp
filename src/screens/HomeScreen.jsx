import React, { useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux"; // Hook into Redux

// Central theme and utilities
import { COLORS, SPACING, FONTS, SHADOWS } from "../constants/theme";
import { getGreeting, getCurrentMonthYear } from "../utils/timeHelper";
import { getDynamicWeek } from "../utils/calendarHelper";

// Sub-components
import DateCard from "../components/DateCard";
import IntakeTracker from "../components/IntakeTracker";
import MedicineItem from "../components/MedicineItem";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // 1. Pull data from Redux Store
  const medicines = useSelector((state) => state.intakes.medicines);
  const user = useSelector((state) => state.user);

  // 2. Dynamic Calendar Logic
  const days = useMemo(() => getDynamicWeek(new Date()), []);

  // 3. Dynamic progress calculation
  const completedCount = medicines.filter((m) => m.completed).length;
  const totalCount = medicines.length;
  const currentDayName = format(new Date(), "EEEE");

  // 4. Dispatch Redux Action to toggle completion
  const handleMarkAsDone = useCallback((id) => {
    dispatch({ type: 'TOGGLE_COMPLETION', payload: id });
  }, [dispatch]);

  const handleAddPress = useCallback(() => {
    navigation.navigate("AddMedicine");
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header Section - Now using Redux user data */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>{getGreeting()}, {user.name}!</Text>
          <Text style={styles.subWelcome}>Stay healthy today in {user.location}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.profileBadge, SHADOWS.small]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.profileLetter}>{user.profileLetter}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          <Text style={styles.monthLabel}>{getCurrentMonthYear()}</Text>
          <FlatList
            data={days}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.calendarList}
            renderItem={({ item }) => (
              <DateCard 
                date={item.date} 
                day={item.day} 
                active={item.active} 
              />
            )}
          />
        </View>

        {/* Progress Tracker Section */}
        <View style={styles.trackerWrapper}>
          <IntakeTracker 
            current={completedCount} 
            total={totalCount} 
            day={currentDayName} 
          />
        </View>

        {/* Medicine List Section */}
        <View style={styles.listContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Doses</Text>
            <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <Text style={styles.seeAll}>History</Text>
            </TouchableOpacity>
          </View>

          {medicines.length > 0 ? (
            medicines.map((med) => (
              <MedicineItem
                key={med.id}
                {...med}
                onPress={() => handleMarkAsDone(med.id)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No medicines scheduled for today.</Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, SHADOWS.medium]}
        onPress={handleAddPress}
        activeOpacity={0.9}
      >
        <Feather name="plus" size={32} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    alignItems: "center",
  },
  welcomeText: { ...FONTS.bold, fontSize: 26, color: COLORS.primaryDark },
  subWelcome: { ...FONTS.regular, fontSize: 14, color: COLORS.textSub },
  profileBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  profileLetter: { ...FONTS.bold, color: COLORS.white, fontSize: 18 },
  calendarContainer: { marginTop: SPACING.m },
  monthLabel: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.textMain,
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.m,
    textTransform: "uppercase",
  },
  calendarList: { paddingLeft: SPACING.l, paddingRight: SPACING.m },
  trackerWrapper: {
    alignItems: "center",
    marginVertical: SPACING.xl,
    paddingHorizontal: SPACING.l,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  sectionTitle: { ...FONTS.bold, fontSize: 20, color: COLORS.primaryDark },
  seeAll: { ...FONTS.medium, color: COLORS.primary, fontSize: 14 },
  listContainer: { paddingHorizontal: SPACING.l },
  emptyText: { 
    ...FONTS.regular, 
    textAlign: 'center', 
    color: COLORS.textSub, 
    marginTop: 20 
  },
  scrollPadding: { paddingBottom: 120 },
  fab: {
    position: "absolute",
    bottom: 35,
    right: 25,
    backgroundColor: COLORS.primary,
    width: 65,
    height: 65,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;