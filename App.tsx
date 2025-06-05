import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { WalletProvider } from './src/context/WalletContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <WalletProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </WalletProvider>
  );
};

export default App;
