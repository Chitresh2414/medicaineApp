import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, FONTS, SPACING, SHADOWS } from "../constants/theme";

import ProfileStats from "../components/ProfileStats";
import ProfileOption from "../components/ProfileOption";
import { getCurrentUserApi, logoutUserApi } from "../api/authApi";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // Redux se medicines ki total counting ke liye
  const medicines = useSelector((state) => state.intakes.medicines || []);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getCurrentUserApi();
      // Backend response check: success aur user object[cite: 7, 12]
      if (response && response.success) {
        dispatch({
          type: "UPDATE_PROFILE",
          payload: response.user,
        });
      }
    } catch (error) {
      console.log("Profile Fetch Error:", error?.message);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Kya aap logout karna chahte hain?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logoutUserApi();
            dispatch({ type: "LOGOUT" });
            // Login screen par reset[cite: 14]
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            Alert.alert("Error", "Logout failed");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={[styles.avatar, SHADOWS.medium]}>
            {/* Backend profileLetter (e.g., 'C' for Chitresh) */}
            <Text style={styles.avatarText}>{user?.profileLetter || "U"}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || "User"}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <ProfileStats label="Total Meds" value={medicines.length} />
          <View style={styles.divider} />
          <ProfileStats label="Streak" value={`${user?.streak || 0} Days`} />
        </View>

        {/* Options Section */}
        <View style={styles.optionsWrapper}>
          <Text style={styles.sectionTitle}>Medical Records</Text>

          {/* New Screen Link: All Medicines View[cite: 14] */}
          {/* <ProfileOption
            icon="medical-bag"
            label="View All My Medicines"
            onPress={() => navigation.navigate("AllMedicines")}
          /> */}

          {/* History screen (Completed aur Expired medicines) ke liye */}
          <ProfileOption
            icon="history"
            label="Medicines History"
            onPress={() => navigation.navigate("History")}
          />

          <Text style={[styles.sectionTitle, { marginTop: SPACING.l }]}>
            Account Settings
          </Text>

          <ProfileOption
            icon="account-edit-outline"
            label="Update Profile"
            onPress={() => navigation.navigate("UpdateProfile")}
          />

          <ProfileOption
            icon="shield-check-outline"
            label="Privacy Policy"
            onPress={() => navigation.navigate("Privacy")}
          />

          <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>
            Actions
          </Text>

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
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: "center",
    marginTop: SPACING.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.m,
  },
  avatarText: {
    ...FONTS.bold,
    fontSize: 40,
    color: COLORS.white,
  },
  userName: {
    ...FONTS.bold,
    fontSize: 24,
    color: COLORS.primaryDark,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    margin: SPACING.l,
    padding: SPACING.l,
    borderRadius: 20,
    ...SHADOWS.small,
  },
  divider: {
    width: 1,
    backgroundColor: "#E2E8F0",
    height: "100%",
  },
  optionsWrapper: {
    paddingHorizontal: SPACING.l,
    marginTop: SPACING.m,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 14,
    color: COLORS.textSub,
    marginBottom: SPACING.s,
    textTransform: "uppercase",
  },
});

export default ProfileScreen;
