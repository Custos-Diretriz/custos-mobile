import Navbar from '@/components/Navbar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function ScreenLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Navbar/>
        <Stack>
        <Stack.Screen
          name='index'
          options={{ headerShown: false }}
        />
      </Stack>
    </SafeAreaView>

  );
}