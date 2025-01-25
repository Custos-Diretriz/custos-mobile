import { Tabs } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Navbar from "@/components/Navbar";
import { HomeNavIcon, HomeNavIconGradient } from "@/assets/svgs/HomeNavIcon";
import {
  AgreementNavIcon,
  AgreementNavIconGradient,
} from "@/assets/svgs/AgreementNavIcon";
import { VideoNavIcon, VideoNavIconGradient } from "@/assets/svgs/VideoNavIcon";
import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        header: () => {
          return <Navbar />;
        },
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => {
          return (
            <BlurView intensity={20} style={{ flex: 1 }}>
              <LinearGradient
                colors={["#081016", "#081016"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </BlurView>
          );
        },
        //   ({focused}) => {
        //   return <ThemedText style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}></ThemedText>
        // },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => {
            return <TabBarLabel focused={focused} label="Home" />;
          },
          tabBarIcon: ({ focused, size }) => (
            <LinearGradient
              colors={["transparent", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.iconBackground,
                focused && styles.iconBackgroundFocused,
              ]}
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
            /* return (
              <ThemedText
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}
              >
                Agreement
              </ThemedText>
            ); */
            return <TabBarLabel focused={focused} label="Agreement" />;
          },
          tabBarIcon: ({ focused, size }) => (
            <LinearGradient
              colors={["transparent", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.iconBackground,
                focused && styles.iconBackgroundFocused,
              ]}
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
            return <TabBarLabel focused={focused} label="Crime Video" />;
          },
          tabBarIcon: ({ focused, size }) => (
            <LinearGradient
              colors={["transparent", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.iconBackground,
                focused && styles.iconBackgroundFocused,
              ]}
            >
              {/*<Video color={focused ? '#fff' : '#71717A'} size={size}/>*/}
              {focused ? <VideoNavIconGradient /> : <VideoNavIcon />}
            </LinearGradient>
          ),
        }}
      />
    </Tabs>
  );
}

interface TabBarLabelProps {
  focused: boolean;
  label: string;
}

const TabBarLabel: React.FC<TabBarLabelProps> = ({ focused, label }) => {
  if (focused) {
    return (
      <MaskedView
        maskElement={
          <Text style={[styles.tabBarLabel, styles.tabBarLabelFocused]}>
            {label}
          </Text>
        }
      >
        <LinearGradient
          colors={["#0094FF", "#A02294"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        >
          <Text
            style={[
              styles.tabBarLabel,
              styles.tabBarLabelFocused,
              { opacity: 0 },
            ]}
          >
            {label}
          </Text>
        </LinearGradient>
      </MaskedView>
    );
  } else {
    return <ThemedText style={[styles.tabBarLabel]}>{label}</ThemedText>;
  }
};

const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: '#000',
    // borderTopWidth: 1,
    // borderTopColor: '#27272A',
    height: 64,
    // paddingBottom: 8,
    paddingTop: 6,
    // backgroundColor: "orange",
  },
  tabBarLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,
  },
  tabBarLabelFocused: {
    // color: "#A02294",
  },
  tabBarItem: {
    // backgroundColor: "green",
  },
  iconBackground: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 56,
    padding: 8,
    // backgroundColor: "green",
  },
  iconBackgroundFocused: {
    // borderTopWidth: 3,
    // borderTopColor: "#A02294",
    // borderRadius: 2,
  },
});
