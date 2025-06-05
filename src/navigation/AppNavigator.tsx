import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabsNavigator from './BottomTabs';
import PayScreen from '../screens/PayScreen';
import ReceiveScreen from '../screens/ReceiveScreen.tsx';
import BrowserScreen from '../screens/BrowserScreen';
import MessagesScreen from '../screens/ChatScreen';
import LearnScreen from '../screens/LearnScreen';
import SwapScreen from '../screens/SwapScreen.tsx';
import TodoListScreen from '../screens/TodoList.tsx';
import ExpenseTrackerScreen from '../screens/ExpenseTracker.tsx';
import MockMessagingScreen from '../screens/MockMessagingScreen.tsx';
import VaultScreen from '../screens/VaultScreen.tsx';
import AuthScreen from '../screens/AuthScreen.tsx';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Pay" component={PayScreen} />
      <Stack.Screen name="Receive" component={ReceiveScreen} />
      <Stack.Screen name="Swap" component={SwapScreen} />
      <Stack.Screen name="Browser" component={BrowserScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Learn" component={LearnScreen} />
      <Stack.Screen name="TodoList" component={TodoListScreen} />
      <Stack.Screen name="ExpenseTracker" component={ExpenseTrackerScreen} />
      <Stack.Screen name="MockMessaging" component={MockMessagingScreen} />
      <Stack.Screen name="Vault" component={VaultScreen} />
      
      

    </Stack.Navigator>
  );
};

export default AppNavigator;
