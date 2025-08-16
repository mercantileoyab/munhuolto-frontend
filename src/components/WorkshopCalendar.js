// import React from "react";
import { Card, Typography } from "@mui/material";
// import { useWindowSize } from "../hooks/useWindowSize";
import { workshopCardStyle } from "../styles/cardStyles";
import { useDispatch, useSelector } from "react-redux";
import { setDraft } from '../store/reservationSlice';
import { DayPicker } from "react-day-picker";
import { enUS, fi, sv } from "date-fns/locale";
import "react-day-picker/style.css";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../hooks/useWindowSize";

dayjs.extend(isSameOrBefore);

export default function WorkshopCalendar() {
    // const { isMobile } = useWindowSize();
    const dispatch = useDispatch();
    const draft = useSelector((state) => state.reservation.draft);
    const { i18n, t } = useTranslation();
    const { isDesktop, isTablet } = useWindowSize();

    // Map i18n language to date-fns locale
    const localeMap = {
        fi: fi,
        sv: sv,
        en: enUS
    };
    const calendarLocale = localeMap[i18n.language] || enUS;

    // Use dayjs for today and tomorrow
    const today = dayjs().startOf('day');
    const tomorrow = today.add(1, 'day');

    // Disable weekends function
    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
    };

    // Handler for selecting a date
    const handleSelectDate = (date) => {
        if (date) {
            dispatch(setDraft({ date: dayjs(date).format('YYYY-MM-DD') }));
        } else {
            dispatch(setDraft({ date: null }));
        }
    };

    return (
        <Card sx={workshopCardStyle} className="workshop-calendar" >
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '20px' }} className="workshop-calendar-header" textAlign={'center'}>
                {t("workshopCalendar.selectDate")}
            </Typography>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <DayPicker
                    animate
                    mode="single"
                    selected={draft.date ? dayjs(draft.date).toDate() : undefined}
                    onSelect={handleSelectDate}
                    locale={calendarLocale}
                    disabled={[
                        { before: tomorrow.toDate() },
                        isWeekend
                    ]}
                    numberOfMonths={ (isDesktop || isTablet) ? 2 : 1}
                />
            </div>
        </Card>
    );
}
