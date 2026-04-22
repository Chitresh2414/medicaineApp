import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
// Fixed typo: 'SingnUp' -> 'SignUp' (Double check your filename!)
import SignUpScreen from '../screens/SignUpScreen'; 
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

/**
 * AppNavigator handles the navigation flow.
 * Default starting point is the Login screen.
 */
const AppNavigator = () => (
  <Stack.Navigator 
    initialRouteName="Login"
    screenOptions={{ 
      headerShown: false,
      // Provides that premium, smooth slide effect between screens
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
    }}
  >
    {/* Auth Flow */}
    <Stack.Screen name="Login" component={LoginScreen}/> 
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    
    {/* Main App Flow */}
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
        // Disables swipe back to login after entering the app
        gestureEnabled: false 
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;