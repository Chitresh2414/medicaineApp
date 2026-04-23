import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';

// Small Components
import ProfileStats from '../components/ProfileStats';
import ProfileOption from '../components/ProfileOption';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const medicines = useSelector((state) => state.intakes.medicines);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to exit?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive", 
        onPress: () => {
          dispatch({ type: 'LOGOUT' });
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        } 
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={[styles.avatar, SHADOWS.medium]}>
            <Text style={styles.avatarText}>{user.profileLetter}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.location}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <ProfileStats label="Medicines" value={medicines.length} />
          <View style={styles.divider} />
          <ProfileStats label="Streak" value="12 Days" />
        </View>

        {/* Options List */}
        <View style={styles.optionsWrapper}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <ProfileOption 
            icon="account-edit-outline" 
            label="Update Profile" 
            onPress={() => console.log("Edit Profile")} 
          />
          <ProfileOption 
            icon="bell-outline" 
            label="Notifications" 
            onPress={() => console.log("Settings")} 
          />
          <ProfileOption 
            icon="shield-check-outline" 
            label="Privacy Policy" 
            onPress={() => console.log("Privacy")} 
          />
          
          <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Actions</Text>
          <ProfileOption 
            icon="logout" 
            label="Logout" 
            isDestructive 
            onPress={handleLogout} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: SPACING.xl },
  header: { alignItems: 'center', marginTop: SPACING.xl },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 35,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  avatarText: { ...FONTS.bold, fontSize: 40, color: COLORS.white },
  userName: { ...FONTS.bold, fontSize: 24, color: COLORS.primaryDark },
  userEmail: { ...FONTS.regular, fontSize: 14, color: COLORS.textSub },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    margin: SPACING.l,
    padding: SPACING.l,
    borderRadius: 20,
    ...SHADOWS.small,
  },
  divider: { width: 1, backgroundColor: '#E2E8F0', height: '100%' },
  optionsWrapper: { paddingHorizontal: SPACING.l, marginTop: SPACING.m },
  sectionTitle: { ...FONTS.bold, fontSize: 14, color: COLORS.textSub, marginBottom: SPACING.s, textTransform: 'uppercase' },
});

export default ProfileScreen;