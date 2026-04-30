import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

import MedicineForm from '../components/MedicineForm';
import CustomText from '../components/CustomText';

const MedicineDetailScreen = ({ navigation, route }) => {
  const medicine = route?.params?.initialData || {};
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      'Remove medicine?',
      `${medicine?.name || 'This medicine'} will be permanently deleted.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    if (!medicine?.id) return;

    try {
      setDeleting(true);

      const token = await AsyncStorage.getItem('token'); // adjust to your auth storage

      const res = await fetch(
        `${API_BASE_URL}/api/v1/medicines/${medicine.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.detail || 'Delete failed');

      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message || 'Could not delete medicine.');
    } finally {
      setDeleting(false);
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
        >
          <Feather name="chevron-left" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <CustomText fontWeight="bold" style={styles.headerTitle}>
            {medicine?.name || 'Medicine Details'}
          </CustomText>
          <CustomText style={styles.headerSub}>Tap fields to update</CustomText>
        </View>

        {/* DELETE BUTTON */}
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.deleteButton}
          activeOpacity={0.7}
          disabled={deleting}
        >
          {deleting ? (
            <ActivityIndicator size="small" color={COLORS.error || '#E24B4A'} />
          ) : (
            <Feather name="trash-2" size={20} color={COLORS.error || '#E24B4A'} />
          )}
        </TouchableOpacity>
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
  deleteButton: {
    padding: SPACING.s,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrapper: {
    flex: 1,
  },
});

export default MedicineDetailScreen;