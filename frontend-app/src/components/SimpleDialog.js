import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  proof: {
    margin: "20px",
    alignItems: "center"
  },
  dialogTitle: {
    backgroundColor: "#95e664",
    color: "#282c34"
  }
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    setCopied(false);
    onClose(selectedValue);
  };

  const [copied, setCopied] = React.useState(false);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Here is your proof</DialogTitle>
      <Typography variant="subtitle1" component="p" className={classes.proof}>
        {selectedValue}
      </Typography>
      <CopyToClipboard
        text={selectedValue}
        onCopy={() => setCopied(true)}>
        <button>Copy your proof</button>
      </CopyToClipboard>
      {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};