import React from 'react';
import { useMutation } from "react-query";
// Constants
import { buildProof } from "../api";
import { tokenAddresses } from "../data/translationToken";

export const useZkProof = () => {

  const [proof, setProof] = React.useState('');
  const [openDialog, setDialogOpen] = React.useState(false);

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
    console.log("proofResponse")
    // const proofResponse = postBuildProof(tokenAddress);
    const proofResponse = "Ima prooooof"
    console.log("proofResponse" + proofResponse)
    setProof(proofResponse);
    console.log("setDialogOpen to true")
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
