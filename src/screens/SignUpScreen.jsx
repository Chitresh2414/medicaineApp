import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux"; // Connect to Redux
import { COLORS, SPACING, FONTS, SHADOWS } from "../constants/theme";
import AppInput from "../components/AppInput";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // UI State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignUp = () => {
    const { name, email, password, confirm } = formData;

    // Basic Validation
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Mismatch", "Passwords do not match!");
      return;
    }

    // 1. Dispatch to Redux (Update the 'Chinku' profile globally)
    dispatch({ 
      type: 'UPDATE_PROFILE', 
      payload: { 
        name: name, 
        profileLetter: name.charAt(0).toUpperCase(),
        location: "Udaipur, IN" 
      } 
    });

    // 2. Success Navigation (Reset stack to Home)
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join us to stay on track with your health
            </Text>
          </View>

          {/* Input Fields Section */}
          <View style={styles.form}>
            <AppInput
              icon="account-outline"
              placeholder="Your Name"
              value={formData.name}
              onChangeText={(val) => setFormData({ ...formData, name: val })}
            />
            
            <AppInput
              icon="email-outline"
              placeholder="Your Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(val) => setFormData({ ...formData, email: val })}
            />
            
            <AppInput
              icon="lock-outline"
              placeholder="Your Password"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? "eye-off" : "eye"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              value={formData.password}
              onChangeText={(val) => setFormData({ ...formData, password: val })}
            />
            
            <AppInput
              icon="lock-check-outline"
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              rightIcon={showConfirm ? "eye-off" : "eye"}
              onRightIconPress={() => setShowConfirm(!showConfirm)}
              value={formData.confirm}
              onChangeText={(val) => setFormData({ ...formData, confirm: val })}
            />
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={[styles.button, SHADOWS.medium]}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          {/* Footer - Social Login or Back to Login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Log In!</Text>
            </TouchableOpacity>
          </View>
          
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
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: SPACING.xl,
  },
  title: {
    ...FONTS.bold,
    fontSize: 32,
    color: COLORS.primaryDark,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.textSub,
    marginTop: 8,
  },
  form: {
    marginBottom: SPACING.l,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    marginTop: SPACING.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSub,
  },
  link: {
    ...FONTS.bold,
    color: COLORS.primary,
    marginLeft: 4,
  },
});

export default SignUpScreen;