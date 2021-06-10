import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { makeStyles } from '@material-ui/core/styles';
import MMLogo from '../static/metamask-logo.svg';
import { injected } from '../connectors';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { shortenAddress } from '../utils/shortenAddress';

const MetamaskLogo = styled.img.attrs({
  src: MMLogo,
})`
  height: 40px;
`;

const useStyles = makeStyles((theme) => ({
    metamaskButton: {
      fontSize: 13, 
      color: "#95e664"
    },
  }));


const ConnectWalletButton = () => {
  const classes = useStyles();
  const web3React = useWeb3React();
  const { activate, active, account } = useWeb3React();
    console.log(web3React)
  if (!active) {
    return  (
        <Button onClick={() => activate(injected)} >
           <MetamaskLogo />
        </Button>
    );
  } else {
    return (
        <Button disabled>
            <Typography className={classes.metamaskButton} variant="body2" color="textSecondary" component="p">
              {`${shortenAddress(account)}`}
            </Typography>
        </Button>
    );
  }
};

export default ConnectWalletButton;