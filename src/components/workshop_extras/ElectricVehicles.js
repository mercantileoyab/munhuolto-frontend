import React from "react";
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import BuildIcon from '@mui/icons-material/Build';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ElectricVehicles({ workshop }) {
    // workshop.electricVehc is an array, not an object
    const electric = Array.isArray(workshop.electricVehc) ? workshop.electricVehc[0] : {};

    const { t } = useTranslation();

    if (!electric.active) {
        return null; // If electric vehicles are not active, return nothing
    }

    const icons = [];

    // Always show ElectricCarIcon if onlyService is true
    if (electric.range.onlyService) {
        icons.push(<ElectricCarIcon fontSize="small" key="car" />);
        // If battery is also true, show BatteryAlertIcon, but not BuildIcon
        if (electric.range.battery) {
            icons.push(<BatteryAlertIcon fontSize="small" key="battery" />);
        }
    } else {
        // If not onlyService, show icons based on other flags
        icons.push(<ElectricCarIcon fontSize="small" key="car" />);
        if (electric.range.diagnostic) {
            icons.push(<BuildIcon fontSize="small" key="diagnostic" />);
        }
        if (electric.range.battery) {
            icons.push(<BatteryAlertIcon fontSize="small" key="battery" />);
        }
    }

    return (
        <div className="workshop-electric-vehicles"
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '10px',
            }}    
        >
            <Typography variant="body2" color="textSecondary">
                {t("electricVehicles.headerText")}
            </Typography>
            {icons}
        </div>
    );
}

//   "electricVehc": [
//     {
//       "active": true,
//       "range": {
//         "onlyService": true,
//         "chassis": false,
//         "diagnostic": false,
//         "battery": false
//       }
//     }
//   ],