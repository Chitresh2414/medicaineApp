import React, { useMemo, useCallback, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

// API Import
import { getTodayMedicinesApi, toggleMedicineTakeApi } from "../api/medicineApi";

// Theme & Utils
import { COLORS, SPACING, FONTS, SHADOWS } from "../constants/theme";
import { getGreeting } from "../utils/timeHelper";
import { getDynamicWeek, getCurrentMonthYear } from "../utils/calendarHelper";

// Components
import DateCard from "../components/DateCard";
import IntakeTracker from "../components/IntakeTracker";
import MedicineItem from "../components/MedicineItem";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // UI STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleMonth, setVisibleMonth] = useState(getCurrentMonthYear());
  const [loading, setLoading] = useState(true);

  // REDUX
  const medicines = useSelector((state) => state.intakes?.medicines || []);
  const user = useSelector((state) => state.user || {});

  // -----------------------------------
  // API: Fetch Data
  // -----------------------------------
  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await getTodayMedicinesApi();
      if (response.success) {
        // Redux store update
        dispatch({ type: "SET_MEDICINES", payload: response.today_medicines });
      }
    } catch (error) {
      console.error("Home load error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchMedicines();
    }
  }, [isFocused]);

  // CALENDAR DATA
  const days = useMemo(() => getDynamicWeek(new Date()), []);

  // FILTER MEDICINES
  const filteredMedicines = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return medicines.filter((m) => m?.name?.toLowerCase().includes(q));
  }, [medicines, searchQuery]);

  // COMPLETED COUNT
  const completedCount = useMemo(
    () => medicines.filter((m) => m.is_taken_today).length,
    [medicines],
  );

  // FLATLIST CONFIG
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const item = viewableItems?.[0]?.item;
    if (item?.fullDate) {
      setVisibleMonth(format(new Date(item.fullDate), "MMMM yyyy"));
    }
  }).current;

  // ACTIONS
  const handleMarkAsDone = useCallback(
    async (id) => {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const response = await toggleMedicineTakeApi(id);
        
        if (response.success) {
          dispatch({ 
            type: "UPDATE_TAKE_STATUS", 
            payload: { id, status: response.is_taken_today } 
          });
        }
      } catch (error) {
        alert("Failed to update status");
      }
    },
    [dispatch],
  );

  const handleEditPress = useCallback(
    (medicine) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      navigation.navigate("MedicineDetail", {
        initialData: medicine,
      });
    },
    [navigation],
  );

  const renderMedicine = useCallback(
    ({ item }) => (
      <View style={{ paddingHorizontal: SPACING.l }}>
        <MedicineItem
          name={item.name}
          dose={item.dose}
          time={
            item.reminders?.length > 0
              ? item.reminders.join(", ")
              : item.reminder || "No Time"
          }
          iconName={item.medicine_type || item.type} 
          completed={item.is_taken_today}
          onPress={() => handleMarkAsDone(item.id)}
          onCardPress={() => handleEditPress(item)}
        />
      </View>
    ),
    [handleMarkAsDone, handleEditPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            {getGreeting()}
          </Text>
          {/* <Text style={styles.subWelcome}>
            Stay healthy in {user?.location || "Udaipur"}
          </Text> */}
        </View>

        <TouchableOpacity
          style={styles.profileBadge}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.profileLetter}>{user?.name?.charAt(0) || "U"}</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator color={COLORS.primary} style={{ marginBottom: 10 }} />}

      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicine}
        refreshing={loading}
        onRefresh={fetchMedicines}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
        ListHeaderComponent={
          <>
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Feather name="search" size={20} color={COLORS.textSub} />
                <TextInput
                  placeholder="Search your medicines..."
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            <View style={styles.calendarContainer}>
              <Text style={styles.monthLabel}>{visibleMonth}</Text>
              <FlatList
                data={days}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.calendarList}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                renderItem={({ item }) => (
                  <DateCard date={item.date} day={item.day} active={item.active} />
                )}
              />
            </View>

            <View style={styles.trackerWrapper}>
              <IntakeTracker
                current={completedCount}
                total={medicines.length}
                day={format(new Date(), "EEEE")}
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Doses</Text>
              <View style={{ flexDirection: "row", gap: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate("ExpiryScanner")}>
                  <Text style={[styles.seeAll, { color: "#F59E0B" }]}>Scanner</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("History")}>
                  <Text style={styles.seeAll}>History</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
         ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="pill-off"
              size={45}
              color={COLORS.border}
            />
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? "No medicines found."
                : "Your schedule is clear today."}
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddMedicine", { mode: "Add" })}
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
  searchContainer: { paddingHorizontal: SPACING.l, marginBottom: SPACING.m },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 15,
    ...SHADOWS.small,
  },
  searchInput: { flex: 1, marginLeft: 10, ...FONTS.regular, fontSize: 15 },
  calendarContainer: { marginTop: SPACING.m },
  monthLabel: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.textMain,
    paddingHorizontal: SPACING.l,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  calendarList: { paddingLeft: SPACING.l },
  trackerWrapper: { alignItems: "center", marginVertical: SPACING.xl },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: SPACING.l,
  },
  sectionTitle: { ...FONTS.bold, fontSize: 20, color: COLORS.primaryDark },
  seeAll: { ...FONTS.medium, color: COLORS.primary, fontSize: 14 },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    marginHorizontal: SPACING.l,
  },

  emptyStateText: {
    ...FONTS.regular,
    color: COLORS.textSub,
    marginTop: 12,
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
    elevation: 5,
  },
});

export default HomeScreen;