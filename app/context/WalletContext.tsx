import React, { createContext, useContext, useState } from "react";
import { BigNumberish, SignerInterface } from "starknet";

export const WalletContext = createContext(undefined);

const WalletDetails = ({ children }: any) => {
  const [pubKey, setPubKey] = useState<BigNumberish | undefined>("");
  const [privKey, setPrivKey] = useState<string | Uint8Array | SignerInterface>(
    ""
  );
  const [accountAddress, setAccountAddress] = useState<string>("");

  return (
    <WalletContext.Provider
      value={{
        pubKey,
        setPubKey,
        setPrivKey,
        privKey,
        accountAddress,
        setAccountAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletDetails;
