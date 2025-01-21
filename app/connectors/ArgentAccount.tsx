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
} from "starknet";
import { I_Account, WalletContext, WalletInfo } from "../context/WalletContext";
import ERC20_ABI from "../abi/ERC20.json";
import { useRouter } from "expo-router";

type WalletPop = {
  isVisible: boolean;
  onClose: () => void;
};

export let accountAddress: string;

const ArgentAccount: React.FC<WalletPop> = ({ isVisible, onClose }) => {
  const {
    pubKey,
    setPubKey,
    privKey,
    setPrivKey,
    saveAccountsToStore,
    loadAccountsFromStore,
    loadAccountsFromStoreAsync,
    deleteAccountsFromStore,
    SecureStore,
    ACCOUNT_STORE_KEY,
  } = useContext(WalletContext);

  const [callData, setCallData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deployed, setDeployed] = useState<boolean>(false);
  const [account, setAccount] = useState<I_Account>({
    address: "",
    publicKey: "",
    privateKey: "",
    callData: undefined,
  });
  const [accounts, setAccounts] = useState<I_Account[]>([]);
  const router = useRouter();

  //new Argent X account v0.3.0
  const argentXaccountClassHash = process.env.EXPO_PUBLIC_ARGENT_CLASS_HASH;

  const provider = new RpcProvider({
    nodeUrl: `${process.env.EXPO_PUBLIC_BASE_URL}`,
  });

  useEffect(() => {
    const lazyLoadAccountsFromStoreAsync = async () => {
      const accountsFromStore = await loadAccountsFromStoreAsync();
      setAccounts(accountsFromStore);
      accountsFromStore?.length > 0 && setAccount(accountsFromStore[0]);
      console.log("setting account", accountsFromStore[0]);
      console.log(accountAddress);
      accountAddress = account.address;

      console.log("details are, ", WalletContext);
    };

    lazyLoadAccountsFromStoreAsync();
  }, [accountAddress]);

  const accountCreation = () => {
    const privateKeyAX = stark.randomAddress();
    console.log("AX_ACCOUNT_PRIVATE_KEY=", privateKeyAX);

    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
    setPubKey(starkKeyPubAX);
    console.log("AX_ACCOUNT_PUBLIC_KEY=", starkKeyPubAX);

    const AXConstructorCallData = CallData.compile({
      owner: starkKeyPubAX,
      guardian: "0",
    });
    setCallData(AXConstructorCallData);

    const AXcontractAddress = hash.calculateContractAddressFromHash(
      starkKeyPubAX,
      argentXaccountClassHash as BigNumberish,
      AXConstructorCallData,
      0
    );

    console.log("Precalculated account address=", AXcontractAddress);

    const accountData: I_Account = {
      privateKey: privateKeyAX.toString(),
      publicKey: starkKeyPubAX.toString(),
      address: AXcontractAddress.toString(),
      callData: AXConstructorCallData as unknown as CallData,
    };

    console.log("argentWallet created with Data:", accountData);

    setAccounts([accountData]);
    setAccount(accountData);
    setPrivKey(privateKeyAX);
  };

  const generateAccount = async () => {
    // if (!account) {
    accountCreation();
    await deployAccount();
    if (deployed) {
      try {
        const isSaved = await saveAccountsToStore(
          accounts ? JSON.stringify([account]) : JSON.stringify([account]) // for a new wallet creation. This means account is not created
        );
        console.log("After save to store");

        if (isSaved) {
          console.log(
            "ACCOUNTS IN STORE",
            SecureStore.getItem(ACCOUNT_STORE_KEY)
          );

          // store only encrypted key

          // Save the accounts to store, including when the accounts are created.
          console.log(accounts);
          console.log(account);
          setDeployed(false);
        }
      } catch (e) {
        console.error("Error saving account to store", e);
      }
      console.log("account address=", accountAddress);
    }
    // }
  };

  const deployAccount = async () => {
    fundAddress();
    if (loading == true) {
      const accountAX = new Account(provider, accountAddress, privKey);
      console.log("provider is: ", process.env.EXPO_PUBLIC_BASE_URL);

      console.log("funded");
      const deployAccountPayload = {
        classHash: argentXaccountClassHash as string,
        constructorCalldata: callData,
        contractAddress: accountAddress,
        addressSalt: pubKey,
      };

      console.log("testing deployment");
      try {
        const {
          transaction_hash: AXdAth,
          contract_address: AXcontractFinalAddress,
        } = await accountAX.deployAccount(deployAccountPayload);
        console.log("✅ ArgentX wallet deployed at:", AXcontractFinalAddress);
        setDeployed(true);
      } catch (error) {
        console.log("error msg: ", error);
      }
    }
    setLoading(false);
    router.push("/(tabs)");
  };

  const fundAddress = async () => {
    console.log("setting up funds");

    const accountAdmin = new Account(
      provider,
      process.env.EXPO_PUBLIC_ADDRESS!,
      process.env.EXPO_PUBLIC_PRIVATE_KEY!
    );

    console.log("setting up accounts");

    const contractAddress = process.env.EXPO_PUBLIC_ERC20_ADDRESS;

    console.log("setting up erc contracts");

    try {
      const erc20 = new Contract(ERC20_ABI, contractAddress!, provider);
      erc20.connect(accountAdmin);

      console.log(
        "balance of account is ",
        await erc20.balanceOf(accountAdmin.address)
      );

      console.log("populating");

      const amount: BigNumberish = 3000000000000;

      const transferCall: Call = erc20.populate("transfer", {
        recipient: accountAddress,
        amount: amount,
      });

      const { transaction_hash: transferTxHash } = await accountAdmin.execute(
        transferCall
      );
      // Wait for the invoke transaction to be accepted on Starknet
      console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
      await provider.waitForTransaction(transferTxHash);

      // Check balance after transfer - should be 19 NIT
      console.log(`Calling Starknet for account balance...`);
      const balanceAfterTransfer = await erc20.balanceOf(accountAdmin.address);
      console.log("account has a balance of:", balanceAfterTransfer);
      console.log(
        "balance of address is ",
        await erc20.balanceOf(accountAddress)
      );
      console.log("✅ Transfer completed.");
      setLoading(true);
    } catch (error) {
      console.log(error);
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
            <Button onPress={generateAccount} title="Argent Connect" />
            {
              <>
                <Text style={{ color: "white" }}>{accountAddress}</Text>
                <Button onPress={deployAccount} title="Deploy Account" />
              </>
            }
          </View>
        </ModalContainer>
      </BlurredBackground>
    </Modal>
  );
};
export default ArgentAccount;
