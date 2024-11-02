import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    View,
    Platform,
    DimensionValue
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

interface GradientButtonProps {
    onPress?: () => void;
    width?: DimensionValue;
    disabled?: boolean;
}

export default function Component({
    onPress = () => { },
    width = '100%',
    disabled = false
}: GradientButtonProps) {
    return (
        <View style={[styles.container, { width }]}>
            <Pressable
                onPress={onPress}
                disabled={disabled}
                style={({ pressed }) => [
                    styles.buttonContainer,
                    pressed && styles.pressed
                ]}
            >
                <LinearGradient
                    colors={['#40E0D0', '#2196F3', '#2196F3']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    <Text style={styles.text}>Connect Wallet</Text>
                    <AntDesign name="arrowright" size={24} color="white" style={styles.icon} />
                </LinearGradient>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        zIndex: 2,
        fontFamily: "Outfit-Regular"
    },
    buttonContainer: {
        width: '100%',
        height: 64,
        fontFamily: "Outfit-Regular",
        borderRadius: 32,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#2196F3',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: "Outfit-Regular",
        fontWeight: '600',
        marginRight: 8,
    },
    icon: {
        marginLeft: 4,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
});
