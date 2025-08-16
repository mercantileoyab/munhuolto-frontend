import React from "react";
import { useTranslation } from "react-i18next";
import '../styles/style.css';
import { Grid, Typography } from "@mui/material";
import { useWindowSize } from "../hooks/useWindowSize";
// import Logo from "../images/logo_esimerkki.png";
import Logo from "../images/Munhuolto_logo_teksti.svg";

export default function Footer() {

    const { t } = useTranslation();
    const { isMobile } = useWindowSize();

    return (
        <div className="footer">
            <Grid container spacing={3} className="footer-grid" sx={{ maxWidth: '800px', margin: 'auto' }}
                justifyContent="space-between"
            >
                <Grid item xs={12} sm={12} md={4} lg={4}
                
                >
                    <Typography variant="body2">{t("footer.termsOfService")}</Typography>
                    <Typography variant="body2">{t("footer.privacyPolicy")}</Typography>
                    <Typography variant="body2">{t("footer.cookiePolicy")}</Typography>
                    <Typography variant="body2">{t("footer.notifyIllegalContent")}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Typography variant="body2">{t("footer.contactUs")}</Typography>
                    <Typography variant="body2">{t("footer.aboutUs")}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    {/* <Typography variant="body2">{t("footer.footerText")}</Typography> */}
                    <img src={Logo} style={{ width: "200px", height: "auto" }} alt="Logo" className="footer-logo" />
                    <Typography variant="body2" className="footer-copyright">
                        Copyright © 2025 Örum Oy Ab                   
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}