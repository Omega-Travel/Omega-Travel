import * as React from "react";
import styled from "styled-components";
import { Typography, TextField, Button } from "@material-ui/core";
import { Formik } from "formik";
import Rating from '@material-ui/lab/Rating';
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import {
    Switch,
    Link,
    useParams
} from "react-router-dom";

const REGISTER_REVIEW = gql`
  mutation registerReview($input: RegisterReview!) {
    registerReview(input: $input) {      
        userId,
        placeId,
        rating,
        description
    }
  }
`;

const AddReview = () => {
    const userId = localStorage.getItem('userId');
    let { placeId } = useParams();
    const [review] = useMutation(REGISTER_REVIEW);
    let history = useHistory();

    return (
        <Formik
            initialValues={{ placeId: placeId, rating: 0, description: '', userId: userId }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    values.rating = Number(values.rating);
                    review({
                        variables: {
                            input: values
                        },
                    }).then((result) => {
                        window.history.back();
                    });
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
            }) => (
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Typography variant="h5">
                            My Review
                        </Typography>
                        <FormContainer>
                            <br />
                            <TextField
                                multiline
                                value={values.description}
                                id="description"
                                rows={4}
                                variant="outlined"
                                onChange={handleChange("description")}
                            />
                            <br />
                            <Rating value={values.rating} id="rating" name="size-medium" onChange={handleChange("rating")}/>
                            <br />
                            <Button
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Send Review
                            </Button>
                        </FormContainer>
                    </form>
                )}
        </Formik>
    );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default AddReview;
