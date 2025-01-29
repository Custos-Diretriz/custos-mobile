import React, { useState } from "react";
import {
    Pressable,
    Text,
    StyleSheet,
    View,
    Platform,
    DimensionValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { connect, disconnect } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";
import { InjectedConnector } from "starknetkit/injected";

interface ConnectButtonProps {
    width?: DimensionValue;
    disabled?: boolean;
}

export default function Component({
    width = "100%",
    disabled = false,
}: ConnectButtonProps) {
    const [connection, setConnection] = useState<string | null>(null);
    const [address, setAddress] = useState<string | undefined>("");

    const connectWallet = async () => {
        const { wallet, connector, connectorData } = await connect({ modalMode: "neverAsk" })

        if (wallet && connectorData) {
            setConnection(wallet.id || null);
            setAddress(connectorData.account)
        }
    }

    const disconnectWallet = async () => {
        await disconnect()

        setConnection(null)
        setAddress("")
    }

    return (
        <View style={[styles.container, { width }]}>
            {!address ? (
                    <Pressable
                    onPress={() => (connectWallet())}
                        // disabled={disabled}
                        style={({ pressed }) => [
                            styles.buttonContainer,
                            pressed && styles.pressed,
                        ]}
                    >
                        <LinearGradient
                            colors={["#40E0D0", "#2196F3", "#2196F3"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        >
                            <Text style={styles.text}>Connect</Text>
                            <AntDesign
                                name="arrowright"
                                size={24}
                                color="white"
                                style={styles.icon}
                            />
                        </LinearGradient>
                    </Pressable>
            ) : (
                <View style={styles.connectedContainer}>
                    <Text style={styles.connectedText}>
                        Connected: {address.slice(0, 6)}...{address.slice(-4)}
                    </Text>
                    <Pressable
                            onPress={() => disconnectWallet()}
                        disabled={disabled}
                        style={({ pressed }) => [
                            styles.buttonContainer,
                            pressed && styles.pressed,
                        ]}
                    >
                        <LinearGradient
                            colors={["#40E0D0", "#2196F3", "#2196F3"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        >
                            <Text style={styles.text}>Disconnect</Text>
                            <AntDesign
                                name="arrowright"
                                size={24}
                                color="white"
                                style={styles.icon}
                            />
                        </LinearGradient>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "auto",
        zIndex: 2,
        fontFamily: "Outfit-Regular",
    },
    connectedContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    connectedText: {
        fontSize: 14,
        color: "#333",
        backgroundColor: "#e0e0e0",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 8,
    },
    buttonContainer: {
        width: "100%",
        height: 64,
        borderRadius: 32,
        overflow: "hidden",
        ...Platform.select({
            ios: {
                shadowColor: "#2196F3",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 10,
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    gradient: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    text: {
        color: "white",
        fontSize: 20,
        fontFamily: "Outfit-Regular",
        fontWeight: "600",
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
