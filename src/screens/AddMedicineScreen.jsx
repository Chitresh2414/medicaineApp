import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { COLORS, SPACING } from "../constants/theme";

import MedicineForm from "../components/MedicineForm";
import CustomText from "../components/CustomText";
import { addMedicineApi } from "../api/medicineApi";

const AddMedicineScreen = ({ navigation, route }) => {
  const formType = route?.params?.type || "Add";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      console.log("RAW FORM:", formData);

      const formattedData = {
        name: formData.name?.trim(),
        type: formData.type || formData.medicine_type, // fix alias
        dose: formData.dose,
        amount: formData.amount || "1",
        reminders: formData.reminders || [],
        reminderDays: formData.reminderDays?.length
          ? formData.reminderDays
          : ["Daily"],
        expiryDate: new Date(formData.expiryDate).toISOString(),
      };

      console.log("FINAL PAYLOAD:", formattedData); // 👈 CHECK THIS

      const res = await addMedicineApi(formattedData);

      Alert.alert("Success", "Medicine added");
    } catch (err) {
      console.log("ERROR RESPONSE:", err?.response?.data);

      Alert.alert("Error", JSON.stringify(err?.response?.data, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
          disabled={loading}
        >
          <Feather name="chevron-left" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>

        <CustomText fontWeight="bold" style={styles.headerTitle}>
          {formType === "Add" ? "Add Reminder" : "Edit Reminder"}
        </CustomText>

        <View style={{ width: 40 }} />
      </View>

      {/* FORM */}
      <View style={styles.formWrapper}>
        <MedicineForm
          type={formType}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.s,
    width: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.primaryDark,
  },
  formWrapper: {
    flex: 1,
  },
});

export default AddMedicineScreen;
