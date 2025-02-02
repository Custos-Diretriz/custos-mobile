import { Tabs } from 'expo-router';
import { Platform, StatusBar, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Navbar from '@/components/Navbar';
import { HomeNavIcon, HomeNavIconGradient } from "@/assets/svgs/HomeNavIcon";
import { AgreementNavIcon, AgreementNavIconGradient } from "@/assets/svgs/AgreementNavIcon";
import { VideoNavIcon, VideoNavIconGradient } from "@/assets/svgs/VideoNavIcon";
import { ThemedText } from "@/components/ThemedText";
const isIPhone = Platform.OS === "ios"
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#858585",
          header: () => {
            return <Navbar />
          },
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
          //   ({focused}) => {
          //   return <ThemedText style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}></ThemedText>
          // },
          headerShown: false
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: ({ focused }) => {
              return <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}>Home</Text>
            },
            tabBarIcon: ({ focused, size }) => (
              <LinearGradient
                colors={['transparent', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.iconBackground, focused && styles.iconBackgroundFocused]}
              >
                {/*<Home color={focused ? '#fff' : '#71717A'} size={size}/>*/}
                {focused ? <HomeNavIconGradient /> : <HomeNavIcon />}
              </LinearGradient>
            ),
          }}
        />
        <Tabs.Screen
          name="agreement"
          options={{
            tabBarLabel: ({ focused }) => {
              return <ThemedText style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}>Agreement</ThemedText>
            },
            tabBarIcon: ({ focused, size }) => (
              <LinearGradient
                colors={['transparent', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.iconBackground, focused && styles.iconBackgroundFocused]}
              >
                {/*<FileText color={focused ? '#fff' : '#71717A'} size={size}/>*/}
                {focused ? <AgreementNavIconGradient /> : <AgreementNavIcon />}
              </LinearGradient>
            ),
          }}
        />
        <Tabs.Screen
          name="crime-video"
          options={{
            tabBarLabel: ({ focused }) => {
              return <ThemedText style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}>Crime Video</ThemedText>
            },
            tabBarIcon: ({ focused, size }) => (
              <LinearGradient
                colors={['transparent', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.iconBackground, focused && styles.iconBackgroundFocused]}
              >
                {/*<Video color={focused ? '#fff' : '#71717A'} size={size}/>*/}
                {focused ? <VideoNavIconGradient /> : <VideoNavIcon />}
              </LinearGradient>
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor={'#050A0F'} barStyle={'light-content'} />
    </>

  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#050A0F",
    height: isIPhone ? 86 : 71,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 14,
    color: "#858585",
  },
  tabBarLabelFocused: {
    color: '#A02294',
    fontWeight: 500,
  },
  tabBarItem: {
    // backgroundColor: "green",
  },
  iconBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 56,
    padding: 8,
    // backgroundColor: "green",
  },
  iconBackgroundFocused: {
    borderTopWidth: 3,
    borderTopColor: '#A02294',
    borderRadius: 2,
  }
});
