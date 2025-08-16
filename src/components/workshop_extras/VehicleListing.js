import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

export default function VehicleListing({ workshop }) {

    const { t } = useTranslation();
    // Check for specialty brands
    if (
        workshop.specialtyBrands &&
        workshop.specialtyBrands.active &&
        Array.isArray(workshop.specialtyBrands.brands) &&
        workshop.specialtyBrands.brands.length > 0
    ) {
        return (
            <div className="workshop-vehicle-listing">
                <strong>{t('vehicleListing.headerTextSpecialized')}:</strong>
                <ul>
                    {workshop.specialtyBrands.brands.map((brand, idx) => (
                        <li key={idx}>{brand}</li>
                    ))}
                </ul>
            </div>
        );
    }

    // Check for excluded brands
    if (
        workshop.exclBrands &&
        Array.isArray(workshop.exclBrands.brands) &&
        workshop.exclBrands.brands.length > 0
    ) {
        return (
            <div className="workshop-vehicle-listing">
                <strong>{t('vehicleListing.headerTextExcluding')}:</strong>
                <ul>
                    {workshop.exclBrands.brands.map((brand, idx) => (
                        <li key={idx}>{brand}</li>
                    ))}
                </ul>
            </div>
        );
    }

    // If no brands, show "on"
    return null;
}

//   "specialtyBrands": {
//     "active": false,
//     "brands": []
//   },
//   "exclBrands": {
//     "brands": [
//       "Volvo",
//       "Polestar"
//     ]
//   }
// }