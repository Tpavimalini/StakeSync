import { PKPClient } from "@lit-protocol/pkp-client";
import { AgentWallet } from "@lit-protocol/agent-wallet";
import litClient from "../config/litConfig.js";

// Function to initialize PKP & Agent Wallet
export const initAgentWallet = async () => {
    await litClient.connect();

    const pkpClient = new PKPClient({ litNodeClient: litClient });

    // Mint a new PKP
    const { tokenId, publicKey } = await pkpClient.mint();
    console.log("🎯 PKP Token ID:", tokenId);
    console.log("🔑 Public Key:", publicKey);

    // Initialize Agent Wallet
    const agentWallet = new AgentWallet({
        litNodeClient: litClient,
        pkpPublicKey: publicKey,
    });

    await agentWallet.connect();
    console.log("🚀 Agent Wallet Ready!");

    return { agentWallet, tokenId, publicKey };
};
