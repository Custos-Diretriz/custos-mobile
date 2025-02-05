import { Ionicons } from '@expo/vector-icons'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import {
    Modal,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Button
} from 'react-native'
import styled from 'styled-components/native'

interface WalletModalProps {
    isVisible: boolean
    onClose: () => void
}

type WalletOption = {
    name: string
    icon: any
    handler: () => void
}

export default function ConnectModal({ isVisible, onClose }: WalletModalProps) {
    const handleWalletConnect = (wallet: string) => {
        if (wallet === 'argent') {
            // Call the connect method for Argent wallet
            router.push('/(tabs)')
            onClose()
        } else if (wallet === 'braavos') {
            // Call the connect method for braavos
            onClose()
            router.push('/(tabs)')
        } else {
            // Call the connect method for Metamask
            onClose()
            router.push('/(tabs)')
        }
    }

    const wallets: WalletOption[] = [
        {
            name: 'Argent',
            icon: require('../../assets/svgs/argent.png'),
            handler: () => handleWalletConnect('argent')
        },
        {
            name: 'Braavos',
            icon: require('../../assets/svgs/braavos.png'),
            handler: () => handleWalletConnect('braavos')
        },
        {
            name: 'MetaMask',
            icon: require('../../assets/svgs/metamask.png'),
            handler: () => handleWalletConnect('metamask')
        },
        {
            name: 'Wallet Connet',
            icon: require('../../assets/svgs/wallet-connect.png'),
            handler: () => handleWalletConnect('braavos')
        },
        {
            name: 'Polygon',
            icon: require('../../assets/svgs/polygon.png'),
            handler: () => handleWalletConnect('metamask')
        }
    ]

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <LinearGradientCont
                        colors={['#19B1D2', '#0094FF']}
                        style={{
                            borderWidth: 0.2,
                            borderColor: 'transparent',
                            overflow: 'hidden',
                            paddingBottom: 0.3
                        }}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContainer}>
                                <Text style={styles.title}>Connect Wallet</Text>
                                <MaskedView
                                    maskElement={
                                        <Text style={styles.subtitle}>
                                            Select the wallet you will like to connect
                                        </Text>
                                    }
                                >
                                    <LinearGradient
                                        colors={['#EAF9FF', '#8E9A9A']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.subtitleTextGradient}
                                    />
                                </MaskedView>

                                {/* Wallet Options */}

                                {wallets.map((wallet, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={wallet.handler}
                                        style={styles.walletButtonWrapper}
                                    >
                                        <LinearGradient
                                            colors={['#0094FF', '#A02294']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.walletButtonGradient}
                                        >
                                            <View style={styles.walletButton}>
                                                <MaskedView
                                                    maskElement={
                                                        <Text style={styles.walletText}>{wallet.name}</Text>
                                                    }
                                                >
                                                    <LinearGradient
                                                        colors={['#EAF9FF', '#8E9A9A']}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 0 }}
                                                        style={styles.textGradient}
                                                    />
                                                </MaskedView>
                                                <Image source={wallet.icon} style={styles.walletIcon} />
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </TouchableWithoutFeedback>
                    </LinearGradientCont>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: '#121212',
        padding: 20,
        borderRadius: 16,
        width: '85%',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontFamily: 'Outfit',
        fontWeight: '500',
        marginTop: 10
    },
    subtitle: {
        fontSize: 16,
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center'
    },
    walletText: {
        marginLeft: 10,
        fontFamily: 'Outfit',
        fontWeight: '500',
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    },
    walletIcon: {
        marginRight: 40,
        width: 32,
        height: 32
    },
    textGradient: {
        height: 20,
        width: Dimensions.get('window').width - 250
    },
    subtitleTextGradient: {
        height: 45,
        width: Dimensions.get('window').width - 100
    },
    walletButtonWrapper: {
        width: '70%',
        borderRadius: 50,
        overflow: 'hidden',
        marginVertical: 5
    },
    walletButtonGradient: {
        padding: 0.2,
        borderRadius: 50
    },
    walletButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(24, 38, 48)',
        paddingVertical: 12,
        borderRadius: 50
    }
})

const LinearGradientCont = styled(LinearGradient).attrs({
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 }
})`
  border-radius: 16px;
`
