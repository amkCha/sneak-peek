import axios from "axios";

// To be completed
const API_URL = "xxx";

export async function buildProof(tokenAddress) {

  console.log("I'm building");
  // Add body with tokenAddress and walletAddress to the call api
  const response = await axios.post(
    `https://sneek-peak-back.orchestrate.ops.consensys.net/build-proof`,
    {
      tokenAddress: "Ox", 
      walletAddress: "Ox"
    }
  );
  return response.proof;
}