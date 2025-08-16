import React, { useEffect } from "react";
import HeaderInfo from "../components/HeaderInfo";
import Map from "../components/Map";
import Workshops from "../components/Workshops";
import { useDispatch, useSelector } from "react-redux";
import { initDraft } from "../store/reservationSlice"; // <-- Import initDraft
import { useWindowSize } from "../hooks/useWindowSize";
import { Grid } from "@mui/material";
import styles from "../styles/style.css";
// import Seo from "../components/Seo";


export default function MainPage() {

    const dispatch = useDispatch();
    const draft = useSelector((state) => state.reservation.draft);
    const { isDesktop } = useWindowSize();

    useEffect(() => {
        dispatch(initDraft()); // <-- Use the slice's initDraft action
    }, [dispatch]);
    
    // Removed old initReservation

    return (
        <>
            <HeaderInfo />

            {isDesktop ? (
                <Grid container spacing={1} className="workhop-grid-desktop" >
                    <Grid item
                        size={{xs: 12, sm: 12, md: 6, lg: 4}}
                        sx={{padding: 0}}
                    >
                        <Workshops />
                    </Grid>
                    <Grid item
                        size={{xs: 12, sm: 12, md: 6, lg: 8}}
                        sx={{padding: 0}}
                    >
                        <Map />
                    </Grid>
                </Grid>
            ) : (
                <>
                    <Map />
                    <Workshops />
                </>
            )}

            {/* <Seo /> */}
        </>
    )
}