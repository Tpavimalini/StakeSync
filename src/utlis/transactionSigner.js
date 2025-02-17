import { ethers } from "ethers";
import { initAgentWallet } from "./agentWallet.js";

export const signTransaction = async (to, amount) => {
    const { agentWallet } = await initAgentWallet();

    const transaction = {
        to: to,
        value: ethers.utils.parseEther(amount),
        gasLimit: 21000,
    };

    const signedTx = await agentWallet.sign(transaction);
    console.log("📜 Signed Transaction:", signedTx);

    return signedTx;
};
