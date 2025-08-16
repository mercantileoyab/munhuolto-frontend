import React, { useEffect, useState } from "react";
import WorkshopCalendar from "./WorkshopCalendar";
import InfoRegisterPlate from "./InfoRegisterPlate";
import RegisterPlate from "./RegisterPlate";
import { useSelector } from "react-redux";
import Car from "./Car";
import { defaultButtonStyle } from "../styles/buttonStyles";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import BaseServices from "./BaseServices";
import InfoForNext from "./InfoForNext";

export default function BookStep1() {

    const draft = useSelector((state) => state.reservation.draft);
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    // const [ allSelected, setAllSelected ] = useState(false);

    // useEffect(() => {
    //     if (draft.car && draft.date && draft.services && draft.services.length > 0) {
    //         setAllSelected(true);
    //     } else {
    //         setAllSelected(false);
    //     }
    // }, [draft]);

    const toNextStep = () => {
        const params = new URLSearchParams(location.search);
        params.set('step', '2');
        navigate(`/workshops/${draft.workshop.id}?${params.toString()}`);
    };

    const allSelected = draft.car && draft.date && draft.services && draft.services.length > 0;

    return (
        <div className='workshop-page_steps'>
            <WorkshopCalendar />
            <InfoRegisterPlate />
            <RegisterPlate />
            <BaseServices category="maintenance" />
            {/* { draft.car && <Car /> } */}
            {!allSelected && <InfoForNext />}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className="infoButton"
                    variant="contained" 
                    sx={{...defaultButtonStyle, marginTop: '20px'}} 
                    fullWidth
                    disabled={!allSelected}
                    onClick={toNextStep}
                >
                    {t('actions.next')}
                </Button>
            </div>
        </div>
    );
}