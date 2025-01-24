import React, { useContext, useEffect, useRef, useState } from "react";
import "react-native-get-random-values";
import {
  BlurredBackground,
  ModalContainer,
} from "@/components/modalScreens/AgreementSuccessful";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Text, Button, View, TouchableOpacity } from "react-native";
import {
  Account,
  ec,
  stark,
  RpcProvider,
  hash,
  CallData,
  BigNumberish,
  Contract,
  Call,
  RawArgsObject,
} from "starknet";
import { I_Account, WalletContext } from "../context/WalletContext";
import ERC20_ABI from "../abi/ERC20.json";
import { useRouter } from "expo-router";

type WalletPop = {
  isVisible: boolean;
  onClose: () => void;
};

export const provider = new RpcProvider({
  nodeUrl: `${process.env.EXPO_PUBLIC_BASE_URL}`,
});

const ArgentAccount: React.FC<WalletPop> = ({ isVisible, onClose }) => {
  const {
    pubKey,
    setPubKey,
    privKey,
    setPrivKey,
    saveAccountsToStore,
    loadAccountsFromStoreAsync,
  } = useContext(WalletContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<I_Account | null>(null);
  const router = useRouter();

  //new Argent X account v0.3.0
  const argentXaccountClassHash = process.env.EXPO_PUBLIC_ARGENT_CLASS_HASH;

  useEffect(() => {
    const lazyLoadAccountsFromStoreAsync = async () => {
      const accountsFromStore = await loadAccountsFromStoreAsync();
      if (accountsFromStore.length > 0) {
        setAccount(accountsFromStore[0]);
      }
    };

    lazyLoadAccountsFromStoreAsync();
  }, []);

  const createAndDeployAccount = async () => {
    try {
      /* setLoading(true);
      setError(null);

      const privateKeyAX = stark.randomAddress();
      const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);

      const AXConstructorCallData = CallData.compile({
        owner: starkKeyPubAX,
        guardian: "0",
      });

      const AXcontractAddress = hash.calculateContractAddressFromHash(
        starkKeyPubAX,
        argentXaccountClassHash as BigNumberish,
        AXConstructorCallData,
        0
      );

      const newAccount: I_Account = {
        privateKey: privateKeyAX.toString(),
        publicKey: starkKeyPubAX.toString(),
        address: AXcontractAddress.toString(),
        callData: AXConstructorCallData as unknown as RawArgsObject,
      };

      setAccount(newAccount);
      setPubKey(starkKeyPubAX);
      setPrivKey(privateKeyAX);

      await fundAddress(newAccount);

      const accountAX = new Account(
        provider,
        newAccount.address,
        newAccount.privateKey
      );

      const deployAccountPayload = {
        classHash: argentXaccountClassHash as string,
        constructorCalldata: newAccount.callData,
        contractAddress: newAccount.address,
        addressSalt: newAccount.publicKey,
      };

      const {
        transaction_hash: AXdAth,
        contract_address: AXcontractFinalAddress,
      } = await accountAX.deployAccount(deployAccountPayload);
      console.log("✅ ArgentX wallet deployed at:", AXcontractFinalAddress);

      await saveAccountsToStore(
        account ? JSON.stringify([newAccount]) : JSON.stringify([newAccount])
      ); */

      // dummy account
      await saveAccountsToStore(
        JSON.stringify([
          {
            address: "0x1234567890",
            publicKey: "0x1234567890",
            privateKey: "0x1234567890",
            callData: {},
          },
        ])
      );

      router.push("/(tabs)");
    } catch (err) {
      console.error("Error creating and deploying account:", err);
      setError("Error creating and deploying account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fundAddress = async (account: I_Account) => {
    try {
      const contractAddress = process.env.EXPO_PUBLIC_ERC20_ADDRESS;
      const erc20 = new Contract(ERC20_ABI, contractAddress!, provider);
      const amount: BigNumberish = 3000000000000;

      const accountBalance = await erc20.balanceOf(account.address);
      if (accountBalance == 0) {
        const accountAdmin = new Account(
          provider,
          process.env.EXPO_PUBLIC_ADDRESS!,
          process.env.EXPO_PUBLIC_PRIVATE_KEY!
        );

        erc20.connect(accountAdmin);

        const transferCall: Call = erc20.populate("transfer", {
          recipient: account.address,
          amount: amount,
        });

        const { transaction_hash: transferTxHash } = await accountAdmin.execute(
          transferCall
        );
        await provider.waitForTransaction(transferTxHash);
      }
    } catch (err) {
      console.error("Error funding account:", err);
      throw new Error("Error funding account."); // Re-throw the error to be caught by the parent function
    }
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <BlurredBackground intensity={50} tint="dark">
        <ModalContainer>
          <View
            style={[
              {
                width: 250,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
                marginHorizontal: 3,
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Create your Account
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <Button
              onPress={createAndDeployAccount}
              title="Argent Connect"
              disabled={loading}
            />
            {loading && <Text style={{ color: "white" }}>Deploying...</Text>}
            {error && <Text style={{ color: "red" }}>{error}</Text>}
          </View>
        </ModalContainer>
      </BlurredBackground>
    </Modal>
  );
};
export default ArgentAccount;
