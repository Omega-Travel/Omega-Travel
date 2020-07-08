import * as React from "react";
import { Container, Typography } from "@material-ui/core";
import podium from "../assets/podium.png";

const Challenge = () => {
    return (
        <div>
            <Container maxWidth="md" style={{ textAlign: 'center' }}>
                <br/>
                 <Typography variant="h3">
                    Monthly Challenge
                 </Typography>
                 <br/>
                 <Typography variant="h5">
                    The top 3 of travelers who make the most reviews until the end of the month will receive a flight ticket with a value of up to U$D 1.000 for the destination they want!
                 </Typography>
                 <br/>
                 <img src={podium} alt="podium image" />
                 <br/>
            </Container>
        </div>
    );
};

export default Challenge;
