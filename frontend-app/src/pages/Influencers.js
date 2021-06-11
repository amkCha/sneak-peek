// Library
import React, { useEffect, useState } from "react";
import Lottie from 'react-lottie';
// Material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// Component 
import LogoAppBar from "../components/LogoAppBar"
import InfluencerCard from "../components/InfluencerCard"
// Cat annimation
import animationData from "../static/cat-lottie"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, 
    alignItems: "baseline"
  },
  grid: {
    margin: "30px",
  },
}));

export const Influencers = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let timeout = setTimeout(() => setLoading(false), 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className={classes.root}>
      <LogoAppBar isWalletButton={true}/>
      {loading && <Lottie
        options={defaultOptions}
        height={400}
        width={400}
      />}
      {!loading && <Grid
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
          <InfluencerCard profilePic="/images/joconde_yeux.png" userName="0x_b1" profileDescription="I see the trends before they become one."/>
          </Grid>
          <Grid item xs={3}>
          <InfluencerCard profilePic="/images/profile2.jpg" userName="offTheChart" profileDescription="Choices based on data and nothing else."/>
          </Grid>
          <Grid item xs={3}>
          <InfluencerCard profilePic="/images/cryptokitty.png" userName="CrytoKit" profileDescription="Select tokens before they hit it big on the market."/>
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
          <InfluencerCard profilePic="/images/vendetta.jpg" userName="unmasked" profileDescription="This is the first time I reveal part of my strategy."/>
        </Grid>
        <Grid item xs={3}>
          <InfluencerCard profilePic="/images/sunglasses.jpg" userName="Shine" profileDescription="Unique views to be seriously considered."/>
        </Grid>
        <Grid item xs={3}>
          <InfluencerCard profilePic="/images/megaman.png" userName="MegaMan" profileDescription="I smash the market sharp ratio."/>
        </Grid>
      </Grid>
      </Grid>
      }
    </div>
  );
};

Influencers.propTypes = {};

export default Influencers;
