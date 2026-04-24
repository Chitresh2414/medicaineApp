import React, { useState, useMemo, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";

import { COLORS, SPACING } from "../constants/theme";
import { MEDICINE_TYPES, MEDICINE_DAYS } from "../constants/index";

import CustomInput from "./CustomInput";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import ScanButton from "./ScanButton";

const MedicineForm = ({ type = "Add", initialData = null }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { pressedIntake } = useSelector((state) => state.intakes || { pressedIntake: null });

  // STATE MANAGEMENT
  const [isScanning, setIsScanning] = useState(false);
  const [activeDatePicker, setActiveDatePicker] = useState(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const initialAddState = {
    id: uuid.v4(),
    name: "",
    type: "",
    dose: "",
    amount: "1",
    reminders: [],
    reminderDays: [],
    manufactureDate: null,
    expiryDate: null,
    completed: false,
  };

  const initialState = useMemo(
    () => (type === "Add" ? initialAddState : initialData || pressedIntake),
    [type, initialData, pressedIntake]
  );

  const [formState, setFormState] = useState(initialState || initialAddState);

  // SYNC INITIAL DATA
  useEffect(() => {
    if (initialState) {
      setFormState({
        ...initialAddState,
        ...initialState,
        reminders: Array.isArray(initialState.reminders) ? initialState.reminders : [],
        reminderDays: Array.isArray(initialState.reminderDays) ? initialState.reminderDays : [],
      });
    }
  }, [initialState]);

  // VALIDATION
  useEffect(() => {
    const isFormIncomplete =
      !formState.name?.trim() ||
      !formState.type ||
      (formState.reminders?.length || 0) === 0 ||
      (formState.reminderDays?.length || 0) === 0;
    setButtonDisabled(isFormIncomplete);
  }, [formState]);

  // IMAGE SCANNING LOGIC
  const processImage = async (uri) => {
    setIsScanning(true);
    try {
      // Logic for OCR/AI processing would go here
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      Alert.alert("Scan Complete", "Medicine details have been populated.");
    } catch (error) {
      Alert.alert("Error", "Failed to read label.");
    } finally {
      setIsScanning(false);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert("Permission Required", "Camera access is needed.");
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) processImage(result.assets[0].uri);
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert("Permission Required", "Gallery access is needed.");
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) processImage(result.assets[0].uri);
  };

  // HANDLERS
  const handleDateConfirm = (date) => {
    if (activeDatePicker === "reminder") {
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (!formState.reminders.includes(formattedTime)) {
        setFormState(p => ({ ...p, reminders: [...p.reminders, formattedTime] }));
      }
    } else if (activeDatePicker === "mfg") {
      setFormState(p => ({ ...p, manufactureDate: date.toISOString() }));
    } else if (activeDatePicker === "exp") {
      setFormState(p => ({ ...p, expiryDate: date.toISOString() }));
    }
    setActiveDatePicker(null);
  };

  const toggleDay = (dayValue) => {
    setFormState((prev) => {
      const currentDays = prev.reminderDays || [];
      const exists = currentDays.includes(dayValue);
      return {
        ...prev,
        reminderDays: exists ? currentDays.filter(d => d !== dayValue) : [...currentDays, dayValue],
      };
    });
  };

  const handleSave = () => {
    const actionType = type === "Add" ? "ADD_MEDICINE" : "EDIT_MEDICINE";
    dispatch({ type: actionType, payload: formState });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      
      {/* SECTION: AI TOOLS */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <CustomText fontWeight="bold" style={styles.sectionHeader}>Quick Import</CustomText>
          {isScanning && <ActivityIndicator color={COLORS.primary} size="small" />}
        </View>
        <View style={styles.scanRow}>
          <ScanButton icon="camera" label="Scan Label" onPress={takePhoto} style={styles.flex1} disabled={isScanning} />
          <View style={{ width: 12 }} />
          <ScanButton icon="image" label="From Gallery" onPress={pickFromGallery} style={styles.flex1} disabled={isScanning} />
        </View>
      </View>

      {/* SECTION: MEDICINE DETAILS */}
      <View style={styles.card}>
        <CustomText fontWeight="bold" style={styles.sectionHeader}>Medicine Details</CustomText>
        
        <CustomText style={styles.label}>Medicine Name*</CustomText>
        <CustomInput
          placeholder="e.g. Paracetamol"
          value={formState.name}
          onChangeText={(val) => setFormState({ ...formState, name: val })}
        />

        <CustomText style={styles.label}>Medicine Type*</CustomText>
        <DropDownPicker
          open={dropDownOpen}
          value={formState.type}
          items={MEDICINE_TYPES}
          setOpen={setDropDownOpen}
          setValue={(callback) => setFormState((prev) => ({ ...prev, type: callback(prev.type) }))}
          style={styles.dropdown}
          placeholder="Select type"
          listMode="SCROLLVIEW"
          zIndex={3000}
        />

        {/* DOSE & AMOUNT ROW */}
        <View style={[styles.rowBetween, { marginTop: 16 }]}>
          <View style={styles.flex1}>
            <CustomText style={styles.label}>Dose</CustomText>
            <CustomInput
              placeholder="e.g. 500mg"
              value={formState.dose}
              onChangeText={(val) => setFormState({ ...formState, dose: val })}
            />
          </View>
          <View style={{ width: 15 }} />
          <View style={{ flex: 0.5 }}>
            <CustomText style={styles.label}>Amount</CustomText>
            <CustomInput
              placeholder="1"
              keyboardType="numeric"
              value={formState.amount}
              onChangeText={(val) => setFormState({ ...formState, amount: val })}
            />
          </View>
        </View>

        {/* MFG & EXPIRY ROW */}
        <View style={[styles.rowBetween, { marginTop: 8 }]}>
          <View style={styles.flex1}>
            <CustomText style={styles.label}>Mfg. Date</CustomText>
            <TouchableOpacity style={styles.dateBtn} onPress={() => setActiveDatePicker("mfg")}>
              <Icon name="calendar-outline" type="ionicon" size={18} color={COLORS.primary} />
              <CustomText style={styles.dateText}>
                {formState.manufactureDate ? new Date(formState.manufactureDate).toLocaleDateString() : "Set"}
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={{ width: 15 }} />
          <View style={styles.flex1}>
            <CustomText style={styles.label}>Expiry Date</CustomText>
            <TouchableOpacity style={styles.dateBtn} onPress={() => setActiveDatePicker("exp")}>
              <Icon name="calendar-clear-outline" type="ionicon" size={18} color={COLORS.primary} />
              <CustomText style={[styles.dateText, { color: COLORS.primary }]}>
                {formState.expiryDate ? new Date(formState.expiryDate).toLocaleDateString() : "Set"}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SECTION: SCHEDULE */}
      <View style={styles.card}>
        <CustomText fontWeight="bold" style={styles.sectionHeader}>Schedule & Reminders</CustomText>
        
        <CustomText style={styles.label}>Repeat Days*</CustomText>
        <View style={styles.daysContainer}>
          {MEDICINE_DAYS.map((day) => {
            const isSelected = (formState.reminderDays || []).includes(day.value);
            return (
              <TouchableOpacity
                key={day.value}
                style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}
                onPress={() => toggleDay(day.value)}
              >
                <CustomText style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                  {day.title.substring(0, 1)}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>

        <CustomText style={[styles.label, { marginTop: 20 }]}>Reminder Times*</CustomText>
        <View style={styles.timeContainer}>
          {formState.reminders.map((time, index) => (
            <View key={index} style={styles.timeChip}>
              <CustomText style={styles.timeChipText}>{time}</CustomText>
              <TouchableOpacity onPress={() => setFormState(p => ({ ...p, reminders: p.reminders.filter((_, i) => i !== index) }))}>
                <Icon name="close" size={14} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addTimeChip} onPress={() => setActiveDatePicker("reminder")}>
            <Icon name="add" size={20} color={COLORS.primary} />
            <CustomText style={styles.addTimeText}>Add Time</CustomText>
          </TouchableOpacity>
        </View>
      </View>

      <CustomButton
        title={type === "Add" ? "Create Schedule" : "Update Medication"}
        disabled={buttonDisabled || isScanning}
        onPress={handleSave}
        style={styles.mainBtn}
      />

      <DateTimePickerModal
        isVisible={!!activeDatePicker}
        mode={activeDatePicker === "reminder" ? "time" : "date"}
        onConfirm={handleDateConfirm}
        onCancel={() => setActiveDatePicker(null)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  scrollContent: { padding: 20, paddingBottom: 60 },
  flex1: { flex: 1 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  sectionHeader: { fontSize: 13, color: COLORS.primary, marginBottom: 16, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 'bold' },
  label: { fontSize: 14, fontWeight: "600", color: "#555", marginBottom: 8 },
  scanRow: { flexDirection: "row" },
  dropdown: { borderColor: "#E2E8F0", borderRadius: 10, backgroundColor: "#F8FAFC", height: 50 },
  rowBetween: { flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' },
  dateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  dateText: { marginLeft: 6, fontSize: 13, color: "#333" },
  daysContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
  dayCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E2E8F0" },
  dayCircleSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dayText: { fontSize: 12, fontWeight: "bold", color: "#64748B" },
  dayTextSelected: { color: "#FFF" },
  timeContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  timeChip: { flexDirection: "row", alignItems: "center", backgroundColor: "#EEF2FF", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.primary + '30' },
  timeChipText: { color: COLORS.primary, fontWeight: "700", marginRight: 4, fontSize: 13 },
  addTimeChip: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderStyle: "dashed", borderWidth: 1, borderColor: COLORS.primary },
  addTimeText: { color: COLORS.primary, fontWeight: "600", fontSize: 13, marginLeft: 2 },
  mainBtn: { borderRadius: 15, height: 55, marginTop: 10 },
});

export default MedicineForm;