import React from 'react';
import { useMutation } from "react-query";
// Constants
import { buildProof } from "../api";
import { tokenAddresses } from "../data/translationToken";

export const useZkProof = () => {

  const [proof, setProof] = React.useState('');
  const [openDialog, setDialogOpen] = React.useState(false);

  const mutation = useMutation((tokenAddress) => buildProof(tokenAddress))
  
  // const {
  //   mutate: postBuildProof,
  //   isLoading
  // } = useMutation(
  //   buildProof,
  //   {
  //     onSuccess: () => {
  //       console.log("Success on getting the proof")
  //     },
  //     onError: () => {
  //       console.log("No so much success on getting the proof")
  //     }
  //   }
  // );

  const postAndSetProof = async (tokenAddress) =>  {
    const proofResponse = mutation.mutate(tokenAddress);
    console.log("proofResponse" + proofResponse.data[0].proof)
    setProof(proofResponse.data[0].proof);
    console.log("setDialogOpen to true")
    setDialogOpen(true);
  }
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return {
    isLoading: mutation.isLoading,
    postAndSetProof: mutation.mutate,
    proof,
    openDialog,
    handleDialogClose
  };
};
