import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "@/components/GradientButton";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import ArgentAccount, { provider } from "./connectors/ArgentAccount";
import { WalletContext } from "./context/WalletContext";
import { Account, Contract } from "starknet";
import ERC20_ABI from "@/app/abi/ERC20.json";

const slides = [
  {
    id: "1",
    title: `Create Legal \n Agreements`,
    content:
      "Create new legal agreements by providing the \nagreement content, the address of the second \n party, and details about the first party.",
    imgSrc: require("../assets/images/slide1.png"),
  },
  {
    id: "2",
    title: "Crime Recorder",
    content:
      "We are providing an advanced platform \n for documenting and sharing crime \n events securely and transparently.",
    imgSrc: require("../assets/images/slide2.png"),
  },
  {
    id: "3",
    title: "We Paid the Gas Fee",
    content:
      "We paid the price to keep your videos \n and legal agreements safe. Connect \n your wallet to get started.",
    imgSrc: require("../assets/images/slide3.png"),
  },
];

export default function SwiperScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { SecureStore, ACCOUNT_STORE_KEY, deleteAccountsFromStore } =
    useContext(WalletContext);
  const loaded = JSON.parse(SecureStore.getItem(ACCOUNT_STORE_KEY));

  const contractAddress = process.env.EXPO_PUBLIC_ERC20_ADDRESS;
  const erc20 = new Contract(ERC20_ABI, contractAddress!, provider);

  const handleConnect = async () => {
    // if (!loaded) {
    //   setVisible(true);
    // }
    // const account = new Account(
    //   provider,
    //   loaded[0]?.address,
    //   loaded[0]?.privateKey
    // );
    // if (account) {
    //   try {
    //     erc20.connect(account);
    //     let balance = await erc20.balanceOf(account.address);
    //     console.log("Account is deployed and has balance:", balance.toString());
    //     loaded &&
    router.push("/(tabs)");
    //   } catch (error) {
    //     await deleteAccountsFromStore();
    //     setVisible(true);
    //   }
    // }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        style={styles.wrapper}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={
          <LinearGradient
            colors={["#2D8EFF", "#9C3FE4"]}
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
                  colors={["rgba(0, 148, 255, 1)", "rgba(160, 34, 148, 1)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                />
              </MaskedView>
            </View>

            <Text style={styles.subtitle}>{slide.content}</Text>
            <Image source={slide.imgSrc} style={styles.img} />
          </View>
        ))}
      </Swiper>
      <GradientButton onPress={handleConnect} width={248} />
      <ArgentAccount isVisible={visible} onClose={() => setVisible(!visible)} />
      <Image
        source={require("../assets/images/ellipse.png")}
        style={styles.backgroundImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    backgroundColor: "#000",
    paddingBottom: 150,
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 300,
    zIndex: 0,
    resizeMode: "cover",
    opacity: 0.5,
  },
  wrapper: {
    height: "100%",
    zIndex: 2,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 62,
    zIndex: 2,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Outfit-SemiBold",
    textAlign: "center",
  },
  gradient: {
    height: 120,
    width: Dimensions.get("window").width - 40,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Outfit-Regular",
    color: "#A0AEC0",
    marginBottom: 40,
    textAlign: "center",
    maxWidth: "100%",
    zIndex: 2,
  },
  img: {
    width: 118,
    height: 158.12,
    zIndex: 2,
    marginBottom: 100,
    resizeMode: "contain",
  },
  dot: {
    backgroundColor: "#D9D9D9",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
