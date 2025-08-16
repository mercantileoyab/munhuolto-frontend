import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import FlagFi from "../images/flag.png";
import FlagSv from "../images/flag_sv.png";
import FlagEn from "../images/flag_en.png";

export default function Language() {
    const { i18n } = useTranslation();
    const [lang, setLang] = React.useState(i18n.language || "fi");

    const handleChange = (event) => {
        const newLang = event.target.value;
        setLang(newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="language-selector">
            <Select
                value={lang}
                onChange={handleChange}
                displayEmpty
                variant="outlined"
                size="small"
            >
                <MenuItem value="fi">
                    <img src={FlagFi} alt="Suomi" width={24} height={16} />
                </MenuItem>
                <MenuItem value="sv">
                    <img src={FlagSv} alt="Svenska" width={24} height={16} />
                </MenuItem>
                <MenuItem value="en">
                    <img src={FlagEn} alt="English" width={24} height={16} />
                </MenuItem>
            </Select>
        </div>
    );
}