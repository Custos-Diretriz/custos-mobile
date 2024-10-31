import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Button,
} from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@react-navigation/native";
import { Arrow, Cross, Logo, Menu, Video } from "@/assets/images/icons/Icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

const Navbar = () => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleConnectWallet = () => {
    console.log("Connect Wallet clicked");
    setModalVisible(false);
  };


  const projectId = '81db21c2e50629bb5a72570345514f84';

const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};


const {address, open, isConnected, provider} = useWalletConnectModal();

const handleConnection = () => {
  if (isConnected) {
    return provider?.disconnect();
  }

  return open();
};
  return (
    <>
      <View style={[styles.navbar, { backgroundColor: colors.background }]}>
        <TouchableOpacity>
          <Logo />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={[styles.hamburger, { color: colors.text }]}>
            <Menu />
          </Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0)']}
            style={styles.backgr}
          />
          <BlurView intensity={20} style={styles.blurContainer}>
            <View style={styles.item}>
              <Text style={[styles.menuItem, { color: colors.text }]}>
                Home
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.menuItem, { color: colors.text }]}>
                Company
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={[styles.menuItem, { color: colors.text }]}>
                Agreement{" "}
              </Text>
              <Cross />
            </View>

            <View style={styles.item}>
              <Text style={[styles.menuItem, { color: colors.text }]}>
                Video{" "}
              </Text>
              <Video />
            </View>

            <TouchableOpacity onPress={handleConnectWallet}>
            
                <LinearGradient
                      colors={['#19B1D2', '#0094FF']}
                  style={styles.border}
                >
                    <TouchableOpacity style={styles.item}
                     onPress={handleConnection}>
                  <Text style={[styles.menuItem, { color: colors.text }]}>
                    Connect Wallet
                  </Text>

                  <Arrow />

              </TouchableOpacity>
                </LinearGradient>
            </TouchableOpacity>
            <Text>{isConnected ? address : "No Connected"}</Text>
            <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
          </BlurView>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 0,
    elevation: 3,
    paddingTop: 40,
  },
  backgr:{
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
  hamburger: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    fontSize: 18,
    textAlign: "left",
    paddingTop: 40,
    fontFamily: "SpaceMono",
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuItem: {
    fontSize: 23,
    textAlign: "left",
    fontFamily: "SpaceMono",
    paddingLeft: 10,
  },
  border: {
    borderWidth: 2,
    borderRadius: 50, 
    padding: 2,
    marginTop: 50,
  },
  buttonItem :{
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  }
});

export default Navbar;
