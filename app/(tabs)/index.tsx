import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  TextStyle,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageHeader } from "@/components/PageHeader";
import styled from "styled-components/native";
import {
  useNavigation,
  useTheme,
  NavigationProp,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Plus, Video } from "lucide-react-native";
import ArrowRight from "@/assets/svgs/arrowRight.svg";
import MaskedView from "@react-native-masked-view/masked-view";
import { ScrollView } from "react-native-gesture-handler";
import { Abi, useAccount, useContract, useReadContract, useSendTransaction } from "@starknet-react/core";
import { ABI } from "@/app/abi/abi"

// const videos: { title: string; timestamp: string }[] = [
//   {
//     title: "Domestic Abuse From Husband",
//     timestamp: "Tuesday, 24th January 2024. 10:39:21 a.m.",
//   },
//   {
//     title: "North Avenue Murder",
//     timestamp: "Tuesday, 15th June 2024. 10:39:21 a.m.",
//   },
//   {
//     title: "Vandalization",
//     timestamp: "Monday, 4th March 2024. 10:39:21 a.m.",
//   },
//   {
//     title: "Theft",
//     timestamp: "Monday, 4th March 2024. 10:39:21 a.m.",
//   },
// ];

const agreements: { title: string; timestamp: string }[] = [

  {
    title: "Non Disclosure Agreement",
    timestamp: "Friday, 2nd May 2024. 10:39:21 a.m.",
  },
  {
    title: "Consortium",
    timestamp: "Tuesday, 1st February 2024. 10:39:21 a.m.",
  },
  {
    title: "Collaborative Research Agreement",
    timestamp: "Tuesday, 24th January 2024. 10:39:21 a.m.",
  },
  {
    title: "Non Disclosure Agreement",
    timestamp: "Tuesday, 24th January 2024. 10:39:21 a.m.",
  },
  {
    title: "Non Disclosure Agreement",
    timestamp: "Friday, 2nd May 2024. 10:39:21 a.m.",
  },
  {
    title: "Consortium",
    timestamp: "Tuesday, 1st February 2024. 10:39:21 a.m.",
  },
  {
    title: "&&&&&&",
    timestamp: "Tuesday, 24th January 2024. 10:39:21 a.m.",
  },
  {
    title: "********",
    timestamp: "Tuesday, 24th January 2024. 10:39:21 a.m.",
  },
];

type RootStackParamList = {
  "crime-video": { onSubmit: (videoData: any) => Promise<void> };
  "agreement": undefined;
  "video-detail": {
    videoUri: string;
    title: string;
    timestamp: string;
  };
};

interface VideoData {
  title: string;
  timestamp: string;
  uri: string;
  data?: any;
}

