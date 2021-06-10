import React from 'react';
import PropTypes from "prop-types";
// Material ui
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { useZkProof } from "../hooks/useZkProof"

import { tokenAddresses } from "../data/translationToken"
import { usernameToPic } from "../data/translationPic"
import SimpleDialog from "../components/SimpleDialog"
import { useWeb3React } from '@web3-react/core';
import MMLogo from '../static/metamask-logo.svg';
import { injected } from '../connectors';

const MetamaskLogo = styled.img.attrs({
  src: MMLogo,
})`
  height: 40px;
`;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      color: "#282c34",
      fontSize: "17px",
      backgroundColor: theme.palette.background.paper
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  question: {
    width: "450px",
    margin: theme.spacing(1)
  },
  token: {
    width: "150px",
    margin: theme.spacing(1)
  },
  divQuestion: {
    flexGrow: 1
  },
  inputLabel: {
    fontSize: "30px",
    color: "#3f51b5",
  },
  button: {
    margin: theme.spacing(1),
    marginTop: "32px",
    marginLeft: "32px",
    backgroundColor: "#95e664",
    color: "#282c34",
    "&:hover": {
      backgroundColor: '#282c34',
      color: '#95e664',
      borderColor: '#95e664',
  }},
  avatar: {
    marginTop: "28px",
    marginRight: "20px",
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

export default function QuestionToggle({userName}) {
  const classes = useStyles();
  const [question, setQuestion] = React.useState('');
  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value);
  };
  const [token, setToken] = React.useState('');
  const handleChangeToken = (event) => {
    setToken(event.target.value);
  };

  const {
    isLoading,
    postAndSetProof,
    proof,
    openDialog,
    handleDialogClose
  } = useZkProof();

  const ButtonContent = (
    <div>
      {isLoading && <CircularProgress size="1.5rem" />}
      {!isLoading && "Check with Zk proof"}
    </div>
  );

  const { activate, active } = useWeb3React();
  console.log(active);
  return (
    <div className={classes.divQuestion}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Avatar alt="user" src={usernameToPic[userName]} className={classes.avatar} />
        <FormControl className={classes.question}>
          <InputLabel id="demo-customized-select-label-question" className={classes.inputLabel}>Select a question</InputLabel>
          <Select
            labelId="demo-customized-select-label-question"
            id="demo-customized-select-question"
            value={question}
            onChange={handleChangeQuestion}
            input={<BootstrapInput />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>{`Has influencer ${userName} been holding this token more than selling it for the past 6 months ?`}</MenuItem>
            <MenuItem value={2}>{`Does influencer ${userName} has a diversified wallet ?`}</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.token}>
          <InputLabel id="demo-customized-select-label-token" className={classes.inputLabel}>Token</InputLabel>
          <Select
            labelId="demo-customized-select-label-token"
            id="demo-customized-select-token"
            value={token}
            onChange={handleChangeToken}
            input={<BootstrapInput />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"COMP"}>COMP</MenuItem>
            <MenuItem value={"LINK"}>LINK</MenuItem>
            <MenuItem value={"DODO"}>DODO</MenuItem>
          </Select>
        </FormControl>
        { !active && (
          <Button onClick={() => activate(injected)} >
            <MetamaskLogo />
          </Button>
        ) 
        }
        { active && (
          <Button 
            variant="outlined"
            className={classes.button}
            size="large"
            onClick={() => postAndSetProof(tokenAddresses[token])}>
              {ButtonContent}
          </Button>
        )}
        <SimpleDialog selectedValue={proof} open={openDialog} onClose={handleDialogClose} />
      </Grid>
    </div>
  );
}


QuestionToggle.propTypes = {
  userName: PropTypes.string.isRequired
};

