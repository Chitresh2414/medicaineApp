import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, FONTS, SHADOWS } from "../constants/theme";
import AppInput from "../components/AppInput";
import { loginUserApi } from "../api/auth";

const LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (!form.email.trim().includes("@")) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      console.log("Attempting API call...");
      await loginUserApi(form.email, form.password);

      console.log("Login Success! Moving to Home..."); // If you don't see this, the API is stuck
      navigation.replace("Home");
    } catch (error) {
      console.log("Login Error:", error);
      Alert.alert("Login Error", "Check your console");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to manage your health</Text>
          </View>

          <View style={styles.form}>
            <AppInput
              icon="email-outline" // Modernized icon name
              placeholder="Email Address"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              error={errors.email}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <AppInput
              icon="lock-outline"
              placeholder="Password"
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              error={errors.password}
              secureTextEntry
              textContentType="password"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.buttonDisabled,
              !isLoading && SHADOWS.medium, // Add shadow only when not loading
            ]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            {/* Make sure "SignUp" matches your Stack.Screen name */}
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.link}>Sign up!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.l,
    justifyContent: "center",
  },
  header: {
    alignItems: "flex-start", // Modern left-aligned header
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
  form: { marginBottom: SPACING.l },
  button: {
    backgroundColor: COLORS.primary,
    height: 58,
    borderRadius: 16, // Softer corners for modern look
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.m,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textSub,
    opacity: 0.6,
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
  },
  footerText: {
    ...FONTS.regular,
    color: COLORS.textSub,
  },
  link: {
    ...FONTS.bold,
    color: COLORS.primary,
  },
});

export default LoginScreen;
