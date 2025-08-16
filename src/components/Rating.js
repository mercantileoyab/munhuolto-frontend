import React from "react";
import { Box, Rating as MuiRating, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function Rating({ rating }) {

    const { t } = useTranslation();

    if (!rating || typeof rating.rating !== "number") {
        return (
            <Box display="flex" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                    {t('rating.noRatings')}
                </Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" alignItems="center">
            <Typography variant="body1" fontWeight="bold" mr={1}>
                {rating.rating.toFixed(1)}
            </Typography>
            <MuiRating
                name="read-only-rating"
                value={rating.rating}
                precision={0.5}
                readOnly
                size="small"
            />
            <Typography variant="body2" color="text.secondary" ml={1}>
                ({rating.totalRatings})
            </Typography>
        </Box>
    );
}