export default function Home() {
  const { address } = useAccount();
  const [videos, setVideos] = useState<{ title: String; timestamp: string }[]>([])
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const crimeContractAddress = "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342"; // testnet
  // const contractAddress = "0x020bd5ec01c672e69e3ca74df376620a6be8a2b104ab70a9f0885be00dd38fb9"; // mainnet
  const typedABI = ABI as Abi;
  const { contract } = useContract({
    abi: typedABI,
    address: crimeContractAddress
  })

  // Fetch crime records from blockchain
  const fetchCrimeRecords = async () => {
    if (!address || !contract ) return;

    try {
      setLoading(true);
      // Call contract method to get user's token IDs
      const { data: tokenIds, error, isLoading } = useReadContract(
        {
          functionName: "get_all_user_uploads",
          abi: typedABI,
          address: crimeContractAddress,
          watch: true,
        }
      )

      if (error) {
        console.error("Error fetching crime records:", error);
        return;
      }

      if (!tokenIds) {
        console.log("No records found.");
        return;
      }

      const numericTokenIds = (tokenIds as bigint[])?.map((id: bigint) => Number(id));

      // Fetch metadata for each token
      const videoPromises = numericTokenIds.map(async (id: number) => {
        const uri = await contract.get_token_uri(id);
        const metadata = await fetchIPFSData(uri);
        return {
          title: metadata.title || "Untitled Evidence",
          timestamp: new Date(metadata.timestamp).toLocaleDateString(),
          uri: metadata.videoUrl || uri,
        };
      });

      const videoData = (await Promise.all(videoPromises)).filter(Boolean);
      setVideos(videoData)
    } catch (error) {
      console.error("Error fetching crime records:", error);
      Alert.alert("Error", "Failed to load crime records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrimeRecords();
  }, [address]);

  const handleViewVideo = (video: VideoData) => {
    navigation.navigate("video-detail", {
      videoUri: `https://ipfs.io/ipfs/${video.uri.split('//').pop()}`,
      title: video.title,
      timestamp: video.timestamp
    });
  };

  const fetchIPFSData = async (ipfsHash: string) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`, {
        signal: controller.signal
      });

      clearTimeout(timeout);
      if (!response.ok) {
        throw new Error(`IPFS request failed with status: ${response.status}`)
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching IPFS data:", error);
      return {
        title: "Unknown Crime",
        timestamp: Date.now(),
        videoUrl: ipfsHash
      };
    }
  };

  const handlePress = (tab: "agreement" | "crime-video") => {
    if (tab === "crime-video") {
      navigation.navigate(tab, { onSubmit: handleNewRecording });
    } else {
      navigation.navigate(tab);
    }
  };
  

  const handleNewRecording = async (video: VideoData) => {
    if (!address || !contract) return;

    try {
      // Call contract method to create new crime record
      const { send, error, isPending } = useSendTransaction({
        calls: contract && address
          ? [contract.populate("crime_record", [video.uri,
            video.data])]
          : undefined,
      }); 
      // Refresh list after successful submission
      await fetchCrimeRecords();
    } catch (error) {
      console.error("Error submitting crime record:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={{ flex: 1 }}
      >
        <ThemedView style={styles.contentContainer} noBackground>
          <PageHeader title={"Home"}></PageHeader>

          <WrapperContainer>
            <OuterContainer hasData={videos.length > 0}>
              <SectionTitle color={colors.text}>
                My Videos ({loading ? "..." : videos.length})
              </SectionTitle>
              <GradientBorder
                colors={["#19B1D2", "#0094FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <StyledBlurView intensity={20}>
                  <BackgroundGradient
                    colors={["#04080C", "#09131A"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                  >
                    <View
                      style={{
                        flexGrow: 1,
                        flex: 1,
                      }}
                    >
                      {videos.length > 0 ? (
                        <ScrollView style={{ flex: 1 }}>
                          <View
                            style={{ flex: 1, gap: 12, paddingHorizontal: 6 }}
                          >
                            {videos.map((video, index) => (
                              <LinearGradient
                                key={`agreement-${index}`}
                                colors={[
                                  "rgba(25, 177, 210, 0.1)",
                                  "rgba(0, 148, 255, 0.1)",
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 1, borderRadius: 8 }}
                              >
                                <CardContainer>
                                  <CardContent>
                                    <CardHeader>
                                      <LinearGradient
                                        colors={["#2D8EFF", "#9C3FE4"]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.profileContainer}
                                      >
                                          <ThemedView
                                            style={
                                            styles.gradientOverlayContainer
                                          }
                                        >
                                          <CardTitle>{video.title}</CardTitle>
                                        </ThemedView>
                                        
                                      </LinearGradient>

                                      <ViewButton onPress={() => handleViewVideo(video)}>
                                        <ViewButtonText>View</ViewButtonText>
                                        <ViewButtonIcon>
                                          <ArrowRight />
                                        </ViewButtonIcon>
                                      </ViewButton>
                                    </CardHeader>
                                    <TimestampContainer>
                                      <TimestampLabel color={colors.text}>
                                        Time Stamp:{" "}
                                      </TimestampLabel>
                                      <TimestampValue value={video.timestamp} />
                                    </TimestampContainer>
                                  </CardContent>
                                </CardContainer>
                              </LinearGradient>
                            ))}
                          </View>
                        </ScrollView>
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ThemedText style={styles.message}>
                            You have not saved any video here. Launch your
                            camera to record your evidence.
                          </ThemedText>

                          <TouchableOpacity
                              onPress={() => handlePress("crime-video")}
                          >
                            <LinearGradient
                              colors={["#2D8EFF", "#9C3FE4"]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.ButtonContainer}
                            >
                              <ThemedView style={styles.ctaButton}>
                                <ThemedText style={styles.ctaButtonText}>
                                  Start Recording
                                </ThemedText>
                                <Video
                                  size={24}
                                  color="#fff"
                                  style={styles.recordIcon}
                                />
                              </ThemedView>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </BackgroundGradient>
                </StyledBlurView>
              </GradientBorder>
            </OuterContainer>

            <OuterContainer hasData={agreements.length > 0}>
              <SectionTitle color={colors.text}>
                My Agreements ({agreements.length})
              </SectionTitle>
              <GradientBorder
                colors={["#19B1D2", "#0094FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <StyledBlurView intensity={20}>
                  <BackgroundGradient
                    colors={["#04080C", "#09131A"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                  >
                    <View
                      style={{
                        flexGrow: 1,
                        flex: 1,
                      }}
                    >
                      {agreements.length > 0 ? (
                        <ScrollView style={{ flex: 1 }}>
                          <View
                            style={{ flex: 1, gap: 12, paddingHorizontal: 6 }}
                          >
                            {agreements.map((agreement, index) => (
                              <LinearGradient
                                key={`agreement-${index}`}
                                colors={[
                                  "rgba(25, 177, 210, 0.1)",
                                  "rgba(0, 148, 255, 0.1)",
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 1, borderRadius: 8 }}
                              >
                                <CardContainer>
                                  <CardContent>
                                    <CardHeader>
                                      <LinearGradient
                                        colors={["#2D8EFF", "#9C3FE4"]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.profileContainer}
                                      >
                                        <ThemedView
                                          style={
                                            styles.gradientOverlayContainer
                                          }
                                        >
                                          <CardTitle>
                                            {agreement.title}
                                          </CardTitle>
                                        </ThemedView>
                                      </LinearGradient>

                                      <ViewButton>
                                        <ViewButtonText>View</ViewButtonText>
                                        <ViewButtonIcon>
                                          <ArrowRight />
                                        </ViewButtonIcon>
                                      </ViewButton>
                                    </CardHeader>
                                    <TimestampContainer>
                                      <TimestampLabel color={colors.text}>
                                        Time Stamp:{" "}
                                      </TimestampLabel>
                                      <TimestampValue
                                        value={agreement.timestamp}
                                      />
                                    </TimestampContainer>
                                  </CardContent>
                                </CardContainer>
                              </LinearGradient>
                            ))}
                          </View>
                        </ScrollView>
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ThemedText style={styles.message}>
                            You have not created any agreement yet. You can
                            start creating one from here.
                          </ThemedText>

                          {/* <GradientText
                            value="You have not saved any video here. Launch your
                            camera to record your evidence."
                            from="#EAF9FF"
                            to="#8E9A9A"
                            styles={{
                              fontSize: 16,
                              fontWeight: 400,
                              textAlign: "center",
                            }}
                          /> */}

                          <TouchableOpacity
                            onPress={() => handlePress("agreement")}
                          >
                            <LinearGradient
                              colors={["#2D8EFF", "#9C3FE4"]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.ButtonContainer}
                            >
                              <ThemedView style={styles.ctaButton}>
                                <ThemedText style={styles.ctaButtonText}>
                                  Create New Agreement
                                </ThemedText>
                                <Plus
                                  size={24}
                                  color="#fff"
                                  style={styles.recordIcon}
                                />
                              </ThemedView>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </BackgroundGradient>
                </StyledBlurView>
              </GradientBorder>
            </OuterContainer>
          </WrapperContainer>
        </ThemedView>
      </ImageBackground>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  message: {
    textAlign: "center",
    padding: 16,
    fontSize: 14,
  },
  maskedView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maskedText: {
    fontSize: 14,
    fontWeight: 400,
  },
  gradient: {
    flex: 1,
  },
  ButtonContainer: {
    margin: 20,
    width: 248,
    borderRadius: 30,
    padding: 3,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 16,
  },
  ctaButtonText: {
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    fontWeight: "500",
    marginRight: 8,
  },
  recordIcon: {
    marginLeft: 4,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0.5,
    borderRadius: 100,
    backgroundColor: "white",
  },
  gradientOverlayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  timestampText: {
    fontSize: 12,
    fontWeight: 400,
  },
});

const SectionTitle = styled.Text<{ color: string }>`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.color};
  margin-bottom: 8px;
`;

const WrapperContainer = styled.View`
  flex: 1;
  align-items: center;
  gap: 32px;
`;

const OuterContainer = styled.View<{ hasData: boolean }>`
  margin-top: 10px;
  width: 100%;
  flex: 1;
  max-height: ${(props) => (props.hasData ? "290px" : "200px")};
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const GradientBorder = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: 0.2px;
  border-radius: 20px;
`;

const StyledBlurView = styled(BlurView)`
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
`;

const BackgroundGradient = styled(LinearGradient)`
  flex: 1;
  border-radius: 20px;
  padding: 8px 4px;
  background-color: transparent;
`;

const ScrollContent = styled.ScrollView`
  width: 100%;
  max-height: 160px;
`;

const CardContainer = styled.View`
  margin: 0px;
  border-radius: 8px;
  overflow: hidden;
`;

const CardContent = styled.View`
  padding: 8px;
  background-color: rgba(4, 8, 12, 0.6);
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.Text`
  color: #0084ff;
  font-size: 12px;
  font-weight: 500;
`;

const ViewButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ViewButtonText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
`;

const ViewButtonIcon = styled.Text`
  color: #ffffff;
  font-size: 12px;
`;

const TimestampContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const TimestampLabel = styled.Text<{ color: string }>`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.color};
`;

const TimestampValue = ({ value }: { value: string }) => (
  <MaskedView maskElement={<Text style={styles.timestampText}>{value}</Text>}>
    <LinearGradient
      colors={["#19B1D2", "#0094FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <Text style={[styles.timestampText, { opacity: 0 }]}>{value}</Text>
    </LinearGradient>
  </MaskedView>
);

const GradientText = ({
  value,
  from,
  to,
  styles,
}: {
  value: string;
  from: string;
  to: string;
  styles: StyleProp<TextStyle> | undefined;
}) => (
  <MaskedView maskElement={<Text style={styles}>{value}</Text>}>
    <LinearGradient
      colors={[from, to]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <Text style={[styles, { opacity: 0 }]}>{value}</Text>
    </LinearGradient>
  </MaskedView>
);
