import { Card, Typography, Checkbox, FormControlLabel, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { workshopCardStyle } from "../styles/cardStyles";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setDraft } from "../store/reservationSlice";

export default function BaseServices({ category }) {
    const { i18n, t } = useTranslation();
    const [services, setServices] = useState([]);
    const draft = useSelector((state) => state.reservation.draft);
    const dispatch = useDispatch();

    useEffect(() => {
        getBaseServices();
        // eslint-disable-next-line
    }, []);

    const getBaseServices = () => {
        const url =
            category === "extra"
                ? `${process.env.REACT_APP_BACKEND_URL}/service-catalogue/base-extra`
                : `${process.env.REACT_APP_BACKEND_URL}/service-catalogue/base`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setServices(data);
            })
            .catch(error => {
                console.error("Error fetching base services:", error);
            });
    };

    const handleCheckboxChange = (event, service) => {
        let newServices;
        if (event.target.checked) {
            // Add the whole service object if not already present (by id)
            newServices = [...(draft.services || []), service];
        } else {
            // Remove by id
            newServices = (draft.services || []).filter(s => s.id !== service.id);
        }
        dispatch(setDraft({ services: newServices }));
    };

    // Check if a service is selected by id
    const isServiceSelected = (service) =>
        (draft.services || []).some(s => s.id === service.id);

    if (!draft.car) {
        return null; // Do not render if no car is selected
    }

    return (
        <Card sx={{ ...workshopCardStyle, marginTop: '20px' }} className="workshop-base-services">
            <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}
                className="baseServiceTitle"
            >
                { category === "extra" ? t("baseServices.extraServices") : t("baseServices.title") }
            </Typography>
            <div className='base-service-checkboxes'>
                {services.length > 0 &&
                    services.map((service) => {
                        const translation = service.translations?.[i18n.language] || service.translations?.fi || {};
                        return (
                            <Box key={service.id} sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isServiceSelected(service)}
                                            onChange={(e) => handleCheckboxChange(e, service)}
                                            name={service.id}
                                        />
                                    }
                                    label={
                                        <Typography variant='body1' component="p">
                                            {translation.name}
                                        </Typography>
                                    }
                                    labelPlacement="start"
                                    sx={{ width: '100%', justifyContent: 'space-between', margin: 0, display: 'flex' }}
                                />
                                {translation.description && (
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'grey.600', fontSize: '0.95em', marginLeft: 0, marginTop: '-8px' }}
                                    >
                                        {translation.description}
                                    </Typography>
                                )}
                            </Box>
                        );
                    })
                }
            </div>
        </Card>
    );
}