import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, FONTS, SPACING, SHADOWS } from "../constants/theme";

import ProfileStats from "../components/ProfileStats";
import ProfileOption from "../components/ProfileOption";
// Import remains the same
import { getCurrentUserApi, logoutUserApi } from "../api/authApi";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const medicines = useSelector((state) => state.intakes.medicines || []);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // FIX: Changed getMeApi to getCurrentUserApi to match your import
      const response = await getCurrentUserApi();

      // Based on your previous API structure, we check for the direct object 
      // or response.user depending on how your backend returns it
      if (response) {
        dispatch({
          type: "UPDATE_PROFILE",
          payload: response.user || response,
        });
      }
    } catch (error) {
      console.log(
        "Profile Fetch Error:",
        error?.message || "Could not load profile"
      );
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logoutUserApi();

            dispatch({ type: "LOGOUT" });

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
        <View style={styles.header}>
          <View style={[styles.avatar, SHADOWS.medium]}>
            <Text style={styles.avatarText}>{user?.profileLetter || "U"}</Text>
          </View>

          <Text style={styles.userName}>{user?.name || "User"}</Text>
         
        </View>

        <View style={styles.statsContainer}>
          <ProfileStats label="Medicines" value={medicines.length} />

          <View style={styles.divider} />

          {/* FIX: Corrected typo from 'Pr ofileStats' to 'ProfileStats' */}
          <ProfileStats label="Streak" value={`${user?.streak || 0} Days`} />
        </View>

        <View style={styles.optionsWrapper}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <ProfileOption
            icon="account-edit-outline"
            label="Update Profile"
            onPress={() => navigation.navigate("UpdateProfile")}
          />

          <ProfileOption
            icon="bell-outline"
            label="Notifications"
            onPress={() => console.log("Notifications toggled")}
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
  userEmail: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSub,
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