import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Navbar from '@/components/Navbar';

// Define the type for the drawer navigator
type DrawerParamList = {
  Main: undefined;
  // Add other routes here if needed
};

const MainScreen: React.FC = () => {
  // Use the useNavigation hook to get the navigation prop with the correct type
  // const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={styles.container}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <Navbar/>
            ),
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
