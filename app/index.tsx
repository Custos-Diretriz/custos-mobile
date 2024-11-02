import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientButton from '@/components/GradientButton';
import Swiper from 'react-native-swiper';
import { useAppKit } from '@reown/appkit-wagmi-react-native'

const slides = [
    {
        id: '1',
        title: `Create Legal \n Agreements`,
        content: 'Create new legal agreements by providing the \nagreement content, the address of the second \n party, and details about the first party.',
        imgSrc: require('../assets/images/slide1.png')
    },
    {
        id: '2',
        title: 'Crime Recorder',
        content: 'We are providing an advanced platform \n for documenting and sharing crime \n events securely and transparently.',
        imgSrc: require('../assets/images/slide2.png')
    },
    {
        id: '3',
        title: 'We Paid the Gas Fee',
        content: 'We paid the price to keep your videos \n and legal agreements safe. Connect \n your wallet to get started.',
        imgSrc: require('../assets/images/slide3.png')
    }
];

export default function SwiperScreen() {
    const { open, close } = useAppKit()
    return (
        <SafeAreaView style={styles.container}>
            <Swiper
                style={styles.wrapper}
                loop={false}
                dot={<View style={styles.dot} />}
                activeDot={
                    <LinearGradient
                        colors={['#2D8EFF', '#9C3FE4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.activeDot}
                    />
                }
            >
                {slides.map((slide) => (
                    <View style={styles.slideContainer} key={slide.id}>
                        <View style={styles.titleContainer}>
                            <MaskedView
                                maskElement={<Text style={styles.title}>{slide.title}</Text>}
                            >
                                <LinearGradient
                                    colors={['rgba(0, 148, 255, 1)', 'rgba(160, 34, 148, 1)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradient}
                                />
                            </MaskedView>
                        </View>

                        <Text style={styles.subtitle}>{slide.content}</Text>
                        <Image
                            source={slide.imgSrc}
                            style={styles.img}
                        />
                    </View>
                ))}
            </Swiper>
            <GradientButton onPress={() => open({ view: 'Connect' })} width={248} />
            <ImageBackground
                source={require('../assets/images/ellipse.png')}
                style={styles.backgroundImage}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(30, 47, 55, .3)',
        paddingBottom: 150
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 586,
        zIndex: 0,
        resizeMode: 'cover',
        opacity: 0.5,
    },
    wrapper: {
        height: '100%'
    },
    slideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 62,
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Outfit-SemiBold',
        textAlign: 'center',
    },
    gradient: {
        height: 120,
        width: Dimensions.get('window').width - 40,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Outfit-Regular',
        color: '#A0AEC0',
        marginBottom: 40,
        textAlign: 'center',
        maxWidth: '100%',
        zIndex: 2
    },
    img: {
        width: 118,
        height: 158.12,
        marginBottom: 100,
        resizeMode: 'contain',
    },
    dot: {
        backgroundColor: '#D9D9D9',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot: {
        width: 24,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
});