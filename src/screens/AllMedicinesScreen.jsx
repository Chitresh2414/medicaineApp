import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAllMedicinesApi } from "../api/medicineApi";
import { COLORS, SHADOWS } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const AllMedicinesScreen = () => {
  const navigation = useNavigation();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getAllMedicinesApi();

      // Use optional chaining and a fallback to an empty array
      const data = res?.medicines || res;

      // Ensure the state is only set if data is actually an array
      setMedicines(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      // Fallback to empty array on error to prevent the 'map' crash
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically refreshes the list when navigating back to this screen
    return navigation.addListener("focus", loadData);
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.card, SHADOWS.medium]}
      // Opens the update/detail screen for the selected medicine[cite: 1]
      onPress={() => navigation.navigate("MedicineDetail", { medicine: item })}
    >
      {/* Left Status Bar: Red for expiry alerts, Green for normal status */}
      <View
        style={[
          styles.statusDot,
          { backgroundColor: item.expiry_alert ? "#FF5252" : "#4CAF50" },
        ]}
      />

      <View style={styles.cardContent}>
        <Text style={styles.medName}>{item.name}</Text>
        <Text style={styles.medDetails}>
          {item.type} • {item.dose}
        </Text>

        {item.expiry_alert && (
          <View style={styles.alertPill}>
            <Ionicons name="time-outline" size={12} color="#D32F2F" />
            <Text style={styles.alertText}>
              Expires in {item.days_until_expiry}d
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actionColumn}>
        <Ionicons name="chevron-forward" size={22} color="#BDC3C7" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Simplified Header: Only shows the title and count */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Medicine Cabinet</Text>
          <Text style={styles.subtitle}>{medicines.length} Items Listed</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={medicines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listBody}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No medicines found.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  loader: { marginTop: 50 },
  header: {
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#1A1A1A" },
  subtitle: { fontSize: 15, color: "#777", marginTop: 4 },
  listBody: { paddingHorizontal: 25, paddingBottom: 40 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: { width: 6, height: 40, borderRadius: 3 },
  cardContent: { flex: 1, marginLeft: 15 },
  medName: { fontSize: 18, fontWeight: "700", color: "#2D3436" },
  medDetails: { fontSize: 14, color: "#888", marginTop: 4 },
  alertPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF1F1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  alertText: {
    color: "#D32F2F",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 4,
  },
  actionColumn: { justifyContent: "center" },
  empty: { textAlign: "center", marginTop: 100, color: "#999", fontSize: 16 },
});

export default AllMedicinesScreen;
