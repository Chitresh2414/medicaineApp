import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

import MedicineForm from '../components/MedicineForm';
import CustomText from '../components/CustomText';

const MedicineDetailScreen = ({ navigation, route }) => {
  const medicine = route?.params?.initialData || {};

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

        {/* ✅ Dynamic heading — medicine ka naam dikhega */}
        <View style={styles.headerCenter}>
          <CustomText fontWeight="bold" style={styles.headerTitle}>
            {medicine?.name || "Medicine Details"}
          </CustomText>
          <CustomText style={styles.headerSub}>
            Tap fields to update
          </CustomText>
        </View>

        <View style={{ width: 40 }} />
      </View>

      {/* FORM */}
      <View style={styles.formWrapper}>
        <MedicineForm type="Edit" initialData={medicine} />
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
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.primaryDark,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.textSub,
    marginTop: 2,
  },
  formWrapper: {
    flex: 1,
  },
});

export default MedicineDetailScreen;