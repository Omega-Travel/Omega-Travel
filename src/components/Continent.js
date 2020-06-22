import React from 'react';
import { Container, Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import styled from "styled-components";
import {
    Switch,
    Link,
    useRouteMatch,
} from "react-router-dom";

const GET_PLACES = gql`
    query PlacesByContinent($continentId: ID!) {
        placesByContinent(continentId: $continentId) {
            id,
            name,
            mainImageUrl
        }
    }
`;

const CustomCard = styled.div`
  object-fit: contain;
  display: inline-flex;
  text-align: center;
  img {
    text-align: -webkit-center;
    float: left;
    width: 100%;
  }
`;

const Continent = ({ continentId, name }) => {
    const { loading, error, data } = useQuery(GET_PLACES, { variables: { continentId } });

    if (loading) return (
        <Row className="justify-content-md-center">
            <br />
            <Spinner animation="border" />
            <br />
        </Row>
    )
    if (error) return (
        <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                {error.message}
            </p>
        </Alert>
    )
    return (
        <div>
            <Container maxWidth="md">
                <br />
                <Typography variant="h5">
                    {name}
                </Typography>
                <br />
                <Switch>
                    {data.placesByContinent.map(({ id, name }) => (
                        <div style={{ textAlign: "center" }} key={id}>
                            <Link to={"/place/" + id} style={{ color: '#FFF', textDecoration: 'none' }} >
                                <CustomCard style={{ padding: "2%" }}>
                                    <Card>
                                        <img src="data:image/jpeg;base64,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" alt="" />

                                        <Card.Body style={{ backgroundColor: "#1976d2" }} >
                                            <Card.Title>{name}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </CustomCard>
                            </Link>
                        </div>
                    ))}
                </Switch>
                <br />
                <Divider />
                <br />
            </Container>
        </div>
    );
}

export default Continent;