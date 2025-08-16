import { Paper, Typography } from "@mui/material";
import React from "react";
import '../styles/style.css';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function InfoForNext() {

    const { t, i18n } = useTranslation();
    const draft = useSelector((state) => state.reservation.draft);

    let infoText = t("infoRegisterPlate.infoRegisterPlateText");

    if (!draft.car && !draft.date) {
        infoText = t("infoForNext.noPlateOrDate");
    } else if (!draft.car) {
        infoText = t("infoForNext.noPlate");
    } else if (!draft.date) {
        infoText = t("infoForNext.noDate");
    } else if (!draft.services || draft.services.length === 0) {
        infoText = t("infoForNext.noSelectedServices");
    }

    return (
        <Paper className="infoForNext"
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
            <Typography variant="p" component="div">
                {infoText}
            </Typography>
        </Paper>
    )
}