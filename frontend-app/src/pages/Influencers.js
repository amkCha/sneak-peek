// Library
import React from "react";
// Material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// Component 
import InfluencerCard from "../components/InfluencerCard"

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "10px",
  },
}));

export const Influencers = () => {
  const classes = useStyles();

  return (
    <>
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
      className={classes.grid}
    >
      <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      className={classes.grid}
      >
        <Grid item xs={3}>
        <InfluencerCard profilePic="/images/joconde_yeux.png"/>
        </Grid>
        <Grid item xs={3}>
        <InfluencerCard profilePic="/images/profile2.jpg"/>
        </Grid>
        <Grid item xs={3}>
        <InfluencerCard profilePic="/images/cryptokitty.png"/>
        </Grid>
      </Grid>

      <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      className={classes.grid}
      >
        <Grid item xs={3}>
        <InfluencerCard profilePic="/images/vendetta.jpg" />
        </Grid>
        <Grid item xs={3}>
        <InfluencerCard profilePic="/images/sunglasses.jpg"/>
        </Grid>
        <Grid item xs={3}>
        <InfluencerCard profilePic="/images/megaman.png"/>
        </Grid>
      </Grid>

    </Grid>
    </>
  );
};

Influencers.propTypes = {};

export default Influencers;
