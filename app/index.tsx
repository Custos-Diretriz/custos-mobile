import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Navbar from '@/components/Navbar';
import HomeScreen from './screens/HomeScreen';
import { WalletConnectModal } from '@walletconnect/modal-react-native';
import Layout from './_layout';
import { LogBox } from 'react-native';

// Ignore specific log messages
LogBox.ignoreLogs([
    'Emitting expirer_expired', // Ignore this specific log message
    'Inactive pairings cleared', // Ignore this specific log message
    'Emitting subscription_created', // Ignore this specific log message
    'Emitting expirer_created', // Ignore this specific log message
    'Emitting history_created', // Ignore this specific log message
  ]);
  
  // Optionally, you can override console.info to suppress these logs
  const originalConsoleInfo = console.info;
  console.info = (...args) => {
    const logMessagesToIgnore = [
      'Emitting expirer_expired',
      'Inactive pairings cleared',
      'Emitting subscription_created',
      'Emitting expirer_created',
      'Emitting history_created',
    ];
  
    if (args[0] && typeof args[0] === 'string' && logMessagesToIgnore.some(msg => args[0].includes(msg))) {
      return;
    }
    originalConsoleInfo(...args);
  };


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const projectId = '81db21c2e50629bb5a72570345514f84';
const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Layout />
        </NavigationContainer>
      );
}