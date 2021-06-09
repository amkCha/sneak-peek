import React from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
// Material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Influencers from "./pages/Influencers";
import PayPerView from "./pages/PayPerView";

const useStyles = makeStyles(() => ({
  logo: {
    width: "800px",
    height: "128px"
  }
}));

export const AppRouter = () => {
  const classes = useStyles();
  let history = useHistory();

  function redirectToInfluencers() {
    history.push("/traders-influencers");
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
        </Grid>
      </Route>
      <Route exact path={"/traders-influencers"} component={Influencers} />
      <Route exact path={"/pay-per-view/:userName"} component={PayPerView} />
    </Switch>
  );
};

export default AppRouter;
