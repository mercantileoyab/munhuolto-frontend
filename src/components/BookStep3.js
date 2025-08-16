import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BookStep3() {
    const { reservationUuid } = useParams();
    const [ reservation, setReservation ] = useState(null);

    useEffect(() => {
        fetchReservation();
    }, [reservationUuid]);

    function fetchReservation() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/reservations/${reservationUuid}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched reservation:", data);
                setReservation(data);
            })
            .catch((error) => {
                console.error("Error fetching reservation:", error);
            });
    }

    return (
        <div className='workshop-page_steps'>
            test
        </div>
    );
}