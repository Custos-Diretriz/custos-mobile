import { RpcProvider, Contract } from "starknet";
import { ABI } from "../app/abi/ERC20";
import { type Abi } from "starknet";
import { useAccount, useBalance, useContract, useReadContract } from "@starknet-react/core"

const contractAddress = "0x03cbefe95450dddc88638f7b23f34d83fc48b570e476d87a608c07724aaaa342"; // testnet
// const contractAddress = "0x020bd5ec01c672e69e3ca74df376620a6be8a2b104ab70a9f0885be00dd38fb9"; // mainnet

// Agreement Contract
export const useAgreementContract = () => {
    const AGREEMENT_ABI: Abi = ABI;
    const AGREEMENT_ADDRESS = contractAddress;

    return useContract({
        abi: AGREEMENT_ABI,
        address: AGREEMENT_ADDRESS,
    });
};

// CrimeRecord Contract
// export const useCrimeRecordContract = () => {
//     const CRIME_RECORD_ABI: Abi = [ /* Paste CrimeRecord contract ABI here */];
//     const CRIME_RECORD_ADDRESS = '0x...'; // Your CrimeRecord contract address

//     return useContract({
//         abi: CRIME_RECORD_ABI,
//         address: CRIME_RECORD_ADDRESS,
//     });
// };
// const useContractData = () => {
//     const { address: userAddress } = useAccount();

//     const {
//         isLoading: balanceIsLoading,
//         isError: balanceIsError,
//         error: balanceError,
//         data: balanceData,
//     } = useBalance({
//         address: userAddress,
//         watch: true,
//     });

//     const {
//         data: readData,
//         refetch: refetchReadData,
//         isError: readIsError,
//         isLoading: readIsLoading,
//         error: readError,
//     } = useReadContract({
//         functionName: "get_balance",
//         args: [],
//         abi: ABI as Abi,
//         address: contractAddress,
//         watch: true,
//         refetchInterval: 1000,
//     });

//     return {
//         balance: {
//             data: balanceData,
//             isLoading: balanceIsLoading,
//             isError: balanceIsError,
//             error: balanceError,
//         },
//         readContract: {
//             data: readData,
//             refetch: refetchReadData,
//             isError: readIsError,
//             isLoading: readIsLoading,
//             error: readError,
//         },
//     };
// };

// export default useContractData;