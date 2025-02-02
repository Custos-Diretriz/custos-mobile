"use strict";

import React, { useEffect, useRef } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navbar, { DrawerContent } from "@/components/Navbar";
import { Stack } from "expo-router";
import WalletDetails from "./context/WalletContext";
import { customDarkTheme } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const drawerRef = useRef(null);

  const [loaded] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      console.log("Font loaded successfully");
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <WalletDetails>
      <ThemeProvider
        value={colorScheme === "dark" ? customDarkTheme : DefaultTheme}
      >
        <PaperProvider
          theme={colorScheme === "dark" ? customDarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
            <Drawer
              drawerContent={() => {
                return <DrawerContent />;
              }}
              screenOptions={{
                drawerContentStyle: {
                  width: "100%",
                },
              }}
            >
              {/* <Drawer.Navigator
                  drawerContent={(props: any) => <CustomDrawerContent {...props} />}
                  ref={drawerRef}
                  screenOptions={{
                    drawerStyle: {
                      width: '100%',
                    },
                  }}
                > */}
              <Drawer.Screen
                name="index"
                options={{
                  header: () => <Navbar />,
                }}
              />
              <Drawer.Screen
                name="(tabs)"
                options={{
                  header: () => <Navbar />,
                  headerShown: false,
                }}
              />
              {/* </Drawer.Navigator> */}
            </Drawer>
            {/*<Stack>
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false
                  }}/>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false
                  }}/>
              </Stack>*/}
          </GestureHandlerRootView>
        </PaperProvider>
      </ThemeProvider>
    </WalletDetails>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
