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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { COLORS, SPACING, FONTS, SHADOWS } from "../constants/theme";
import AppInput from "../components/AppInput";
import { registerUserApi } from "../api/authapi";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    const { name, email, password, confirm } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Mismatch", "Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // Fixed function name to match the import
      const response = await registerUserApi({
        name,
        email,
        password,
      });

      if (response.success) {
        // Removed Redux dispatch here so we don't accidentally log the user in 
        // without a valid JWT token. We'll handle Redux on the Login screen.
        Alert.alert(
          "Success",
          "Account created successfully",
          [
            {
              text: "Login Now",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } else {
        Alert.alert("Error", response.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Something went wrong"
      );
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join us to stay on track with your health
            </Text>
          </View>

          <View style={styles.form}>
            <AppInput
              icon="account-outline"
              placeholder="Your Name"
              value={formData.name}
              onChangeText={(val) =>
                setFormData({ ...formData, name: val })
              }
            />

            <AppInput
              icon="email-outline"
              placeholder="Your Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(val) =>
                setFormData({ ...formData, email: val })
              }
            />

            <AppInput
              icon="lock-outline"
              placeholder="Your Password"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? "eye-off" : "eye"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              value={formData.password}
              onChangeText={(val) =>
                setFormData({ ...formData, password: val })
              }
            />

            <AppInput
              icon="lock-check-outline"
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              rightIcon={showConfirm ? "eye-off" : "eye"}
              onRightIconPress={() => setShowConfirm(!showConfirm)}
              value={formData.confirm}
              onChangeText={(val) =>
                setFormData({ ...formData, confirm: val })
              }
            />
          </View>

          <TouchableOpacity
            style={[styles.button, SHADOWS.medium]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.link}> Log In!</Text>
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
  },
});

export default SignUpScreen;