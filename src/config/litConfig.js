import { LitNodeClient } from "@lit-protocol/lit-node-client";

const litClient = new LitNodeClient({
    litNetwork: "serrano", // Use 'cayenne' for mainnet when ready
});
 
export const connectLit = async () => {
    await litClient.connect();
    console.log("✅ Lit Protocol Connected");
};

export default litClient;
