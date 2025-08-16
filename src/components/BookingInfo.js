import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import '../styles/style.css';

export default function BookingInfo({ reservation }) {

    const { workshop } = reservation || {};
    const { t } = useTranslation();

    if (!reservation) {
        return <></>;
    }

    return (
        <div className="booking-info">
            <Typography variant="h5">
                {t("bookingInfo.title")}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {t("bookingInfo.arrival.title")}
            </Typography>
            <Typography variant="body2">
                {t("bookingInfo.arrival.info")}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {t("bookingInfo.arrival.open")}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {t("bookingInfo.parking.title")}
            </Typography>
            <Typography variant="body2">
                {t("bookingInfo.parking.info")}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {t("bookingInfo.parking.note")}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {t("bookingInfo.checkIn.title")}
            </Typography>
            <Typography variant="body2">
                {t("bookingInfo.checkIn.info")}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {t("bookingInfo.checkIn.note")}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {t("bookingInfo.confirmationAndContact.title")}
            </Typography>
            <Typography variant="body2">
                {t("bookingInfo.confirmationAndContact.info")}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {t("bookingInfo.confirmationAndContact.contactInfo")}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {t("bookingInfo.payment.title")}
            </Typography>
            <Typography variant="body2">
                {t("bookingInfo.payment.info")}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {t("bookingInfo.payment.note")}
            </Typography>

            <Typography variant="body2" sx={{ marginTop: 2 }}>
                {t("bookingInfo.extra")}
            </Typography>
        </div>
    );
}