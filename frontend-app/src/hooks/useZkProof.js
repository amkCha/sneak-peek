import React from 'react';
import { useMutation } from "react-query";
// Constants
import { buildProof } from "../api";

export const useZkProof = () => {

  const [proof, setProof] = React.useState('');
  const [openDialog, setDialogOpen] = React.useState(false);

  // const mutation = useMutation((tokenAddress) => buildProof(tokenAddress))
  // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  // const headers = {
  //   "Content-Type" : "application/x-www-form-urlencoded",
  //   "Access-Control-Allow-Origin": "*"
  // };

  // const mutation = useMutation((tokenAddress) => axios.post(
  //   "https://sneek-peak-back.orchestrate.ops.consensys.net/build-proof",
  //   {
  //     "tokenAddress": "Ox", 
  //     "walletAddress": "Ox"
  //   },
  //   { 
  //     "headers": {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //     },
  //   }
  // ));
  
  const {
    mutate: postBuildProof,
    isLoading
  } = useMutation(
    buildProof,
    {
      onSuccess: () => {
        console.log("Success on getting the proof")
      },
      onError: () => {
        console.log("No so much success on getting the proof")
      }
    }
  );

  const postAndSetProof = async (tokenAddress) =>  {
    postBuildProof(tokenAddress);
    const proofResponse = "Imaaaproooof";
    setProof(proofResponse);
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return {
    isLoading,
    postAndSetProof,
    proof,
    openDialog,
    handleDialogClose
  };
};
