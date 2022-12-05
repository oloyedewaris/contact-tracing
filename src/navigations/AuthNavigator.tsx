import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';

const WelcomeNav = () => {
  const WelcomeNavigator = createStackNavigator();

  return (
    <WelcomeNavigator.Navigator screenOptions={{ headerShown: false }}>
      <WelcomeNavigator.Screen name='Login' component={Login} />
      <WelcomeNavigator.Screen name='Register' component={Register} />
    </WelcomeNavigator.Navigator>
  )
}

export default WelcomeNav;