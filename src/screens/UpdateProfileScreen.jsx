import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, SPACING, FONTS, SHADOWS } from "../constants/theme";
import AppInput from "../components/AppInput";
import { updateProfileApi } from "../api/authApi";

const UpdateProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // Get current user data from Redux
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync form if Redux state changes externally
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: user?.name || "",
      email: user?.email || "",
    }));
  }, [user]);

  const handleSave = async () => {
    // 1. Validations
    if (!formData.name.trim()) {
      Alert.alert("Invalid Input", "Please enter your full name");
      return;
    }

    if (!formData.email.trim().includes("@")) {
      Alert.alert("Invalid Input", "Please enter a valid email");
      return;
    }

    if (formData.newPassword && !formData.currentPassword) {
      Alert.alert(
        "Password Required",
        "Current password is required to set a new password"
      );
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      Alert.alert(
        "Invalid Password",
        "New password must be at least 6 characters"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await updateProfileApi({
        name: formData.name,
        email: formData.email,
        // Only send password fields if the user actually typed something
        ...(formData.currentPassword && { currentPassword: formData.currentPassword }),
        ...(formData.newPassword && { newPassword: formData.newPassword }),
      });

      // Assuming your FastAPI returns the updated user object
      // Logic adjusted to handle both wrapped and direct responses
      const updatedUser = response.user || response;

      dispatch({
        type: "UPDATE_PROFILE",
        payload: {
          name: updatedUser.name,
          email: updatedUser.email,
          profileLetter: updatedUser.profileLetter || updatedUser.name?.charAt(0).toUpperCase(),
        },
      });

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      // Show the specific error detail from FastAPI if available
      const errorMessage = typeof error.detail === 'string' 
        ? error.detail 
        : error.message || "Something went wrong";
        
      Alert.alert("Update Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <AppInput
              label="Full Name"
              icon="account-outline"
              value={formData.name}
              onChangeText={(val) => setFormData({ ...formData, name: val })}
            />

            <AppInput
              label="Email Address"
              icon="email-outline"
              value={formData.email}
              onChangeText={(val) => setFormData({ ...formData, email: val })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>

            <AppInput
              label="Current Password"
              icon="lock-outline"
              placeholder="Required only to change password"
              secureTextEntry
              value={formData.currentPassword}
              onChangeText={(val) =>
                setFormData({ ...formData, currentPassword: val })
              }
            />

            <AppInput
              label="New Password"
              icon="lock-reset"
              placeholder="Leave blank to keep current"
              secureTextEntry
              value={formData.newPassword}
              onChangeText={(val) =>
                setFormData({ ...formData, newPassword: val })
              }
            />
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              isLoading && styles.disabledButton,
            ]}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.saveButtonText}>Update Profile</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: SPACING.l,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: SPACING.m,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
    marginTop: SPACING.m,
  },
  disabledButton: {
    backgroundColor: COLORS.textSub,
    opacity: 0.7,
  },
  saveButtonText: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: 18,
  },
  cancelButton: {
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.s,
  },
  cancelButtonText: {
    ...FONTS.regular,
    color: COLORS.textSub,
    fontSize: 16,
  },
});

export default UpdateProfileScreen;