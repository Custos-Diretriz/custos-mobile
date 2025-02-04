import { Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useRef } from "react";
import { ThemedView } from "@/components/ThemedView";
import { I_Account, WalletContext } from "@/app/context/WalletContext";
import { generateAvatarUrl } from "@/app/utils";
import avatar from "@/assets/images/avatar.png"
export const ProfileAvatar = () => {
  // const { SecureStore, ACCOUNT_STORE_KEY } = useContext(WalletContext);
  // const response = SecureStore?.getItem(ACCOUNT_STORE_KEY);
  // const account = JSON.parse(response);
  // let address = account[0]?.address?.slice(0, 3)?.concat("...");

  return (
    <LinearGradient
      colors={["#2D8EFF", "#9C3FE4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.profileContainer}
    >
      <ThemedView style={styles.gradientOverlayContainer}>
        <Image source={avatar} style={styles.avatar} />
        <ThemedText style={styles.walletAddress}>{""}</ThemedText>
      </ThemedView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    borderRadius: 100,
    backgroundColor: "white",
  },
  gradientOverlayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  walletAddress: {
    fontFamily: "Outfit-Regular",
    marginLeft: 8,
    marginRight: 8,
  },
});
