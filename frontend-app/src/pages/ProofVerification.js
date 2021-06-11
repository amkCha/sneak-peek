// Library
import React from "react";
import { useWeb3React } from '@web3-react/core';
import axios from "axios";
// Material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Button from '@material-ui/core/Button';
// Component 
import LogoAppBar from "../components/LogoAppBar"
import InfluencerCard from "../components/InfluencerCard"
import GenerateProof from "../components/GenerateProof"
import { AddressToUsername } from "../data/translationUserAdd"
import { usernameToPic } from "../data/translationPic"

import { useVerify } from "../hooks/useVerify";

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "200px",
    width: "200px"
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  influencerTypo: {
    marginLeft: "20px",
    color: "#95e664"
  },
  proofTypo: {
    padding: "10px 10px 10px 10px",
    margin: "20px",
    width: "750px",
    color: "#282c34",
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: '#ffffff',
      color: '#282c34',
      borderColor: '#282c34',
  }
  },
  doneIcon: {
    marginLeft: '20px',
    height: "800px",
    color: "#95e664"
  },
  errorIcon: {
    marginLeft: '20px',
    height: "800px",
    color: "red"
  },
  buttonProof: {
    width: "400px",
    backgroundColor: "#ffffff",
    color: "#282c34",
    "&:hover": {
      backgroundColor: '#ffffff',
      color: '#282c34',
      borderColor: '#282c34',
    }
  }
}));

export const ProofVerification = ({match}) => {

  let { proof } = match.params;
  const classes = useStyles();
  const { account } = useWeb3React();


  const userName = AddressToUsername[account];

  const {
    isLoading,
    postAndVerifyProof,
    response
  } = useVerify();

  console.log("proof");
  console.log(proof);
  console.log("response");
  console.log(response);

  return (
    <>
    <LogoAppBar isWalletButton={true}/>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Button className={classes.proofTypo} onClick={() => postAndVerifyProof(proof) }> 
        {proof}
      </Button>
      { response ==  undefined && (<> </>)}
        { response != undefined && response && (
        <>
        <DoneOutlineIcon className={classes.doneIcon} />
        <Typography className={classes.influencerTypo}> 
          This zero knowledge proof has been verified
        </Typography>
        </>
        )}
        { response != undefined &&  !response && (
          <>
          <DoneOutlineIcon className={classes.doneIcon} />
          <Typography className={classes.influencerTypo}> 
            This zero knowledge proof is erronous
          </Typography>
          </>
        )}
    </Grid>
    </>
    );
  };
  
  ProofVerification.propTypes = {};
  
  export default ProofVerification;