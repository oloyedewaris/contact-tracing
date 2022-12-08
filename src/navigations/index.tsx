import React, { useEffect, useContext, useState } from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import HomeNavigator from './HomeNavigator';
import { GlobalContext } from '../context/Provider';
import AuthNavigator from './AuthNavigator';
import { initializeApp } from '../context/actions/auth';
import { navigationRef } from './RootNavigation';
import { colors } from '../utils/constants';

const Navigator = () => {
  const [loading, setLoading] = useState(true);
  const { authState, authDispatch } = useContext<any>(GlobalContext)

  useEffect(() => {
    initializeApp()(authDispatch)
  }, [])

  useEffect(() => {
    createChannel();
    if (authState.appLoaded) {
      setLoading(false)
      // SplashScreen.hide()
    }
  }, [authState.appLoaded])

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'tracking',
      channelName: 'Tracking'
    })
  }

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <ActivityIndicator size='large' color={colors.primary} />
        </View>
      ) : (
        <NavigationContainer ref={navigationRef} >
          <StatusBar backgroundColor={'#eee'} barStyle={'dark-content'} animated />
          {authState.isAuthenticated ? (
            <HomeNavigator />
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      )}
    </>
  )
}

export default Navigator;
