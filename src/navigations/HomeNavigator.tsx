import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../screens/Map/Map';
import Settings from '../screens/Settings/Settings';
import Profile from '../screens/Profile/Profile';
import About from '../screens/About/About';
import AboutDev from '../screens/About/AboutDev';

const HomeStack = () => {
  const HomeTab = createStackNavigator();

  return (
    <HomeTab.Navigator initialRouteName='Map' >
      <HomeTab.Screen name="Map" component={Map} options={{ headerShown: false }} />
      <HomeTab.Screen name="Settings" component={Settings} />
      <HomeTab.Screen name="Profile" component={Profile} />
      <HomeTab.Screen name="About" component={About} />
      <HomeTab.Screen name="About Developer" component={AboutDev} />
    </HomeTab.Navigator>
  )
}

export default HomeStack;


