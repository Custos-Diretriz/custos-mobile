import { Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import Avatar from "@/assets/images/avatar.png";
import { ThemedView } from "@/components/ThemedView";
import { WalletContext } from "@/app/context/WalletContext";
import { accountAddress } from "@/app/connectors/ArgentAccount";

export const ProfileAvatar = () => {
  return (
    <LinearGradient
      colors={["#2D8EFF", "#9C3FE4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.profileContainer}
    >
      <ThemedView style={styles.gradientOverlayContainer}>
        <Image source={Avatar} style={styles.avatar} />
        <ThemedText style={styles.walletAddress}>
          {accountAddress.slice(0, 5).concat("...")}
        </ThemedText>
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
    // backgroundColor: '#000',
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
    // color: '#fff',
    fontFamily: "Outfit-Regular",
    marginLeft: 8,
    marginRight: 8,
  },
});
