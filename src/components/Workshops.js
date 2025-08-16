import React, { useContext, useEffect } from "react";
import locationContext from "../context/locationContext";
import { Grid } from "@mui/material";
import Workshop from "./Workshop";
import workshopContext from "../context/workshopContext";
import '../styles/style.css';
import Filter from "./Filter";
import { useWindowSize } from "../hooks/useWindowSize";

const helsinki = {
  lat: 60.1695,
  lng: 24.9354
};

export default function Workshops() {

    const { state: locationState } = useContext(locationContext);
    const { state: workshopState, setWorkshops } = useContext(workshopContext);

    const { isDesktop } = useWindowSize();

    useEffect(() => {
        // If no location, use Helsinki as default
        if (locationState.location) {
            getWorkshops(locationState.location);
        } else {
            getWorkshops(helsinki);
        }
    }, [locationState.location]);

    const getWorkshops = (loc) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/workshops/${loc.lat}/${loc.lng}`)
            .then((response) => response.json())
            .then((data) => {
                setWorkshops(data);
            })
            .catch((error) => {
                console.error("Error fetching workshops:", error);
            });
    };


    return (
        <div
            className="workshops-grid"
            style={
                isDesktop
                    ? {
                        maxHeight: "650px",
                        overflowY: "auto"
                    }
                    : {}
            }
        >
            { workshopState?.workshops && workshopState?.workshops.length > 0 && (<Filter />) }
            <Grid container spacing={1}>
                {
                    workshopState?.workshops && workshopState?.workshops.map((workshop, index) => (
                        <Workshop key={index} workshop={workshop} />
                    ))
                }
            </Grid>
        </div>
    );
}