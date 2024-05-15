import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter, Link } from "react-router-dom";

export default function AppBarComponent() {
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        style={{
                            marginRight: 20,
                        }}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        Dashboard
                    </Typography>
                    <Typography variant="h6">
                        Generate
                    </Typography>
                    <Link to='/'>Sağlık Hizmetim</Link>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}