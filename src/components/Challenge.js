import * as React from "react";
import { Container, Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import podium from "../assets/podium.png";
import winner from "../assets/winner.png";

const Challenge = () => {
    const overallPrize = "U$D 1000";
    const monthlyPrize = "U$D 800";

    return (
        <div>
            <Container maxWidth="md" style={{ textAlign: 'center' }}>
                <br />
                <Typography variant="h3">
                    Monthly Challenge
                 </Typography>
                <br />
                <Typography variant="h5">
                    The top 3 of travelers who make the most reviews until the end of the month will receive a flight ticket with a value of up to {monthlyPrize} for the destination they want!
                 </Typography>
                <br />
                <img src={podium} alt="podium image" style={{ maxWidth: '200px' }} />
                <br />
                <br />
                <Divider />
                <br />
                <Typography variant="h3">
                    Overall Challenge
                 </Typography>
                <br />
                <Typography variant="h5">
                    The traveler who has done the most reviews will receive {overallPrize} at the end of each month!
                 </Typography>
                <br />
                <img src={winner} alt="overall winner image" style={{ maxWidth: '200px' }} />
                <br />
            </Container>
            <br />
        </div>
    );
};

export default Challenge;
