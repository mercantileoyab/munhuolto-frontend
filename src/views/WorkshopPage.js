import React, { useEffect, useState } from 'react';
import Workshop from '../components/Workshop';
import { useLocation } from 'react-router-dom';
import CustomStepper from '../components/CustomStepper';
import { useDispatch, useSelector } from 'react-redux';
import { setDraft } from '../store/reservationSlice';
import BookStep1 from '../components/BookStep1';
import BookStep2 from '../components/BookStep2';
import Car from '../components/Car';
import BookStep3 from '../components/BookStep3';
import { useWindowSize } from '../hooks/useWindowSize';
import HeaderInfo from '../components/HeaderInfo';
// import '../styles/styeles.css';

export default function WorkshopPage() {

    const location = useLocation();
    const draft = useSelector((state) => state.reservation.draft);
    const { isDesktop, isTablet } = useWindowSize();

    const dispatch = useDispatch();
    // const draft = useSelector((state) => state.reservation.draft);

    const [ workshop, setWorkshop ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ activeStep, setActiveStep ] = useState(0);
    const [ showCar, setShowCar ] = useState(false);

    useEffect(() => {
        getWorkshop();
        const params = new URLSearchParams(location.search);
        setActiveStep(Number(params.get('step')) - 1);
    }, [location]);

    useEffect(() => {
        // if (activeStep > 0 && draft.car) {
        if (draft.car) {
            setShowCar(true);
        } else {
            setShowCar(false);
        }
    }, [activeStep, draft.car]);

    useEffect(() => {
        if (workshop) {            
            dispatch(setDraft({ workshop: workshop }));
        }
    }, [workshop]);

    const getWorkshop = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}${location.pathname}`)
            .then((response) => response.json())
            .then((data) => {
                setWorkshop(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching workshops:", error);
            });
    }

    while (loading) {
        return <></>
    }

    return (
        <div className='workshop-page'>
            { (isDesktop || isTablet) && 
                <HeaderInfo />
            }
            <CustomStepper />

            { showCar && activeStep > 0 && <Car /> }

            { activeStep === 0 && <Workshop workshop={workshop} /> }

            { activeStep === 0 && <BookStep1 /> }
            { activeStep === 1 && <BookStep2 /> }
            { activeStep === 4 && <BookStep3 /> }
        </div>
    );
}