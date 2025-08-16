import React, { useEffect, useState } from "react";
import CustomStepper from "../components/CustomStepper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDraft } from "../store/reservationSlice";
import Car from "../components/Car";
import BookingConfirmed from "../components/BookingConfirmed";
import WorkshopAndDate from "../components/WorkshopAndDate";
import BookingInfo from "../components/BookingInfo";
import CancelBookingButton from "../components/CancelBookingButton";
import HeaderInfo from "../components/HeaderInfo";
import { useWindowSize } from "../hooks/useWindowSize";

export default function ReservationPage() {

    const { reservationUuid } = useParams();
    const [ reservation, setReservation ] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isDesktop, isTablet } = useWindowSize();

    useEffect(() => {
        fetchReservation();
        // eslint-disable-next-line
    }, [reservationUuid]);

    function fetchReservation() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/reservations/${reservationUuid}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch reservation: ${reservationUuid}`);
                }
                return res.json();
            })
            .then(data => {
                setReservation(data);
                if (data && data.car) {
                    dispatch(setDraft({ car: data.car }));
                }
            })
            .catch((error) => {
                console.error("Error fetching reservation:", error);
                navigate("/");
            });
    }

    return (
        <div className='workshop-page'>
           
            { (isDesktop || isTablet) && 
                <HeaderInfo />
            }
            <CustomStepper />
            <Car />
            <div className='workshop-page_steps'>
                <BookingConfirmed />
                <WorkshopAndDate reservation={reservation} />
                <CancelBookingButton reservationUuid={reservationUuid} />
                <BookingInfo reservation={reservation} />
            </div>
        </div>
    );
}