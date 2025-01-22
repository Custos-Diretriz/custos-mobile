import React, {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";
import {
  BigNumberish,
  CallData,
  RawArgsObject,
  SignerInterface,
} from "starknet";
import * as SecureStore from "expo-secure-store";
import { isJsonString } from "@/app/utils";

export const WalletContext = createContext<WalletInfo>({
  pubKey: 0,
  setPubKey: () => {},
  setPrivKey: () => {},
  privKey: "",
  saveAccountsToStore: () => {},
  loadAccountsFromStore: () => {},
  loadAccountsFromStoreAsync: () => {},
  deleteAccountsFromStore: () => {},
  SecureStore: () => {},
  ACCOUNT_STORE_KEY: "",
});

export interface I_Account {
  address: string;
  publicKey: string;
  privateKey: string;
  callData?: RawArgsObject | undefined;
  balance?: string;
}

export interface WalletInfo {
  pubKey: BigNumberish | undefined;
  setPubKey: React.Dispatch<React.SetStateAction<BigNumberish | undefined>>;
  setPrivKey: React.Dispatch<
    React.SetStateAction<string | Uint8Array | SignerInterface>
  >;
  privKey: string | Uint8Array | SignerInterface;
  saveAccountsToStore: any;
  loadAccountsFromStore: any;
  loadAccountsFromStoreAsync: any;
  deleteAccountsFromStore: any;
  SecureStore: any;
  ACCOUNT_STORE_KEY: string;
}

const ACCOUNT_STORE_KEY = "CUSTOS_SECURE_ACCOUNT_STORE_KEY";

const saveAccountsToStore = async (data: string) => {
  try {
    await SecureStore.setItemAsync(ACCOUNT_STORE_KEY, data, {
      requireAuthentication: false,
      authenticationPrompt: "Confirm you want to do this",
    });
    console.log("Data stored successfully.");
    return true;
  } catch (error: any) {
    console.error("Failed to store data:", error);
    // Handle the case where authentication fails
    if (error.message.includes("User canceled")) {
      console.warn("User canceled authentication. Data was not stored.");
    } else {
      console.warn("Authentication failed for another reason.");
    }
    return false;
  }
};

const loadAccountsFromStore = () => {
  const accountDataString = SecureStore.getItem(ACCOUNT_STORE_KEY, {
    requireAuthentication: false,
    keychainService: "no-service",
  });
  // console.log("Accounts from store", accountDataString);

  if (accountDataString) {
    return isJsonString(accountDataString!)
      ? JSON.parse(accountDataString)
      : null;
  }

  return null;
};

const loadAccountsFromStoreAsync = async () => {
  const accountDataString = await SecureStore.getItemAsync(ACCOUNT_STORE_KEY);
  // console.log("Accounts from store async", accountDataString);

  if (accountDataString) {
    return isJsonString(accountDataString!)
      ? JSON.parse(accountDataString)
      : null;
  }

  return null;
};

// Function to delete the stored account
const deleteAccountsFromStore = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCOUNT_STORE_KEY);
    console.log("Account data deleted successfully.");
  } catch (error) {
    console.error("Failed to delete account data:", error);
  }
};

const WalletDetails = ({ children }: { children: React.ReactNode }) => {
  const [pubKey, setPubKey] = useState<BigNumberish | undefined>("");
  const [privKey, setPrivKey] = useState<string | Uint8Array | SignerInterface>(
    ""
  );

  return (
    <WalletContext.Provider
      value={{
        pubKey,
        setPubKey,
        setPrivKey,
        privKey,
        saveAccountsToStore,
        loadAccountsFromStore,
        loadAccountsFromStoreAsync,
        deleteAccountsFromStore,
        SecureStore,
        ACCOUNT_STORE_KEY,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletDetails;
