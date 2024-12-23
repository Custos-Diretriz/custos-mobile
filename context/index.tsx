import 'react-native-get-random-values'
import React, {createContext, useContext, useEffect, useState} from 'react';
import * as SecureStore from "expo-secure-store";
import {isJsonString} from "@/utils";
import {Account, CallData, ec, hash, RpcProvider, stark} from 'starknet';
import axios from "axios";

const ACCOUNT_STORE_KEY = "CUSTOS_SECURE_ACCOUNT_STORE_KEY";

export interface I_Account {
  address: string;
  publicKey: string;
  privateKey: string;
  callData?: CallData;
  balance?: string;
}

interface I_WalletContext {
  account: I_Account
  setAccount: React.Dispatch<React.SetStateAction<I_Account>>
  accounts: I_Account[]
  setAccounts: React.Dispatch<React.SetStateAction<any[] | []>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string | "">>
  accountBalances: any[]
  setAccountBalances: React.Dispatch<React.SetStateAction<any[]>>
  publicKey: any;
  loginWithWallet: () => void
  createAccount: any
  createArgentWallet: () => void
  deployArgentWallet: () => void
  setup: any
  deleteAccount: any
  // AccountBalance: any
  // WalletBalance: any
  walletBalance: number,
  // setWalletBalance: React.Dispatch<React.SetStateAction<number>>
  // fetchWalletBalance: () => void
}

export const WalletContext = createContext<I_WalletContext>({
  account: {
    address: '',
    publicKey: '',
    privateKey: ''
  },
  setAccount: () => {
  },
  accounts: [],
  setAccounts: () => {
  },
  publicKey: "",
  password: "",
  setPassword: () => {
  },
  accountBalances: new Array<{ address: '', balance: 0 }>,
  setAccountBalances: () => {
  },
  loginWithWallet: () => {
  },
  createArgentWallet: () => {
  },
  deployArgentWallet: () => {
  },
  createAccount: () => {
  },
  setup: () => {
  },
  deleteAccount: () => {
  },
  // AccountBalance: () => {
  // },
  walletBalance: 0,
  // setWalletBalance: () => {},
  // fetchWalletBalance: () => {
  // }
} as const);

const saveAccountsToStore = async (data: string) => {
  try {
    await SecureStore.setItemAsync(ACCOUNT_STORE_KEY, data, {
      requireAuthentication: false,
      authenticationPrompt: "Confirm you want to do this",
    });
    console.log('Data stored successfully.');
    return true;
  } catch (error: any) {
    console.error('Failed to store data:', error);
    // Handle the case where authentication fails
    if (error.message.includes('User canceled')) {
      console.warn('User canceled authentication. Data was not stored.');
    } else {
      console.warn('Authentication failed for another reason.');
    }
    return false;
  }
}

const loadAccountsFromStore = () => {
  const accountDataString = SecureStore.getItem(ACCOUNT_STORE_KEY, {
    requireAuthentication: false,
    keychainService: "no-service"
  });
  // console.log("Accounts from store", accountDataString);

  if (accountDataString) {
    return isJsonString(accountDataString!) ? JSON.parse(accountDataString) : null;
  }

  return null;
}

const loadAccountsFromStoreAsync = async () => {
  const accountDataString = await SecureStore.getItemAsync(ACCOUNT_STORE_KEY);
  // console.log("Accounts from store async", accountDataString);

  if (accountDataString) {
    return isJsonString(accountDataString!) ? JSON.parse(accountDataString) : null;
  }

  return null;
}

// Function to delete the stored account
const deleteAccountsFromStore = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCOUNT_STORE_KEY);
    console.log('Account data deleted successfully.');
  } catch (error) {
    console.error('Failed to delete account data:', error);
  }
};

