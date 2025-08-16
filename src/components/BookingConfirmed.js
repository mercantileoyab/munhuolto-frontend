import React from "react";
import { useTranslation } from "react-i18next";
import '../styles/style.css';
import { Typography } from "@mui/material";
import BookingCheck from "../images/booking_check.png";

export default function BookingConfirmed() {

    const { t } = useTranslation();


    return (
        <div className="booking-confirmed">
            <Typography variant="h4" className="booking-confirmed-header" sx={{ fontWeight: 'bold' }} color="primary" >
                {t("bookingConfirmation.title")}!
            </Typography>
            <img src={BookingCheck} alt="Booking Check" className="booking-confirmed-image" />
        </div>
    );
}