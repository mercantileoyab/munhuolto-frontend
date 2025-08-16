// import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LocationSearchingRoundedIcon from '@mui/icons-material/LocationSearchingRounded';
import { Button, IconButton, InputAdornment, TextField, Typography, Grid } from "@mui/material";
import locationContext from "../context/locationContext";
import ClearIcon from '@mui/icons-material/Clear';
import { defaultButtonStyle } from "../styles/buttonStyles";
import { defaultTextFieldStyle } from "../styles/textfieldStyles";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../hooks/useWindowSize";
import workshopContext from "../context/workshopContext";

export default function UserLocation() {

    const { state: locationState, setLocation, setLocationAddress, emptyLocation } = useContext(locationContext);
    const { emptySelectedWorkshops } = useContext(workshopContext);
    const { t } = useTranslation();
    const { isDesktop, isTablet, isMobile } = useWindowSize();

    const [ address, setAddress ] = useState('');

    const handleCurrentClick = () => {
        // Get the current location of the user
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setLocation({ lat, lng });
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    const handleClearLocation = () => {
        setAddress('');
        emptyLocation();
        emptySelectedWorkshops();
    }

    useEffect(() => {
        if (locationState.locationAddress) {
            setAddress(locationState.locationAddress);
        }
    }, [ locationState.locationAddress ]);

    useEffect(() => {
        if (locationState.location) {
            fetchAdressByLocation();
        }
    }, [ locationState.location ]);

    const fetchAdressByLocation = () => {
        // Fetch the address using the location coordinates
        const { lat, lng } = locationState.location ?? {};
        if (!lat || !lng) return;

        const params = new URLSearchParams({ lat, lng }).toString();
        // fetch(`${process.env.REACT_APP_BACKEND_URL}/google-maps/address/${lat}/${lng}`)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/google-maps/address?${params}`)
            .then((response) => response.json())
            .then((data) => {
                setLocationAddress(data.name);
            })
            .catch((error) => {
                console.error("Error fetching address:", error);
            });
    }
    

    // Layout for desktop/tablet: side by side using MUI Grid
    if (isDesktop || isTablet) {
        return (
            <>
            <Grid container spacing={2} alignItems="center">
                <Grid item size={{xs: 3, sm: 3, md: 3, lg: 3}} />
                <Grid item size={{xs: 6, sm: 6, md: 6, lg: 6}} >
                    <TextField
                        id="userLocation"
                        label={t("userLocation.textFieldPlaceholder")}
                        variant="outlined"
                        fullWidth
                        value={address}
                        {...(locationState.locationAddress && locationState.location
                            ? {
                                InputProps: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton>
                                        <ClearIcon onClick={handleClearLocation} />
                                    </IconButton>
                                    </InputAdornment>
                                ),
                                },
                            }
                            : {})}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={defaultTextFieldStyle}
                    />
                </Grid>
                <Grid item size={{xs: 3, sm: 3, md: 3, lg: 3}}>
                    <div
                        onClick={handleCurrentClick}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            cursor: 'pointer',
                            height: '100%',
                        }}
                    >
                        <Typography variant="body2" sx={{ color: 'grey', textDecoration: 'underline', marginRight: '4px' }}>
                            {t("userLocation.locationText")}
                        </Typography>
                        <LocationSearchingRoundedIcon />
                    </div>
                </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button className="userLocationButton"
                    fullWidth
                    variant="contained"
                    disabled={locationState.locationAddress && locationState.location} 
                    sx={{...defaultButtonStyle, marginTop: 2 }}
                    size="large"
                >
                    {t("actions.search")}
                </Button>
            </div>
            </>
        );
    }

    // Mobile layout (stacked)
    return (
        <>
        <div className="userLocation"
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            { isMobile && (
                <Typography variant="p" component={'p'} >
                    {t("userLocation.locationHeader")}
                </Typography>
            )}
            <div
                onClick={handleCurrentClick}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                >
                <Typography variant="body2" sx={{ color: 'grey', textDecoration: 'underline', marginRight: '4px' }}>
                    {t("userLocation.locationText")}
                </Typography>
                <LocationSearchingRoundedIcon />
            </div>
        </div>
        <div style={{ marginTop: '16px' }}>
            <TextField
                id="userLocation"
                label={t("userLocation.textFieldPlaceholder")}
                variant="outlined"
                fullWidth
                value={address}
                {...(locationState.locationAddress && locationState.location
                    ? {
                        InputProps: {
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton>
                                <ClearIcon onClick={handleClearLocation} />
                            </IconButton>
                            </InputAdornment>
                        ),
                        },
                    }
                    : {})}
                onChange={(e) => setAddress(e.target.value)}
                sx={defaultTextFieldStyle}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className="userLocationButton"
                    fullWidth
                    variant="contained"
                    disabled={locationState.locationAddress && locationState.location} 
                    sx={{...defaultButtonStyle, marginTop: 2 }}
                    size="normal"
                >
                    {t("actions.search")}
                </Button>
            </div>
        </div>
        </>
    )
}