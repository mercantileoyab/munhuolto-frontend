import React from "react";
import '../styles/style.css';
import { TextField, Typography } from "@mui/material";
import { useWindowSize } from "../hooks/useWindowSize";
import { filterTextFieldStyle } from "../styles/textfieldStyles";
import { useTranslation } from "react-i18next";
import { basicFont } from "../styles/fontStyles";

export default function Filter() {
    
    const { isMobile } = useWindowSize();
    const { t } = useTranslation();

    return (
        <div className="filter"
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* <p className="filter-header" >Rajaa hakua</p> */}
            <Typography variant="h6" className="filter-header" gutterBottom sx={basicFont}>
                {t("filter.header")}
            </Typography>
            <TextField className="filter-textfield"
                fullWidth={isMobile ? true : false}
                sx={filterTextFieldStyle}
                // label="Palvelut ja etäisyys"
                label={t("filter.textFieldPlaceholder")}
            />   
        </div>
    )
}