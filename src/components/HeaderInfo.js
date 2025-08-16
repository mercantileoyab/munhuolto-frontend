import React from "react";
import '../styles/style.css';
import UserLocation from "./UserLocation";
import { useWindowSize } from "../hooks/useWindowSize";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { useLocation } from "react-router-dom";

export default function HeaderInfo() {
    const { isDesktop, isTablet } = useWindowSize();
    const location = useLocation();
    const { t } = useTranslation();

    // Wait until both location and isDesktop are defined (hydration-safe)
    if (typeof isDesktop === "undefined" || typeof location.pathname === "undefined") {
        return null;
    }

    // If not on root, render only the header
    if (location.pathname !== "/") {
        return (
            <div className="headerInfoWithOutPadding"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                        variant="h3"
                        className="headerInfoHeader"
                        gutterBottom
                        sx={{ fontFamily: "'Luckiest Guy', cursive", display: 'flex', alignItems: 'center' }}
                    >
                        {t("HeaderInfo.headerInfoHeader")}
                        { (isDesktop || isTablet) && (
                            <LocationPinIcon
                                sx={{ fontSize: 60, marginLeft: 1, color: "red", verticalAlign: "middle" }}
                            />
                        )}
                    </Typography>
                </div>
            </div>
        );
    }

    // Default: render full header info
    return (
        <div className="headerInfo"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                    variant="h3"
                    className="headerInfoHeader"
                    gutterBottom
                    sx={{ fontFamily: "'Luckiest Guy', cursive", display: 'flex', alignItems: 'center' }}
                >
                    {t("HeaderInfo.headerInfoHeader")}
                    { (isDesktop || isTablet) && (
                        <LocationPinIcon
                            sx={{ fontSize: 60, marginLeft: 1, color: "red", verticalAlign: "middle" }}
                        />
                    )}
                </Typography>
            </div>

            <div className="headerInfoText">
                <Typography variant="body1" >
                    {t("HeaderInfo.headerInfoText")}
                </Typography>
                <ul style={{ marginTop: '10px', paddingLeft: '20px', marginLeft: '30px' }}>
                    <li>
                        <Typography variant="body2">{t("HeaderInfo.headerInfoList.item1")}</Typography>
                    </li>
                    <li>
                        <Typography variant="body2">{t("HeaderInfo.headerInfoList.item2")}</Typography>
                    </li>
                    <li>
                        <Typography variant="body2">{t("HeaderInfo.headerInfoList.item3")}</Typography>
                    </li>
                </ul>
                <UserLocation />
            </div>
        </div>
    )
}