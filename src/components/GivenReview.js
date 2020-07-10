import * as React from "react";
import Rating from '@material-ui/lab/Rating';
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import twitter from "../assets/twitter.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

const Review = ({ name, place, rating, description }) => {
    const localStorageUserId = localStorage.getItem('userId') != null;
    const classes = useStyles();
    var Upvote = require('react-upvote');
    return (
        <Container maxWidth="md">
            <Typography variant="h6">
                {name}
            </Typography>
            <div className={classes.root}>
                <Rating name="size-small" defaultValue={rating} size="small" readOnly/>
            </div>
            <Typography variant="body1">
                {description}
                <br />
            </Typography>
            <div>
                <a href={"https://twitter.com/intent/tweet/?text=" + name  + ' said: ' + place + ', ' + description + "."} target="_blank">
                    <img src={twitter} alt="twitter share icon" style={{ float: 'right', marginLeft: '10px', maxWidth: '30px' }} />
                </a>
            </div>
            <br />
        </Container>
    );
}

export default Review;