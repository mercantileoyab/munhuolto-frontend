import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { defaultButtonStyle } from "../styles/buttonStyles";

export default function CancelBookingButton({ reservationUuid }) {

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <div className="cancel-booking-button"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <Button
                variant="text"
                size="large"
                sx={{...defaultButtonStyle, color: "black", border: '1px solid grey'  }}
                onClick={() => setOpen(true)}
            >
                {t("actions.cancel")}
            </Button>
            <Dialog onClose={closeDialog} open={open}>
                <DialogTitle>{t("actions.cancel")}?</DialogTitle>
                <DialogActions>
                    <Button>Ei</Button>
                    <Button>Kyllä</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}