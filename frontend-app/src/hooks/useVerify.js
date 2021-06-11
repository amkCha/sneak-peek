import React from 'react';
import { useMutation } from "react-query";
// Constants
import { verifyProof } from "../api";

export const useVerify = () => {

  const [response, setResponse] = React.useState('');

  const {
    mutate: postVerifyProof,
    isLoading,
    data
  } = useMutation(
    verifyProof,
    {
      onSuccess: (data) => {
        setResponse(data.verify);
        console.log("Success on verifying the proof")
      },
      onError: () => {
        console.log("No so much success on verifying the proof")
      }
    }
  );

  const postAndVerifyProof = async (proof) =>  {
    await postVerifyProof(proof);
  }

  return {
    isLoading,
    postAndVerifyProof,
    response
  };
};
