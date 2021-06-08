import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function InfluencerCard({
  profilePic
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function redirectToPayPerView() {
    history.push("/pay-per-view");
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            0x
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
              <MoreVertIcon />
          </IconButton>
        }
        title="0x_b1"
        subheader="Member since january, 2021"
      />
      <CardMedia
        className={classes.media}
        image={profilePic}
        title="0x_b1 profile pic"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Trading for more than a year, I like to find special tokens that have yet to hit it big on the coin market. 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={() => {redirectToPayPerView()}}> 
          Ask a question on 0x_b1 wallet
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More info:</Typography>
          <Typography paragraph>
            Here is a little more info on my trading views
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

InfluencerCard.propTypes = {
  profilePic: PropTypes.string.isRequired
};
