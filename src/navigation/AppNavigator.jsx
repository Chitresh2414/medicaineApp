import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import AddMedicineScreen from "../screens/AddMedicineScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ExpiryScannerScreen from "../screens/ExpiryScannerScreen";
import MedicineDetailScreen from "../screens/MedicineDetailScreen";
import { COLORS, FONTS } from "../constants/theme";
import PrivacyScreen from '../components/PrivacyScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />

    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ gestureEnabled: false }}
    />

    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: true,
        headerTitle: "My Profile",
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: COLORS.background },
        headerTitleStyle: { ...FONTS.bold, fontSize: 18 },
      }}
    />

    <Stack.Screen
      name="UpdateProfile"
      component={UpdateProfileScreen}
      options={{
        headerShown: true,
        headerTitle: "Edit Profile",
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: COLORS.background },
        headerTitleStyle: { ...FONTS.bold, fontSize: 18 },
      }}
    />

    <Stack.Screen
      name="Privacy"
      component={PrivacyScreen}
      options={{ headerShown: true, title: "Privacy Policy" }}
    />

    <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />
    <Stack.Screen name="History" component={HistoryScreen} />
    <Stack.Screen name="ExpiryScanner" component={ExpiryScannerScreen} />
    <Stack.Screen name="MedicineDetail" component={MedicineDetailScreen} />
  </Stack.Navigator>
);

export default AppNavigator;