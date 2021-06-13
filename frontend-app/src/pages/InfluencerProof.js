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
import GenerateProof from "../components/GenerateProof"
import { AddressToUsername } from "../data/translationUserAdd"
import { usernameToPic } from "../data/translationPic"
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  typoDescriptionProof: {
    borderRadius: "10px",
    marginTop: "32px",
    width: "250px",
    frontSize: "12px",
    backgroundColor: '#282c34',
    color: '#95e664',
    border: '#95e664',
  },
  tooltipProof: {
    fontSize: "14px"
  }
}));

export const InfluencerProof = () => {
  const classes = useStyles();
  const { account } = useWeb3React();

  const userName = AddressToUsername[account];

  return (
    <>
    <LogoAppBar isWalletButton={true}/>
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      { account && (<Avatar alt="user" src={usernameToPic[userName]} className={classes.avatar} />)}
      { account && ( 
          <Tooltip title={"i.e, you have not sold more than half of the token you have bought"} aria-label="add" placement="right-start" className={classes.tooltipProof}>
          <Typography className={classes.typoDescriptionProof}>
            Select a token and generate the proof that you have been holding more than selling this token for the past 6 months
          </Typography>
          </Tooltip>
      )}
      { account && ( <GenerateProof />)}
    </Grid>
    </>
    );
  };
  
  InfluencerProof.propTypes = {};
  
  export default InfluencerProof;