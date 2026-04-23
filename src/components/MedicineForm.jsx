import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import uuid from "react-native-uuid";

// Corrected Imports based on our latest fixes
import { CheckBox } from '@rneui/themed';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";

// Theme & Constants
import { COLORS, SPACING } from '../constants/theme';
import { MEDICINE_TYPES, MEDICINE_DAYS } from '../constants/index';

// Atomic Components
import CustomInput from './CustomInput';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import ScanButton from './ScanButton';

const MedicineForm = ({ type = "Add" }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { pressedIntake } = useSelector((state) => state.intakes || { pressedIntake: null });

  // 1. Initial State Definition
  const initialAddState = {
    id: uuid.v4(),
    name: "",
    type: "",
    dose: "",
    amount: "1", // Default amount
    reminder: "",
    reminderDays: [],
    completed: false // Needed for the HomeScreen tracker
  };

  const initialState = useMemo(() => (type === "Add" ? initialAddState : pressedIntake), [type, pressedIntake]);
  
  // 2. Component States
  const [formState, setFormState] = useState(initialState);
  const [isScanning, setIsScanning] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // 3. Clean Validation Logic
  useEffect(() => {
    const isFormIncomplete = !formState.name || !formState.type || !formState.reminder || formState.reminderDays.length === 0;
    const isUnchanged = JSON.stringify(formState) === JSON.stringify(initialState);
    
    setButtonDisabled(isFormIncomplete || (type === "Edit" && isUnchanged));
  }, [formState, initialState, type]);

  // 4. AI Scanner (Frontend Mock for now)
  const handleScan = async (mode) => {
    const { granted } = mode === 'camera' 
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) return Alert.alert("Error", "Permission required to scan.");

    const result = mode === 'camera'
      ? await ImagePicker.launchCameraAsync({ quality: 0.6 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });

    if (!result.canceled) {
      setIsScanning(true);
      // Simulating your future FastAPI Python backend delay
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          name: "Amoxicillin",
          dose: "500mg",
          type: "capsule"
        }));
        setIsScanning(false);
        Alert.alert("AI Scan Complete", "Label scanned successfully! Please review the details.");
      }, 1500);
    }
  };

  // 5. Day Selection Logic
  const toggleDay = (dayValue) => {
    const currentDays = [...formState.reminderDays];
    const index = currentDays.indexOf(dayValue);
    if (index > -1) currentDays.splice(index, 1);
    else currentDays.push(dayValue);
    setFormState({ ...formState, reminderDays: currentDays });
  };

  // 6. Save Data to Redux Store
  const handleSave = () => {
    if (type === "Add") {
      dispatch({ type: 'ADD_MEDICINE', payload: formState });
      Alert.alert("Success", "Medicine reminder created!");
    } else {
      dispatch({ type: 'EDIT_MEDICINE', payload: formState });
      Alert.alert("Success", "Medicine updated!");
    }
    // Return to Home Screen
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      
      {/* SECTION 1: AI SCANNER */}
      <CustomText fontWeight="bold" style={styles.sectionTitle}>AI Quick Add</CustomText>
      <View style={styles.scanRow}>
        <ScanButton icon="camera-outline" label="Scan Bottle" onPress={() => handleScan('camera')} />
        <ScanButton icon="image-outline" label="Gallery" onPress={() => handleScan('library')} />
      </View>

      {isScanning && <ActivityIndicator color={COLORS.primary} style={styles.loader} />}

      <View style={styles.divider} />

      {/* SECTION 2: MANUAL FORM */}
      <CustomText fontWeight="medium" style={styles.label}>Medicine Name*</CustomText>
      <CustomInput 
        placeholder="e.g. Paracetamol" 
        value={formState.name} 
        onChangeText={(val) => setFormState({...formState, name: val})}
      />

      <CustomText fontWeight="medium" style={styles.label}>Type*</CustomText>
      <DropDownPicker
        open={dropDownOpen}
        value={formState.type}
        items={MEDICINE_TYPES}
        setOpen={setDropDownOpen}
        setValue={(callback) => setFormState(prev => ({ ...prev, type: callback(prev.type) }))}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Select Type"
        zIndex={1000} // Ensures dropdown opens over other elements
      />

      <CustomText fontWeight="medium" style={styles.label}>Dosage*</CustomText>
      <CustomInput 
        placeholder="e.g. 1 pill / 5ml" 
        value={formState.dose} 
        onChangeText={(val) => setFormState({...formState, dose: val})}
      />

      <CustomText fontWeight="medium" style={styles.label}>Reminder Time*</CustomText>
      <TouchableOpacity style={styles.timePickerBtn} onPress={() => setDatePickerVisible(true)}>
        <CustomText>{formState.reminder || "Tap to Select Time"}</CustomText>
      </TouchableOpacity>

      <CustomText fontWeight="medium" style={styles.label}>Repeat Days*</CustomText>
      <View style={styles.daysGrid}>
        {MEDICINE_DAYS.map((day) => (
          <CheckBox
            key={day.value}
            title={day.title}
            checked={formState.reminderDays.includes(day.value)}
            onPress={() => toggleDay(day.value)}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
            checkedColor={COLORS.primary}
          />
        ))}
      </View>

      {/* SECTION 3: SUBMIT BUTTON */}
      <CustomButton 
        title={type === "Add" ? "Create Reminder" : "Update Changes"} 
        disabled={buttonDisabled}
        onPress={handleSave}
        style={{ marginTop: 20 }}
      />

      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="time"
        onConfirm={(date) => {
          // Format time to HH:MM AM/PM
          const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          setFormState({...formState, reminder: formattedTime});
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.l, paddingBottom: 80 },
  sectionTitle: { fontSize: 14, color: COLORS.textSub, textTransform: 'uppercase', marginBottom: 10 },
  scanRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  loader: { marginVertical: 10 },
  label: { marginTop: 15, marginBottom: 8, fontSize: 16, color: COLORS.primaryDark },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 15 },
  dropdown: { borderColor: COLORS.border, borderRadius: 12, backgroundColor: COLORS.white },
  dropdownContainer: { borderColor: COLORS.border },
  timePickerBtn: { 
    height: 55, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 12, 
    justifyContent: 'center', 
    paddingHorizontal: 15,
    backgroundColor: COLORS.white
  },
  daysGrid: { marginVertical: 10 },
  checkbox: { backgroundColor: 'transparent', borderWidth: 0, padding: 0, marginBottom: 12, marginLeft: 0 },
  checkboxText: { fontSize: 16, color: COLORS.textMain, fontWeight: 'normal' }
});

export default MedicineForm;