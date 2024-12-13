import React from 'react'
import {StyleSheet} from 'react-native';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {SafeAreaView} from "react-native-safe-area-context";
import {PageHeader} from "@/components/PageHeader";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import {router} from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <PageHeader title={"Home"}></PageHeader>

        <ThemedView style={styles.agreementContainer}>
          <ThemedText type={"subtitle"}>Agreement</ThemedText>
          <ThemedText type={"default"}>No Agreements found</ThemedText>
          <ThemedView style={styles.noAgreementContainer}>
            <OutlinedButton
              text={"Create New Agreement"}
              textType={"defaultSemiBold"}
              onPress={() => {router.push("/(tabs)/agreement")}}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  agreementContainer: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0094FF",
    borderRadius: 16,
    padding: 16,
    width: "96%",
    marginHorizontal: "auto",
    marginVertical: 16,
  },
  noAgreementContainer: {
    height: 180,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 16
  }
})
