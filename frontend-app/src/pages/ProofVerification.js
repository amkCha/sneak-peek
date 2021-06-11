// Library
import React from "react";
import { useWeb3React } from '@web3-react/core';
import axios from "axios";
// Material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
// Component 
import LogoAppBar from "../components/LogoAppBar"
import { AddressToUsername } from "../data/translationUserAdd"

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
  influencerTypoError: {
    marginLeft: "20px",
    color: "red"
  },
  proofTypo: {
    padding: "10px 10px 10px 10px",
    margin: "20px",
    width: "750px",
    color: "#282c34",
    backgroundColor: "#95e664",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: '#282c34',
      color: '#95e664',
      borderColor: '#95e664',
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

  const decodedProof = decodeURIComponent(proof) 

  const {
    isLoading,
    postAndVerifyProof,
    response
  } = useVerify();

  console.log(proof);
  const isBoolean = (bool) => typeof(bool) == "boolean";

  return (
    <>
    <LogoAppBar isWalletButton={true}/>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
        { !isBoolean(response) && (
        <Tooltip title={decodedProof} aria-label="add">
        <Button className={classes.proofTypo} onClick={() => postAndVerifyProof(decodedProof) }> 
          Verify proof
        </Button>
        </Tooltip>
        )}
        { !isBoolean(response)  && (<> </>)}
        { isBoolean(response)  && response  && (
          <>
          <DoneOutlineIcon className={classes.doneIcon} />
          <Typography className={classes.influencerTypo}> 
            This zero knowledge proof has been verified
          </Typography>
          </>
        )}
        { isBoolean(response)  && !response  && (
          <>
          <CancelIcon className={classes.errorIcon} />
          <Typography className={classes.influencerTypoError}> 
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