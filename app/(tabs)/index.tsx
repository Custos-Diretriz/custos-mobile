import React from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { View } from "@/components/ThemedView";
// import { Text } from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageHeader } from "@/components/PageHeader";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import { useRouter } from 'expo-router';
import backgroundImage from "../../assets/images/background-image.png"
import { Colors } from '@/constants/Colors';
export default function Home() {
  const router = useRouter()
  return (
    <SafeAreaView  >
      <ImageBackground style={{
        backgroundColor: Colors.transparentBg,
      }} source={require("../../assets/images/background-image.png")} resizeMode="cover" >
        <PageHeader title={"Home"}></PageHeader>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <View style={{
              width: "100%"
            }}>
              <View style={styles.title_container} >
                <Text style={styles.title} >My Videos (0)</Text>
              </View>
              <View style={styles.title_container} >
                <View style={styles.agreementContainer}>
                  <Text style={styles.description}>You have not saved any video here. Launch your camera to record your evidence.</Text>
                  <View style={[styles.noAgreementContainer, { marginTop: 14 }]}>
                    <OutlinedButton
                      icon={<Image source={require("../../assets/images/video-icon.png")} />}
                      text={"Start Recording"}
                      textType={"defaultSemiBold"}
                      onPress={() => {
                        router.push("/(tabs)/crime-video")
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{
              width: "100%",
              marginTop: 32
            }}>
              <View style={styles.title_container} >
                <Text style={styles.title} >My Agreements (0)</Text>
              </View>
              <View style={styles.title_container} >
                <View style={styles.agreementContainer}>
                  <Text style={styles.description}>You have not saved any video here. Launch your camera to record your evidence.</Text>
                  <View style={[styles.noAgreementContainer, { marginTop: 14 }]}>
                    <OutlinedButton
                      text={"Create New Agreement"}
                      textType={"defaultSemiBold"}
                      onPress={() => {
                        router.push("/(tabs)/agreement")
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: 310,
    // backgroundColor: "#1E2F37",

  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.transparentBg,
    // backgroundColor: "#1E2F37",
    width: "100%",

  },
  title_container: {
    paddingHorizontal: 16,
  },
  agreementContainer: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0094FF",
    backgroundColor: Colors.card_color,
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 12,
    width: 361,
    marginHorizontal: "auto",
    marginVertical: 16,
  },
  noAgreementContainer: {
    // height: 180,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 16
  },
  title: {
    fontSize: 16,
    color: "#EAFBFF",
    fontFamily: "Outfit-Regular"
  },
  description: {
    color: "#EAFBFF",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Outfit-Regular"
  }
})
