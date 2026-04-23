import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

// Import our newly finished Form
import MedicineForm from '../components/MedicineForm';
import CustomText from '../components/CustomText';

const AddMedicineScreen = ({ navigation, route }) => {
  // If we pass a parameter saying it's an edit, we use it. Otherwise, default to "Add"
  const formType = route?.params?.type || "Add";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>
        
        <CustomText fontWeight="bold" style={styles.headerTitle}>
          {formType === "Add" ? "Add Reminder" : "Edit Reminder"}
        </CustomText>
        
        <View style={{ width: 40 }} />
      </View>

      {/* FORM WRAPPER */}
      <View style={styles.formWrapper}>
        <MedicineForm type={formType} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.s,
    width: 40,
    justifyContent: 'center',
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