export function WalletProvider({children}: { children: React.ReactNode }) {
  const [] = useState("");
  const [publicKey, setPublicKey] = useState();
  const [account, setAccount] = useState<I_Account>({
    address: '',
    publicKey: '',
    privateKey: '',
    callData: undefined,
  })
  const [accounts, setAccounts] = useState<I_Account[]>([]);
  const [privateKey, setPrivateKey] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [activeAccount, setActiveAccount] = useState(null)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [accountBalances, setAccountBalances] = useState<{ address: string; balance: number }[]>([])
  const [walletBalance, setWalletBalance] = useState(0)

  // ANCHOR STATE MANAGEMENT
  // const [baseAncherProvider, setBaseAncherProvider] = useState();

  // console.log("ACCOUNTE FROM CONTEXT", accounts);
  // const wallet = new Wallet(getKeyPairFromAccount(account, password));
  // const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"});

  // console.log(solanaWeb3);

  // connect provider
  const NODE_URL = "https://starknet-sepolia.public.blastapi.io/rpc/v0_7";
  const provider = new RpcProvider({nodeUrl: `${NODE_URL}`});
  //new Argent X account v0.3.0
  const argentXaccountClassHash = '0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003';

  useEffect(() => {
  }, []);

  useEffect(() => {
    const lazyLoadAccountsFromStoreAsync = async () => {
      const accountsFromStore = await loadAccountsFromStoreAsync();
      setAccounts(accountsFromStore);
      accountsFromStore?.length > 0 && setAccount(accountsFromStore[0]);
      // console.log("setting account", accountsFromStore[0]);
    }

    lazyLoadAccountsFromStoreAsync();
  }, []);

  const createArgentWallet = async () => {

    // Generate public and private key pair.
    const privateKeyAX = stark.randomAddress();
    console.log('AX_ACCOUNT_PRIVATE_KEY=', privateKeyAX);
    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
    console.log('AX_ACCOUNT_PUBLIC_KEY=', starkKeyPubAX);

    // Calculate future address of the ArgentX account
    const AXConstructorCallData = CallData.compile({
      owner: starkKeyPubAX,
      guardian: '0',
    });

    const AXcontractAddress = hash.calculateContractAddressFromHash(
      starkKeyPubAX,
      argentXaccountClassHash,
      AXConstructorCallData,
      0
    );
    console.log('Precalculated account address=', AXcontractAddress);

    // Save Private Key to mobile storage
    console.log("Private Key", privateKeyAX);
    const accountData = {
      privateKey: privateKeyAX.toString(),
      publicKey: starkKeyPubAX.toString(),
      address: AXcontractAddress.toString(),
      callData: AXConstructorCallData,
    }

    console.log("argentWallet created with DAta:", accountData)
    // await saveAccountsToStore(JSON.stringify(accountData));
    try {
      const isSaved = await saveAccountsToStore(
        accounts
          ? JSON.stringify([accountData])
          : JSON.stringify([accountData]) // for a new wallet creation. This means account is not created
      );
      console.log("After save to store")


      if (isSaved) {
        console.log("ACCOUNTS IN STORE", SecureStore.getItem(ACCOUNT_STORE_KEY));
        setAccounts([accountData]);
        setAccount(accountData);
        setPrivateKey(privateKeyAX) // store only encrypted key

        // Save the accounts to store, including when the accounts are created.
        console.log(accounts)
      }
    } catch (e) {
      console.error('Error saving account to store', e);
    }

    try { // fund account address before account creation
      const {data: answer} = await axios.post(
        'https://starknet-sepolia.public.blastapi.io/mint',
        {address: AXcontractAddress, amount: 50_000_000_000_000_000_000, lite: true},
        {headers: {'Content-Type': 'application/json'}}
      );
      console.log('Answer mint =', answer);
    } catch (e) {
      console.error(e);
    }
  }

  const deployArgentWallet = async () => {
    const AXcontractAddress = account.address;
    const privateKeyAX = account.privateKey;
    const starkKeyPubAX = account.publicKey;
    const AXConstructorCallData = account.callData;

    // DEPLOY NEW ACCOUNT
    const accountAX = new Account(provider, AXcontractAddress, privateKeyAX);

    const deployAccountPayload = {
      classHash: argentXaccountClassHash,
      constructorCalldata: AXConstructorCallData,
      contractAddress: AXcontractAddress,
      addressSalt: starkKeyPubAX,
    };

    try {
      const {transaction_hash: AXdAth, contract_address: AXcontractFinalAddress} =
        await accountAX.deployAccount(deployAccountPayload);
      console.log('✅ ArgentX wallet deployed at:', AXcontractFinalAddress);
    } catch (e) {
      console.error(e)
    }
  }

  const deleteAccount = async () => {
    await SecureStore.deleteItemAsync(ACCOUNT_STORE_KEY);
  }

  const contextValues = {
    account,
    setAccount,
    accounts,
    setAccounts,
    publicKey,
    password,
    setPassword,
    // AccountBalance,
    createArgentWallet,
    deployArgentWallet,
    deleteAccount,
    walletBalance,
    accountBalances,
    setAccountBalances
  }

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>;
}

export const useWalletContext = () => useContext(WalletContext);
export default WalletProvider;
