import React from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Influencers from "./pages/Influencers";
import PayPerView from "./pages/PayPerView";
import logo from './logo.svg';

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
        <img src={logo} alt="logo" className={classes.logo} onClick={() => {redirectToInfluencers()}}/>
        <img src={"/images/eyesbnw.svg"} alt="logo" className={classes.logo} onClick={()=>{console.log("test")}} />
      </Route>
      <Route exact path={"/traders-influencers"} component={Influencers} />
      <Route exact path={"/pay-per-view"} component={PayPerView} />
    </Switch>
  );
};

export default AppRouter;
