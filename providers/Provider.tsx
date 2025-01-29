"use client";
import { ReactNode } from "react";

import { sepolia } from "@starknet-react/chains";
import {
    StarknetConfig,
    argent,
    braavos,
    useInjectedConnectors,
    jsonRpcProvider,
    voyager,
} from "@starknet-react/core";

export function Providers({ children }: { children: ReactNode }) {
    const { connectors } = useInjectedConnectors({
        // Show these connectors if the user has no connector installed.
        recommended: [argent(), braavos()],
        // Hide recommended connectors if the user has any connector installed.
        includeRecommended: "onlyIfNoConnectors",
        // Randomize the order of the connectors.
        order: "random",
    });
    return (
        <StarknetConfig
            chains={[sepolia]}
            provider={jsonRpcProvider({
                rpc: (chain) => ({
                    nodeUrl: 
                "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/ssUmUcHKo3lg3r17u83EdZXtn_aFPpKY"
             }) })}
            connectors={connectors}
            explorer={voyager}
        >
            {children}
        </StarknetConfig>
    );
}