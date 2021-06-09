import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
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
  margin: {
    margin: theme.spacing(1),
  },
  question: {
    width: "250px",
    margin: theme.spacing(1)
  },
  divQuestion: {
    flexGrow: 1
  },
  inputLabel: {
    fontSize: "30px"
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
  },
  }
}));

export default function QuestionToggle() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChangeToken = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={classes.divQuestion}>
      <FormControl className={classes.question}>
        <InputLabel id="demo-customized-select-label" className={classes.inputLabel}>Select a question</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChangeToken}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Has this trader-influencer been holding this token more than selling it for the past 6 months ? </MenuItem>
          <MenuItem value={20}>Does this trader-influencer has a diversified wallet ? </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label" className={classes.inputLabel}>Token</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChangeToken}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>MINA</MenuItem>
          <MenuItem value={20}>GITCOIN</MenuItem>
          <MenuItem value={30}>MATIC</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" className={classes.button} size="large">Check with Zk proof</Button>
    </div>
  );
}
