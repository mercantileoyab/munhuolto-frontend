import { Grid } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function StepperArrowLeft() {
    
    return (
        <Grid item size={{xs: 1, sm: 1, md: 1, lg: 1}} className="custom-stepper">
            <ArrowBackIosIcon />
        </Grid>
    )
}