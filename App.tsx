import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import OverlayScreen from './src/screens/OverlayScreen';
import AppCenter from 'appcenter';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';

const Stack = createNativeStackNavigator();

AppCenter.start();
Analytics.trackEvent('App Started');

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Text Overlay' }} 
        />
        <Stack.Screen 
          name="Overlay" 
          component={OverlayScreen}
          options={{ 
            title: 'Active Overlay',
            headerTransparent: true,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}