import { Tabs } from 'expo-router';
import { Home, FileText, Video } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, size }) => (
                        <LinearGradient
                            colors={focused ? ['#2D8EFF', '#9C3FE4'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.iconBackground}
                        >
                            <Home color={focused ? '#fff' : '#71717A'} size={size} />
                        </LinearGradient>
                    ),
                }}
            />
            <Tabs.Screen
                name="agreement"
                options={{
                    tabBarLabel: 'Agreement',
                    tabBarIcon: ({ focused, size }) => (
                        <LinearGradient
                            colors={focused ? ['#2D8EFF', '#9C3FE4'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.iconBackground}
                        >
                            <FileText color={focused ? '#fff' : '#71717A'} size={size} />
                        </LinearGradient>
                    ),
                }}
            />
            <Tabs.Screen
                name="crime-video"
                options={{
                    tabBarLabel: 'Crime Video',
                    tabBarIcon: ({ focused, size }) => (
                        <LinearGradient
                            colors={focused ? ['#2D8EFF', '#9C3FE4'] : ['transparent', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.iconBackground}
                        >
                            <Video color={focused ? '#fff' : '#71717A'} size={size} />
                        </LinearGradient>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#000',
        borderTopWidth: 1,
        borderTopColor: '#27272A',
        height: 80,
        paddingBottom: 8,
        paddingTop: 8,
    },
    iconBackground: {
        padding: 8,
        borderRadius: 8,
    },
});
