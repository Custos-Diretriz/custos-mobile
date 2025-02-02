import CRIME_ABI from "@/app/abi/CrimeRecord.json";
import { type Abi } from "starknet";
// import { useAccount, useContract, useReadContract } from "@starknet-react/core";
import { RpcProvider, Contract, json } from "starknet";
import { useCallback, useEffect, useState } from "react";
import { VideoData } from "@/app/(tabs)";
import { Alert } from "react-native";

export const crimeContractAddress =
  // "0x108fb0910981fdcb0aa48f1adb78bb51e98c10513fe53e92ac5df1056942730";
  "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342";

export const provider = new RpcProvider({
  nodeUrl:
    "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/ssUmUcHKo3lg3r17u83EdZXtn_aFPpKY",
});

export const crimeContract = new Contract(
  CRIME_ABI as Abi,
  crimeContractAddress,
  provider
);

export const useCrimeVideos = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    if (!crimeContract) return;
    setIsLoading(true);

    try {
      console.log("Fetching crime records for:", crimeContractAddress);

      const tokenIds = await crimeContract.get_all_user_uploads(
        crimeContractAddress
      );

      if (!tokenIds || tokenIds.length === 0) {
        setVideos([]);
        return;
      }

      // Convert token IDs from bigint to number
      const numericTokenIds = tokenIds.map((id: any) =>
        parseInt(id.toString(), 10)
      );

      console.log("Fetched Token IDs:", numericTokenIds);

      // Fetch metadata for each video
      const videoPromises = numericTokenIds.map(async (id: any) => {
        try {
          const uri = await crimeContract.get_token_uri(id);
          console.log(`Fetching metadata for Token ${id}:`, uri);

          const metadata = await fetchIPFSData(uri);
          return {
            title: metadata.title || "Untitled Evidence",
            timestamp: new Date(metadata.timestamp).toLocaleDateString(),
            uri: metadata.videoUrl || uri,
          };
        } catch (error) {
          console.error(`Error fetching metadata for Token ${id}:`, error);
          return null;
        }
      });

      const videoData = (await Promise.all(videoPromises)).filter(Boolean);
      setVideos(videoData);
    } catch (error) {
      console.error("Error fetching crime records:", error);
      Alert.alert("Error", "Failed to load crime records");
    } finally {
      setIsLoading(false);
    }
  }, [crimeContract]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, isLoading };
};

export const handleNewRecording = async (video: VideoData) => {
  if (!crimeContract) {
    Alert.alert("Error", "Please connect your wallet.");
    return;
  }

  try {
    const call = crimeContract.populate("crime_record", [[
      video.uri,
      video.title,
      video.timestamp,
    ]]);
    const res = await crimeContract.crime_record(call.calldata);
    await provider.waitForTransaction(res.transaction_hash);
    Alert.alert("Success", "Crime record successfully submitted.");
  } catch (error) {
    console.error("Error submitting crime record:", error);
    Alert.alert("Error", "Failed to submit crime record");
  }
};

const fetchIPFSData = async (ipfsHash: string) => {
  try {
    const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
    if (!response.ok) throw new Error("Failed to fetch IPFS data");
    return response.json();
  } catch (error) {
    console.error("Error fetching IPFS data:", error);
    return {
      title: "Unknown Crime",
      timestamp: Date.now(),
      videoUrl: ipfsHash,
    };
  }
};
