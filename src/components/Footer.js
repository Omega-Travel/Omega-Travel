import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
} from "react-router-dom";


function Copyright() {
  const userId = localStorage.getItem('userId') != null;
  return (
    <div>
      {userId != '' ?
        <Link to="/" style={{ color: 'black' }} >
          <Typography variant="body2" color="textSecondary" align="center">Home</Typography>
        </Link>
        : ''
      }
      {
        userId != '' ?
          <Link to="/reviews" style={{ color: 'black' }} >
            <Typography variant="body2" color="textSecondary" align="center">Reviews</Typography>
          </Link>
          : ''
      }
      {
        userId != '' ?
          <Link to="/trips" style={{ color: 'black' }} >
            <Typography variant="body2" color="textSecondary" align="center">Trips</Typography>
          </Link>
          : ''
      }
      {
        userId != '' ?
          <Link to="/login" style={{ color: 'black' }} >
            <Typography variant="body2" color="textSecondary" align="center">Logout</Typography>
          </Link>
          : ''
      }
      <Typography variant="body2" color="black" align="center">
        {'Copyright © Omega Travel'}
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}