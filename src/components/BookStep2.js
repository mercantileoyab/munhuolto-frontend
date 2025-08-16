import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Car from "./Car";
import ContactInfo from "./ContactInfo";
import WorkshopAndDate from "./WorkshopAndDate";
import BaseServices from "./BaseServices";

export default function BookStep2() {

    const { draft } = useSelector((state) => state.reservation);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!draft.workshop) {
            navigate("/");
            return;
        }
        if (!draft.car || !draft.date) {
            const params = new URLSearchParams(location.search);
            params.set('step', '1');
            navigate(`/workshops/${draft.workshop?.id || ''}?${params.toString()}`);
        }
    }, [draft, navigate, location]);

    return (
        <div className='workshop-page_steps'>
            <WorkshopAndDate />
            <BaseServices category="extra" />
            <ContactInfo />
        </div>
    );
}