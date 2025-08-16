import { Card, Typography } from "@mui/material";
import React, { use, useEffect } from "react";
import { workshopCardStyle } from "../styles/cardStyles";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { carInfoFont } from "../styles/fontStyles";
import dayjs from "dayjs";
import "dayjs/locale/fi";
import "dayjs/locale/sv";
import "dayjs/locale/en";

export default function WorkshopAndDate({ reservation }) {

    const draft = useSelector((state) => state.reservation.draft);
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const [dateObj, setDateObj] = React.useState(null);

    // Use reservation prop if provided, otherwise use draft
    const source = reservation || draft;

    useEffect(() => {
        const dateString = source.date; // e.g. "2025-05-30"
        const dateObj = dayjs(dateString);

        // Format as dd.mm.yyyy
        const formattedDate = dateObj.format("DD.MM.YYYY");

        // Get day name (localized)
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

        const dayName = capitalize(dateObj.locale(i18n.language).format('dddd'));
        setDateObj({
            formattedDate,
            dayName
        });

    }, [source.date, i18n.language]);

    return (
        <Card className="workshop-and-date-card" sx={{ ...workshopCardStyle, textAlign: 'center' }}>
            <Typography variant="h6" component="div" gutterBottom>
                {t("workshopAndDate.title")}
            </Typography>
            <div className="workshop-and-date-content">
                <Typography variant="h6" component="div" className="workshop-card-header"  >
                    {source.workshop?.name}
                </Typography>
                <Typography variant="subtitle1" component="div" sx={carInfoFont} >
                    {source.workshop?.address}
                </Typography>
                <Typography variant="subtitle1" component="div" sx={carInfoFont} >
                    {source.workshop?.email || t("workshopAndDate.noEmail")}
                </Typography>
                {/* <Typography variant="subtitle1" component="div" sx={carInfoFont} >
                    {source.workshop?.email || t("workshopAndDate.noEmail")}
                </Typography> */}
                <div className="workshop-and-date-date"
                    style={{
                        margin: '20px 0',
                    }}
                >
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {dateObj ? `${dateObj.dayName}` : t("workshopAndDate.noDate")}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {dateObj ? `${dateObj.formattedDate}` : t("workshopAndDate.noDate")}
                    </Typography>
                </div>
                {/* List selected services by category */}
                {Array.isArray(source.services) && source.services.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                        {/* Maintenance services */}
                        {source.services.some(service => service.category === "maintenance") && (
                            <>
                                <Typography variant="subtitle1" component="div" sx={{ ...carInfoFont, fontWeight: 'bold', marginBottom: '8px', marginTop: '16px' }}>
                                    {t("workshopAndDate.selectedServices")}
                                </Typography>
                                {source.services
                                    .filter(service => service.category === "maintenance")
                                    .map(service => (
                                        <Typography
                                            key={service.id}
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ ...carInfoFont, marginBottom: '8px' }}
                                        >
                                            {service.translations?.[i18n.language]?.name || service.translations?.fi?.name}
                                        </Typography>
                                    ))}
                            </>
                        )}
                        {/* Extra services */}
                        {source.services.some(service => service.category === "extra") && (
                            <>
                                <Typography variant="subtitle1" component="div" sx={{ ...carInfoFont, fontWeight: 'bold', marginBottom: '8px', marginTop: '16px' }}>
                                    {t("workshopAndDate.selectedExtraServices")}
                                </Typography>
                                {source.services
                                    .filter(service => service.category === "extra")
                                    .map(service => (
                                        <Typography
                                            key={service.id}
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ ...carInfoFont, marginBottom: '8px' }}
                                        >
                                            {service.translations?.[i18n.language]?.name || service.translations?.fi?.name}
                                        </Typography>
                                    ))}
                            </>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
}