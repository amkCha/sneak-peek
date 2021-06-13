import React, { useEffect } from 'react';
import { useMutation } from "react-query";
import { BitlyClient } from 'bitly';
// Constants
import { buildProof } from "../api";

export const useZkProof = () => {

  const [proofUrl, setProofUrl] = React.useState('');
  const [openDialog, setDialogOpen] = React.useState(false);

  const {
    mutate: postBuildProof,
    isLoading,
    isSuccess,
    data
  } = useMutation(
      buildProof,
      {
        onSuccess: async (data) => {
          const encodedProof = encodeURIComponent(data.proof);
          const bitly = new BitlyClient("4db22a691e6db82e7fdf3034cbd3aa6ec5b75c52", {});
          let bitlyResponse;
          try {
            bitlyResponse = await bitly.shorten(`https://sneak-peek.ops.consensys.net/verify/${encodedProof}`);
            console.log(bitlyResponse.link)
          } catch (e) {
            console.log(e)
          }
          setProofUrl(bitlyResponse.link);
          console.log("Success on getting the proof")
        },
        onError: () => {
          console.log("No so much success on getting the proof")
        }
      }
  );

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
    proofUrl,
    openDialog,
    handleDialogClose
  };
};
