import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NavContainer from "./navigations/index";
import ContextProvider from './context/Provider';

const App = () => {
  return (
    <SafeAreaProvider>
      <ContextProvider>
        <NavContainer />
      </ContextProvider>
    </SafeAreaProvider>
  );
};

export default App;