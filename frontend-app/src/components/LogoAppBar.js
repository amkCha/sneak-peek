import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, 
    alignItems: "baseline"
  },
  bar: {
    background: theme.palette.dark50
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: "48px"
  }
}));

export default function LogoAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={"/images/logo.svg"} alt="logo" className={classes.logo}/>
          <img src={"/images/eyesbnw.svg"} alt="logo" className={classes.logo} />
        </Toolbar>
      </AppBar>
    </div>
  );
}