import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen'; 
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen'; // New Import
import AddMedicineScreen from '../screens/AddMedicineScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ExpiryScannerScreen from '../screens/ExpiryScannerScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator 
    initialRouteName="Login"
    screenOptions={{ 
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
    }}
  >
    {/* Auth Flow: Users start here */}
    <Stack.Screen name="Login" component={LoginScreen}/> 
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    
    {/* Main App Flow: Users land here after Login */}
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ gestureEnabled: false }} // Safety: Prevent sliding back to Login
    />

    {/* Profile Flow: Opened from the Home header */}
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        headerShown: true, // Show header so user can see "Profile" title
        headerTitle: "My Profile",
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: '#F8FAFC' }, // Match your background
        headerTitleStyle: { fontFamily: 'Montserrat-Bold', fontSize: 18 },
      }}
    />
    <Stack.Screen name="AddMedicine" component={AddMedicineScreen} />
    <Stack.Screen name="History" component={HistoryScreen} />
    <Stack.Screen name="ExpiryScanner" component={ExpiryScannerScreen} />
  </Stack.Navigator>
);

export default AppNavigator;