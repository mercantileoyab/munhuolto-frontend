import React, { useState } from "react";
import '../styles/style.css';
import { Button, InputAdornment, TextField, Typography, IconButton } from "@mui/material";
import { defaultTextFieldStyle } from "../styles/textfieldStyles";
import Flag from '../images/flag.png'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setDraft } from "../store/reservationSlice";
import { useWindowSize } from "../hooks/useWindowSize";
import { defaultButtonStyle } from "../styles/buttonStyles";
import CloseIcon from '@mui/icons-material/Close';
import Car from "./Car";

export default function RegisterPlate() {

    const { t, i18n } = useTranslation();
    const { isDesktop, isTablet } = useWindowSize();

    const [ plate, setPlate ] = useState('');
    const draft = useSelector((state) => state.reservation.draft);
    const [ error, setError ] = useState(null);
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    
    const submitForm = (e) => {
        e.preventDefault();
        fetchCar();
    }

    const handlePlateChange = (e) => {
        const { value } = e.target;
        setPlate(value);
    }

    const handleMileageChange = (e) => {
        const { value } = e.target;
        dispatch(setDraft({ mileage: value }));
    }

    const initError = () => {
        setError(null);
    }

    const fetchCar = () => {
        setLoading(true);
        const params = new URLSearchParams({ plate }).toString();

        fetch(`${process.env.REACT_APP_BACKEND_URL}/cars?${params}`)
            .then(res => {
                if (!res.ok) {
                    setError({
                        'fi': 'Rekisterinumeroa ei löytynyt',
                        'en': 'Car with this plate not found',
                        'sv': 'Bilen med detta registreringsnummer hittades inte'
                    })
                } else {
                    return res.json().then(data => {
                        initError();
                        if (data) {
                            dispatch(setDraft({ car: data }));
                        }
                    })
                }
                
            })
            
            .catch((error) => {
                console.error("Error fetching car:", error);
            })
            .finally(_ => setLoading(false));
    }

    const handleMileageSet = () => {
        // Not needed, as mileage is set onChange
    };

    // Handler for X-mark
    const handleClearCar = () => {
        dispatch(setDraft({ car: null }));
    };

    // Use desktop/tablet layout if either is true
    const isWide = isDesktop || isTablet;

    return (
        <>
        <div
            className="registerplate"
            style={{
                display: isWide ? 'flex' : undefined,
                flexDirection: isWide ? 'column' : undefined,
                gap: isWide ? '16px' : undefined,
                alignItems: isWide ? 'flex-start' : undefined,
            }}
        >
            <form onSubmit={submitForm}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isWide ? '16px' : undefined,
                    width: '100%'
                }}
            >
                <div
                    style={{
                        display: isWide ? 'flex' : undefined,
                        flexDirection: isWide ? 'row' : undefined,
                        gap: isWide ? '24px' : undefined,
                        width: '100%'
                    }}
                >
                    <TextField 
                        sx={{...defaultTextFieldStyle, marginBottom: isWide ? 0 : '20px'}}
                        fullWidth
                        onChange={handlePlateChange}
                        name="plate"
                        value={draft.car ? draft.car.plate : plate}
                        disabled={draft.car ? true : false}
                        label={t('registerPlate.label')}
                        placeholder="ABC-123"
                        error={error ? true : false}
                        helperText={error ? error[i18n.language] : ''}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img
                                        src={Flag}
                                        alt="Flag"
                                        style={{ width: 24, height: 16 }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                draft.car ? (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={t('registerPlate.clearCar')}
                                            onClick={handleClearCar}
                                            edge="end"
                                            size="small"
                                            tabIndex={0}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null
                            )
                        }}
                    />
                    <TextField 
                        sx={{...defaultTextFieldStyle, marginBottom: isWide ? 0 : '20px'}}
                        fullWidth
                        placeholder="100000"
                        name="mileage"
                        type="number"
                        onChange={handleMileageChange}
                        value={draft.mileage || ''}
                        label={t('registerPlate.mileage')}
                        // disabled={!draft.car}
                    />
                </div>
                { !draft.car && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button className="infoButton"
                        type="submit"
                        sx={defaultButtonStyle}
                        variant="contained"
                        fullWidth
                        disabled={plate.length < 3 || !plate || draft.car || loading ? true : false}
                    >
                        {t('registerPlate.searchButton')}
                    </Button>
                </div>
                )}
                
            </form>
            
        </div>
        { draft.car && <Car />}
        </>
    )
}