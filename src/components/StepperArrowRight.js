import { Grid } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function StepperArrowRight() {

    

    return (
        <Grid item size={{xs: 1, sm: 1, md: 1, lg: 1}} className="custom-stepper">
            <ArrowForwardIosIcon
                disabled={true} // Disable interaction
            />
        </Grid>
    )
}