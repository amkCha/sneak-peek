import React from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
// Material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Influencers from "./pages/Influencers";
import PayPerView from "./pages/PayPerView";
import InfluencerProof from "./pages/InfluencerProof";
import ProofVerification from "./pages/ProofVerification";

import { injected } from './connectors';

const useStyles = makeStyles(() => ({
  logo: {
    width: "800px",
    height: "128px"
  },
  buttonInfluencer: {
    width: '310px',
    fontSize: "20px",
    backgroundColor: "#95e664",
    color: "#000000",
    "&:hover": {
      backgroundColor: '#282c34',
      color: '#95e664',
      borderColor: '#95e664',
  }},
  buttonSneakPeeker: {
    width: '310px',
    fontSize: "20px",
    backgroundColor: "#ffffff",
    color: "#000000",
    borderColor: "#000000",
    "&:hover": {
      backgroundColor: '#282c34',
      color: '#95e664',
      borderColor: '#95e664',
  }},
  gridButton: {
    width: "800px"
  }
}));

export const AppRouter = () => {
  const classes = useStyles();
  let history = useHistory();

  const { activate, active, account } = useWeb3React();

  function redirectToInfluencers() {
    history.push("/traders-influencers");
  };
  function connectToMetamaskAndRedirectToInfluencerProof() {
    activate(injected);
    history.push("/influencer-proof");
  };

  return (
    <Switch>
      <Route exact path={"/"}>
        <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        >
            <img src={"/images/logo.svg"} alt="logo" className={classes.logo} onClick={() => {redirectToInfluencers()}}/>
            <img src={"/images/eyesbnw.svg"} alt="logo" className={classes.logo} onClick={()=>{console.log("test")}} />
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              className={classes.gridButton}
            >
            <Button 
              variant="outlined"
              className={classes.buttonInfluencer}
              size="large"
              onClick={() => {connectToMetamaskAndRedirectToInfluencerProof()}}>
                Trader-Influencer
            </Button>
            <Button 
              variant="outlined"
              className={classes.buttonSneakPeeker}
              size="large"
              onClick={() => {redirectToInfluencers()}}>
                Sneak-peeker
            </Button>
          </Grid>
        </Grid>
      </Route>
      <Route exact path={"/traders-influencers"} component={Influencers} />
      <Route exact path={"/influencer-proof"} component={InfluencerProof} />
      <Route exact path={"/pay-per-view/:userName"} component={PayPerView} />
      <Route exact path={"/verify/:proof"} component={ProofVerification} />
    </Switch>
  );
};

export default AppRouter;
