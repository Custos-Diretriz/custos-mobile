import React, { useEffect } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import '@walletconnect/react-native-compat';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon } from '@wagmi/core/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit, defaultWagmiConfig, AppKit } from '@reown/appkit-wagmi-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Navbar from '@/components/Navbar';
import HomeScreen from './screens/HomeScreen';
import { WalletConnectModal } from '@walletconnect/modal-react-native';

const projectId = 'b26784ec0e0189fd763096b91bb6eb6d';

const metadata = {
  name: 'Custos Diretriz',
  description: 'Custos Diretriz Mobile App',
  url: 'https://www.custosdiretriz.com/',
  icons: ['https://www.custosdiretriz.com/ecllipse.png'],
  redirect: {
    universal: 'custosdiretriz.com',
  },
};

const chains = [mainnet, polygon] as const;

const queryClient = new QueryClient();

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
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  });

  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

  createAppKit({
    projectId,
    wagmiConfig,
    defaultChain: mainnet,
    enableAnalytics: true,
  });

  useEffect(() => {
    if (loaded) {
      console.log('Font loaded successfully');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen
                name='index'
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='(tabs)'
                options={{ headerShown: false }}
              />
            </Stack>
            <AppKit />
          </QueryClientProvider>
        </WagmiProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}