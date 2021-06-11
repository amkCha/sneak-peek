// Library
import React from "react";
import { useWeb3React } from '@web3-react/core';
// Material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// Component 
import LogoAppBar from "../components/LogoAppBar"
import InfluencerCard from "../components/InfluencerCard"
import GenerateProof from "../components/GenerateProof"
import { AddressToUsername } from "../data/translationUserAdd"
import { usernameToPic } from "../data/translationPic"

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "30px",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  influencerTypo: {
    color: "#ffffff"
  }
}));

export const ProofVerification = () => {
  const classes = useStyles();
  const { account } = useWeb3React();

  const userName = AddressToUsername[account];

  return (
    <>
    <LogoAppBar isWalletButton={true}/>
    </>
    );
  };
  
  ProofVerification.propTypes = {};
  
  export default ProofVerification;