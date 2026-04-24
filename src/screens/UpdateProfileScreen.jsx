import React, { useState, useEffect } from "react";
import { 
  StyleSheet, View, Text, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, SPACING, FONTS, SHADOWS } from "../constants/theme";
import AppInput from "../components/AppInput";
// Assuming you have an API helper
// import { updateProfileApi } from "../api/user";

const UpdateProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { name, email, id } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    currentPassword: "",
    newPassword: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if Redux updates elsewhere
  useEffect(() => {
    setFormData(prev => ({ ...prev, name, email }));
  }, [name, email]);

  const handleSave = async () => {
    // 1. Validation Logic
    if (!formData.name.trim() || !formData.email.includes("@")) {
      Alert.alert("Invalid Input", "Please provide a valid name and email.");
      return;
    }

    setIsLoading(true);
    try {
      // 2. API Call (FastAPI)
      // const response = await updateProfileApi(id, formData);
      
      // 3. Update Global State
      dispatch({ 
        type: "UPDATE_PROFILE", 
        payload: { name: formData.name, email: formData.email } 
      });

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to update profile");
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
              placeholder="Required to change email/password"
              secureTextEntry
              value={formData.currentPassword}
              onChangeText={(val) => setFormData({ ...formData, currentPassword: val })}
            />
            <AppInput
              label="New Password"
              icon="lock-reset"
              placeholder="Leave blank to keep current"
              secureTextEntry
              value={formData.newPassword}
              onChangeText={(val) => setFormData({ ...formData, newPassword: val })}
            />
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.saveButtonText}>Update Profile</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContainer: { padding: SPACING.l },
  section: { marginBottom: SPACING.xl },
  sectionTitle: { 
    ...FONTS.bold, 
    fontSize: 16, 
    color: COLORS.primary, 
    marginBottom: SPACING.m,
    textTransform: 'uppercase',
    letterSpacing: 1
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
  disabledButton: { backgroundColor: COLORS.textSub, opacity: 0.7 },
  saveButtonText: { ...FONTS.bold, color: COLORS.white, fontSize: 18 },
});

export default UpdateProfileScreen;