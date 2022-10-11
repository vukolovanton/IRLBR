import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './screens/Map';
import Settings from './screens/Settings';
import SettingsContextProvider from './context/settingsContext';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <SettingsContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsContextProvider>
  );
};

export default App;
