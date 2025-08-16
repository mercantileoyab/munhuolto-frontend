import { Button, Checkbox, TextField, Typography, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { basicFont, carInfoFont } from "../styles/fontStyles";
import { defaultTextFieldStyle } from "../styles/textfieldStyles";
import { defaultButtonStyle } from "../styles/buttonStyles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDraft, submitReservation } from "../store/reservationSlice";
import '../styles/style.css';
import InfoForConfirmation from "./InfoForConfirmation";

export default function ContactInfo() {
    
    const { t, i18n } = useTranslation();
    const draft = useSelector((state) => state.reservation.draft);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
        note: '',
        emailMarketingOk: false,
        serviceTermsOk: false
    });
    const [ errors, setErrors ] = useState(null);
    const [ disabled, setDisabled ] = useState(true);

    // useEffect(() => {
    //     console.log("Draft after submit:", draft);
    // }, [draft]);

    useEffect(() => {
        if (contactInfo.serviceTermsOk && contactInfo.name && contactInfo.email && contactInfo.phone) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [contactInfo]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setContactInfo((prev) => ({
            ...prev,
            [name]: checked
        }));
    };

    const submitContactInfo = async (event) => {
        event.preventDefault();
        // First validation can be done here
        // Then if valid, proceed with the submission logic
        const valid = await isValidContactInfo();
        if (!valid) {
            return;
        }
        
        const reservationData = { ...draft, customer: contactInfo };
        const res = await dispatch(submitReservation(reservationData));
        // console.log(res?.payload);
        navigate(`/reservations/${res?.payload?.reservationUuid?.uuid}`, { replace: true });
    }

    const isValidContactInfo = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactInfo)
        });
        if (res.status === 422) {
            const data = await res.json();
            const errorObj = {};
            data.errors.forEach(err => {
                const key = Object.keys(err)[0];
                errorObj[key] = err[key];
            });
            setErrors(errorObj);
            return false;
        } else {
            setErrors(null);
            return true;
        }
    }

    return (
        <div className='contact-info'>
            <Typography variant='h5' gutterBottom sx={basicFont} >
                {t('contactInfo.title')}
            </Typography>
            <div className='contact-info-details'>
                <form onSubmit={submitContactInfo}>
                    <TextField
                        sx={defaultTextFieldStyle}
                        label={t('contactInfo.name')}
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        error={!!errors?.name}
                        helperText={errors?.name ? errors.name[i18n.language] : ''}
                    />
                    <TextField
                        sx={defaultTextFieldStyle}
                        label={t('contactInfo.email')}
                        variant="outlined"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        error={!!errors?.email}
                        helperText={errors?.email ? errors.email[i18n.language] : ''}
                    />
                    <TextField
                        sx={defaultTextFieldStyle}
                        label={t('contactInfo.phone')}
                        type="tel"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        error={!!errors?.phone}
                        helperText={errors?.phone ? errors.phone[i18n.language] : ''}
                    />
                    <TextField
                        sx={defaultTextFieldStyle}
                        label={t('contactInfo.note')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={contactInfo.note}
                        onChange={(e) => setContactInfo({ ...contactInfo, note: e.target.value })}
                    />
                    <div className='contact-info-checkboxes'>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="emailMarketingOk"
                                    checked={contactInfo.emailMarketingOk}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label={
                                <Typography variant='body1' component="p" sx={carInfoFont}>
                                    {t('contactInfo.marketingConsent')}
                                </Typography>
                            }
                            labelPlacement="start"
                            sx={{ width: '100%', justifyContent: 'space-between', margin: 0, display: 'flex' }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="serviceTermsOk"
                                    checked={contactInfo.serviceTermsOk}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label={
                                <Typography variant='body1' component="p" sx={carInfoFont}>
                                    {t('contactInfo.serviceConsent')} *
                                </Typography>
                            }
                            labelPlacement="start"
                            sx={{ width: '100%', justifyContent: 'space-between', margin: 0, display: 'flex' }}
                        />
                    </div>
                </form>
            </div>
            <InfoForConfirmation />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className="infoButton"
                    variant="contained"
                    disabled={disabled}
                    sx={{...defaultButtonStyle, marginTop: '20px'}} 
                    fullWidth
                    // disabled={!(draft.car && draft.date)}
                    onClick={submitContactInfo}
                >
                    {t('actions.confirm')}
                </Button>
            </div>
        </div>
    );
}