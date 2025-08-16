import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";
// import Logo from '../images/logo_esimerkki.png';
import Logo from '../images/Munhuolto_logo_teksti.svg';
import '../styles/style.css';
import Language from "./Language";

export default function TopBar() {

    const navigate = useNavigate();
    const { isDesktop } = useWindowSize();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent" sx={{ boxShadow: 'none', backgroundColor: 'transparent' }} >
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Box 
                        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }} 
                        onClick={() => navigate('/')}
                    >
                        <img className="logo"
                            src={Logo} 
                            alt="Logo"
                        />
                    </Box>
                </Typography>
            { 
                isDesktop ? 
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Huoltamot
                    </Link>
                    <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Palvelut
                    </Link>
                    <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Meistä
                    </Link>
                    <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Ota yhteyttä
                    </Link>
                    <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                        <Language />
                    </Box>
                </Box>
                : 
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Language />
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            }
                </Toolbar>
            </AppBar>
        </Box>
    )

}