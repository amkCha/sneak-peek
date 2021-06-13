// Library
import React, { useEffect } from "react";
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
import Icon from '@material-ui/core/Icon';
// Component 
import LogoAppBar from "../components/LogoAppBar"

import { useVerify } from "../hooks/useVerify";

const useStyles = makeStyles((theme) => ({
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
    color: "#95e664"
  },
  errorIcon: {
    color: "red",
    margin: "15px"
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
  },
  logoCheck: {
    height: "32px",
    margin: "15px"
  }
}));

export const ProofVerification = ({match}) => {

  let { proof } = match.params;
  const classes = useStyles();

  const decodedProof = decodeURIComponent(proof) 

  const {
    isLoading,
    postAndVerifyProof,
    response
  } = useVerify();

  const isBoolean = (bool) => typeof(bool) == "boolean";

  // useEffect ( () => {
  //   debugger;
  //   if (!isBoolean(response)) {
  //     postAndVerifyProof(decodedProof);
  //   }
  // }, [response])

  return (
    <>
    <LogoAppBar isWalletButton={true}/>
    <Grid
      container
      direction="column"
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
          <img src={"/images/snpcheck.png"} alt="logo" className={classes.logoCheck} />
          <Typography className={classes.influencerTypo}> 
            The influencer 0x28 has been holding LINK for more than 6 months
          </Typography>
          </>
        )}
        { isBoolean(response)  && !response  && (
          <>
          <CancelIcon className={classes.errorIcon} style={{ fontSize: 55 }} />
          <Typography className={classes.influencerTypoError}> 
            The proof of influencer 0x28 is not valid
          </Typography>
          </>
        )}
    </Grid>
    </>
    );
  };
  
  ProofVerification.propTypes = {};
  
  export default ProofVerification;