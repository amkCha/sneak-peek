import axios from "axios";

// To be completed
const API_URL = "xxx";

export async function buildProof(tokenAddress) {
  await setTimeout(() => { console.log("buildProof" + tokenAddress) }, 2000);
  // const response = await axios.get(
  //   `${API_URL}/build-proof/${tokenAddress}`
  // );
  // return response.data;
  console.log('Im building');
  return `${tokenAddress} prooof`;
}