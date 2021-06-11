import React from 'react';
import { useMutation } from "react-query";
// Constants
import { verifyProof } from "../api";

export const useVerify = () => {

  const [response, setResponse] = React.useState('');

  const {
    mutate: postVerifyProof,
    isLoading
  } = useMutation(
    verifyProof,
    {
      onSuccess: () => {
        console.log("Success on verifying the proof")
      },
      onError: () => {
        console.log("No so much success on verifying the proof")
      }
    }
  );

  const postAndVerifyProof = async (proof) =>  {
    const verified = postVerifyProof(proof);
    setResponse(verified);
  }

  return {
    isLoading,
    postAndVerifyProof,
    response
  };
};
