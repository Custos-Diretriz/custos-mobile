import {Tabs} from 'expo-router';
import {StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import Navbar from '@/components/Navbar';
import {HomeNavIcon, HomeNavIconGradient} from "@/assets/svgs/HomeNavIcon";
import {AgreementNavIcon, AgreementNavIconGradient} from "@/assets/svgs/AgreementNavIcon";
import {VideoNavIcon, VideoNavIconGradient} from "@/assets/svgs/VideoNavIcon";
import {ThemedText} from "@/components/ThemedText";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        header: () => {
          return <Navbar/>
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
          tabBarLabel:  ({focused}) => {
            return <ThemedText style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}>Home</ThemedText>
          },
          tabBarIcon: ({focused, size}) => (
            <LinearGradient
              colors={['transparent', 'transparent']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.iconBackground, focused && styles.iconBackgroundFocused]}
            >
              {/*<Home color={focused ? '#fff' : '#71717A'} size={size}/>*/}
              {focused ? <HomeNavIconGradient/> : <HomeNavIcon/>}
            </LinearGradient>
          ),
        }}
      />
      <Tabs.Screen
        name="agreement"
        options={{
          tabBarLabel: ({focused}) => {
            return <ThemedText style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}>Agreement</ThemedText>
          },
          tabBarIcon: ({focused, size}) => (
            <LinearGradient
              colors={['transparent', 'transparent']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.iconBackground, focused && styles.iconBackgroundFocused]}
            >
              {/*<FileText color={focused ? '#fff' : '#71717A'} size={size}/>*/}
              {focused ? <AgreementNavIconGradient/> : <AgreementNavIcon/>}
            </LinearGradient>
          ),
        }}
      />
      <Tabs.Screen
        name="crime-video"
        options={{
          tabBarLabel: ({focused}) => {
            return <ThemedText style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}>Crime Video</ThemedText>
          },
          tabBarIcon: ({focused, size}) => (
            <LinearGradient
              colors={['transparent', 'transparent']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.iconBackground, focused && styles.iconBackgroundFocused]}
            >
              {/*<Video color={focused ? '#fff' : '#71717A'} size={size}/>*/}
              {focused ? <VideoNavIconGradient/> : <VideoNavIcon/>}
            </LinearGradient>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: '#000',
    // borderTopWidth: 1,
    // borderTopColor: '#27272A',
    height: 64,
    // paddingBottom: 8,
    paddingTop: 8,
    // backgroundColor: "orange",
  },
  tabBarLabel: {
    fontSize: 14,
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
