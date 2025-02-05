import React from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { BlurredBackground } from './AgreementSuccessful';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

type WalletPop = {
    isVisible: boolean;
    onClose: () => void;
};

const ConnectWallet: React.FC<WalletPop> = ({ isVisible, onClose }) => {
    const width = Dimensions.get("screen").width;
    const router = useRouter();

    const wallets = [
        { name: "Bravos", icon: require("../../assets/images/arcticons_braavos.png") },
        { name: "Argent", icon: require("../../assets/images/argent.png") },
        { name: "Metamask", icon: require("../../assets/images/metamask-icon.png") },
        { name: "Wallet", icon: require("../../assets/images/wallet-collect.png") },
        { name: "Polygon", icon: require("../../assets/images/polygon.png") },
    ];

    return (
        <Modal
            visible={isVisible}
            onRequestClose={onClose}
            animationType="slide"
            transparent={true}>

            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Connect Wallet</Text>
                        <Text style={styles.subText}>Select the wallet you would like to connect</Text>

                        <View style={styles.wallet_list_container}>
                            {wallets.map(({ name, icon }) => (
                                <TouchableOpacity key={name} onPress={() => {
                                    onClose()
                                    router.push("/(tabs)")
                                }}>
                                    <LinearGradient
                                        style={styles.wallet_button}
                                        colors={["#091219", "#0A1218"]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}>

                                        <Text style={styles.wallet_btn_text}>{name}</Text>
                                        <Image source={icon} />
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContainer: {
        width: 361,
        borderRadius: 16,
        borderWidth: 0.2,
        backgroundColor: "#0A1218",
        borderColor: "#19B1D2",
        paddingVertical: 24,
        alignItems: "center"
    },
    title: {
        fontFamily: "Outfit-Regular",
        fontSize: 24,
        color: Colors.dark.text,
        textAlign: "center"
    },
    subText: {
        fontFamily: "Outfit-Regular",
        fontSize: 16,
        textAlign: "center",
        color: "#EAF9FF",
        marginTop: 16
    },
    wallet_list_container: {
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    wallet_button: {
        width: 183,
        height: 50,
        paddingVertical: 16,
        borderRadius: 32,
        paddingHorizontal: 24,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
        borderColor: "#274962",
        backgroundColor: "#274962",
        gap: 18.67
    },
    wallet_btn_text: {
        color: "#EAF9FF",
        fontFamily: "Outfit-Medium",
        fontSize: 14
    }
});

export default ConnectWallet;
