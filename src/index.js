import dotenv from "dotenv";
import { connectLit } from "./config/litConfig.js";
import { initAgentWallet } from "./utils/agentWallet.js";
import { signTransaction } from "./utils/transactionSigner.js";

dotenv.config();

const main = async () => {
    await connectLit();

    const { agentWallet } = await initAgentWallet();

    // Example: Execute a DeFi Action (staking)
    const stakeAction = {
        contractAddress: "0xYourSmartContract", // Replace with actual deployed contract
        functionName: "stakeTokens",
        args: [100], // Example stake amount
    };

    await agentWallet.execute(stakeAction);
    console.log("✅ Staking Action Executed!");

    // Example: Sign a transaction
    await signTransaction("0xReceiverAddress", "0.01");
};

main().catch(console.error);
