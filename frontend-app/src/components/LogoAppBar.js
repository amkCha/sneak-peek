import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
// Material ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import ConnectWalletButton from "./ConnectWalletButton"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, 
    alignItems: "baseline"
  },
  logo: {
    height: "48px"
  },
  gridLogo: {
    justify: "flex-start"
  },
  gridMetamask: {

  }
}));

export default function LogoAppBar({isWalletButton}) {
  const classes = useStyles();
  let history = useHistory();

  function redirectToHomePage() {
    history.push("/");
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <img src={"/images/logoneyesbnw.png"} alt="logo" className={classes.logo} onClick={() => redirectToHomePage()}/>
            { isWalletButton && (<ConnectWalletButton/>)}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

LogoAppBar.propTypes = {
  isWalletButton: PropTypes.bool.isRequired
};