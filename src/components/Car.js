import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import '../styles/style.css';
// import Auto from '../images/auto.png';
import Auto from '../images/Munhuolto_ikoni_auto.svg';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { carInfoFont } from '../styles/fontStyles';

export default function Car() {

    const draft = useSelector((state) => state.reservation.draft);
    const { t } = useTranslation();

    if (!draft.car) {
        return null;
    }

    // Use car.mileage if present, otherwise use draft.mileage
    const mileage = draft.car.mileage != null && draft.car.mileage !== ''
        ? draft.car.mileage
        : draft.mileage;

    return (
        <div className='car_info' >
            <div className='car_info_icon'>
                <img src={Auto} alt="Car Icon" style={{ height: 55 }} />
            </div>
            <div className='car_info_plate'>
                <Typography variant='subtitle1' color='textSecondary' sx={carInfoFont} >
                    {draft.car?.plate}
                </Typography>
                <Typography variant='subtitle1' color='textSecondary' sx={carInfoFont} >
                    {draft.car?.basicinfo?.basicinfo?.GenericName || t('car.noBrand')}
                </Typography>
                <Typography variant='subtitle1' color='textSecondary' sx={carInfoFont} >
                    {t('car.mileage')}: {mileage ? mileage.toLocaleString() :  t('car.noMileage')}
                </Typography>
            </div>
        </div>
    );
}