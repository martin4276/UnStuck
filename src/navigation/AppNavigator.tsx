import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DailySetupScreen } from '../screens/DailySetupScreen';
import { BattleModeScreen } from '../screens/BattleModeScreen';
import { FocusActiveScreen } from '../screens/FocusActiveScreen';
import { Colors } from '../theme';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor: Colors.background } 
      }}
    >
      <Stack.Screen name="Daily" component={DailySetupScreen} />
      <Stack.Screen name="Battle" component={BattleModeScreen} />
      <Stack.Screen name="Focus" component={FocusActiveScreen} />
    </Stack.Navigator>
  );
};
