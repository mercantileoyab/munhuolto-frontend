import { Paper, Typography } from "@mui/material";
import React from "react";
import '../styles/style.css';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { useTranslation } from "react-i18next";

export default function InfoForConfirmation() {

    const { t } = useTranslation();

    return (
        <Paper className="infoRegisterPlate"
            variant="outlined" 
            sx={{
                padding: '20px',
                backgroundColor: 'lightgrey',
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'row'
            }}
        >
            <InfoOutlineIcon sx={{ marginRight: '20px' }} />
            <Typography variant="p" component="div" >
                {t("infoForConfirmation.text")}
            </Typography>
        </Paper>
    )
}