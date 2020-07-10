import * as React from "react";
import { Container, Typography } from "@material-ui/core";
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { Alert } from '@material-ui/lab';
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import twitter from "../assets/twitter.jpg";
import {
    Switch,
    Link,
    useParams
} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

const GET_REVIEWS = gql`
    query reviewsByUser($userId: ID!) {
        reviewsByUser(userId: $userId) {
            id,
            placeId,
            rating,
            description,
            reviewPlace {
                id,
             	name,
                mainImageUrl
            }
        }
    }
`;

function countTotalReviews(data) {
    var count = 0;
    var reviews = data.data.reviewsByUser;
    reviews.forEach(function () {
        count += 1;
    });
    return count;
}

const Reviews = ({ }) => {
    const classes = useStyles();
    var userId = localStorage.getItem('userId');
    const { loading, error, data } = useQuery(GET_REVIEWS, { variables: { userId } });

    if (loading) return (
        <Row className="justify-content-md-center">
            <Spinner animation="border" />
        </Row>
    )
    if (error) return (
        <Alert severity="warning">Oh snap! You got an error!
            <p>{error.message}</p>
        </Alert>
    )

    return (
        <Container maxWidth="md">
            <br />
            <Typography variant="h4">
                My reviews
            </Typography>
            <br />
            <Typography variant="h5">
                Reviews made: {countTotalReviews({ data })}
            </Typography>
            <br />
            {data.reviewsByUser.map(({ reviewPlace, rating, description }) => (
                <Container maxWidth="md">
                    <Switch>
                        <div>
                            <div>
                                <ListGroup.Item action>
                                    <Link to={"/place/" + reviewPlace.id} style={{ color: 'black', textDecoration: 'none' }} >
                                        <div style={{ float: 'left', paddingRight: '20px' }}>
                                            <img src={reviewPlace.mainImageUrl} alt="main continent" style={{ maxWidth: '200px' }} />
                                        </div>
                                        <div >
                                            <Typography variant="h6">
                                                <div className={classes.root}>
                                                    <div>{reviewPlace.name} <Rating name="size-small" defaultValue={rating} size="small" readOnly /></div>
                                                </div>
                                            </Typography>
                                            <br />
                                            <div>
                                                <Typography variant="body1">
                                                    {description}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Link>
                                    <div>
                                        <a href={"https://twitter.com/intent/tweet/?text=" + reviewPlace.name + ', ' + description + "."} target="_blank">
                                            <img src={twitter} alt="twitter share icon" style={{ float: 'right', marginLeft: '10px', maxWidth: '50px' }} />
                                        </a>
                                    </div>
                                </ListGroup.Item>
                            </div>
                        </div>
                        <br />
                    </Switch>
                </Container>
            ))}
            <br />
        </Container>
    );
}

export default Reviews;