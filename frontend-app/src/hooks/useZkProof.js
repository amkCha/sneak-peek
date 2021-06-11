import React, { useEffect } from 'react';
import { useMutation } from "react-query";
// Constants
import { buildProof } from "../api";

export const useZkProof = () => {

  const [proof, setProof] = React.useState('');
  const [openDialog, setDialogOpen] = React.useState(false);

  const {
    mutate: postBuildProof,
    isLoading,
    isSuccess,
    data
  } = useMutation(
    buildProof,
    {
      onSuccess: (data) => {
        setProof(data.proof);
        console.log("Success on getting the proof")
      },
      onError: () => {
        console.log("No so much success on getting the proof")
      }
    }
  );

  // const {
  //   mutate: sign
  // } = useMutation(
  //   signMetamask,
  //   {
  //     onSuccess: () => {
  //       console.log("Success on signing")
  //     },
  //     onError: () => {
  //       console.log("No so much success on signing")
  //     }
  //   }
  // );

  useEffect(() => {
    if (isSuccess && data) {
      setDialogOpen(true);
    }
  }, [isSuccess, data]
  )
  const postAndSetProof = async (tokenAddress) =>  {
    await postBuildProof(tokenAddress);
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
