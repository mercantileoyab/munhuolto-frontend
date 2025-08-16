import { Button, Card, CardActions, CardContent, CardHeader, Grid, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import '../styles/style.css';
import { workshopCardStyle, workshopCardHeaderStyle } from "../styles/cardStyles";
import { chooseButtonStyle } from "../styles/buttonStyles";
import { useLocation, useNavigate } from "react-router-dom";
import locationContext from "../context/locationContext";
import Rating from "./Rating";
import { useTranslation } from "react-i18next";
import ElectricVehicles from "./workshop_extras/ElectricVehicles";
import VehicleListing from "./workshop_extras/VehicleListing";

export default function Workshop({ workshop }) {

    const { state: locationState } = useContext(locationContext);
    const { t } = useTranslation();

    const { isMobile } = useWindowSize();
    const navigate = useNavigate();
    const location = useLocation();

    const [ distance, setDistance ] = useState(null);
    const [ rating, setRating ] = useState(null)
    // const [ loading, setLoading ] = useState(true);

    // If opened trhough link, then fetch distance & rating from backend
    useEffect(() => {
        if (location.pathname.includes("workshops") && locationState.location) {
            getDistance();
        }
    }, [location]);

    useEffect(() => {
        getStarRatings();
    }, [workshop])


    const getDistance = () => {
        const { lat: lat1, lng: lng1 } = locationState.location;
        const { lat: lat2, lng: lng2 } = workshop.location;

        // console.log("Fetching distance between:", lat1, lng1, lat2, lng2);

        const params = new URLSearchParams({ lat1, lng1, lat2, lng2 }).toString();
        // fetch(`${process.env.REACT_APP_BACKEND_URL}/google-maps/distance/${locationState.location.lat}/${locationState.location.lng}/${workshop.location.lat}/${workshop.location.lng}`)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/google-maps/distance?${params}`)
            .then((response) => response.json())
            .then((data) => {
                setDistance(data.distance);
            })
            .catch((error) => {
                console.error("Error fetching distance:", error);
            });
    }

    const getStarRatings = () => {
        const { name, address } = workshop;

        const params = new URLSearchParams({ name, address }).toString();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/google-maps/stars?${params}`)
            .then((response) => response.json())
            .then(data => {
                setRating(data)
            })
            .catch((error) => {
                console.error("Error fetching workshops:", error);
            });
    }

    return (        
        <Grid className="workshop-grid-item" 
            size={{xs: 12, sm: 12, md: 12, lg: 12}}
            sx={{padding: 0}}
        >
            <Card className="workshop-card"
                sx={workshopCardStyle}
            >
                <CardHeader
                    sx={workshopCardHeaderStyle}
                    avatar={
                        <LocationPinIcon className="workshop-card-header-icon" color="error" />
                    }
                    title={<Typography variant="h6" component="div" className="workshop-card-header">
                        {workshop.name}
                    </Typography> }
                    subheader={
                        <ElectricVehicles workshop={workshop} />
                    }                   
                />
                <CardContent>
                    <Grid container spacing={2} className="workshop-card-content" >
                        <Grid item size={{xs: 12, sm: 12, md: 12, lg: 12}}>
                        <p>{workshop.address}</p>
                        {/* <Typography variant="body1" component="p" className="workshop-card-address">
                            {workshop.address}
                        </Typography> */}
                        { workshop.email && (
                            <p>
                                {t("workshop.email")}
                                <a href={`mailto:${workshop.email}`}>{workshop.email}</a>
                            </p>
                        ) }
                        { workshop.phone && workshop.phone.length > 0 && (
                            <p>
                                {t("workshop.phone")}
                                {workshop.phone.map((phone, index) => (
                                    <span key={index}>
                                        <a href={`tel:${phone}`}>{phone}</a>{index < workshop.phone.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </p>
                        ) }
                        { locationState.location && (workshop.distance || distance) && (
                            <p>
                            {t("workshop.workshopDistance")}
                            {workshop.distance ? workshop.distance : distance} km
                            </p>
                        ) }
                        { rating && (
                            <Rating rating={rating} />
                        ) }
                        </Grid>
                        {/* <Grid item size={{xs: 12, sm: 5, md: 5, lg: 5}}>
                            <VehicleListing workshop={workshop} />
                        </Grid> */}
                    </Grid>

                    
                </CardContent>
                <CardActions>
                    { !location.pathname.includes("workshops") && (
                        <div className="workshop-card-actions">
                            <Button
                                variant="contained"
                                size={isMobile ? "small" : "medium"}
                                sx={chooseButtonStyle}
                                onClick={() => {
                                    navigate(`/workshops/${workshop.id}?step=1`);
                                }}  
                            >
                                {t('actions.choose')}
                            </Button>
                        </div>)
                    }
                </CardActions>
            </Card>
        </Grid>
    );
}

// xs={12} sm={6} md={6} lg={6}