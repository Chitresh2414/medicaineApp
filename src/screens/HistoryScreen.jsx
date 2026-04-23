import React, { useMemo } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

// Theme & Components
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';
import CustomText from '../components/CustomText';

const HistoryScreen = ({ navigation }) => {
  // 1. Fetch data from Redux
  const allMedicines = useSelector((state) => state.intakes?.medicines || []);

  // 2. Clean Logic: Filter only completed medicines
  const completedMedicines = useMemo(() => {
    return allMedicines.filter(med => med.completed === true);
  }, [allMedicines]);

  // 3. Local Component for History Items (Clean Code approach)
  const HistoryCard = ({ item }) => (
    <View style={[styles.historyCard, SHADOWS.small]}>
      <View style={styles.cardIcon}>
        <MaterialCommunityIcons 
          name={item.type === 'pill' ? 'pill' : 'bottle-tonic-outline'} 
          size={24} 
          color={COLORS.primary} 
        />
      </View>
      <View style={styles.cardContent}>
        <CustomText fontWeight="bold" style={styles.medicineName}>{item.name}</CustomText>
        <CustomText style={styles.medicineDetails}>{item.dose} • {item.reminder}</CustomText>
      </View>
      <View style={styles.statusBadge}>
        <Feather name="check" size={16} color={COLORS.white} />
        <CustomText fontWeight="medium" style={styles.statusText}>Taken</CustomText>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="chevron-left" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>
        
        <CustomText fontWeight="bold" style={styles.headerTitle}>
          Dose History
        </CustomText>
        
        {/* Placeholder to balance the header flexbox */}
        <View style={{ width: 40 }} />
      </View>

      {/* LIST SECTION */}
      <View style={styles.listWrapper}>
        <FlatList
          data={completedMedicines}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <HistoryCard item={item} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Feather name="clock" size={48} color={COLORS.border} />
              <CustomText fontWeight="medium" style={styles.emptyStateTitle}>
                No History Yet
              </CustomText>
              <CustomText style={styles.emptyStateSub}>
                Medicines you mark as done will appear here.
              </CustomText>
            </View>
          )}
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
  listWrapper: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.l,
    paddingBottom: 40,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: 16,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  cardContent: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  medicineDetails: {
    fontSize: 13,
    color: COLORS.textSub,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981', // Success Green
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyStateTitle: {
    fontSize: 18,
    color: COLORS.primaryDark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSub: {
    fontSize: 14,
    color: COLORS.textSub,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default HistoryScreen;