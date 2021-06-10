import axios from "axios";

// To be completed
const API_URL = "xxx";

export async function buildProof(tokenAddress) {

  // Add body with tokenAddress and walletAddress to the call api
  // const response = await axios.get(
  //   `${API_URL}/build-proof/`
  // );
  // return response.data;
  console.log('Im building');
  return Promise.resolve({
    data: [
      {
        proof: "ima prooof"
      }
    ]
  });
}