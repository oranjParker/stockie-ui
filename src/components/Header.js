// ./components/Header.js
import React from "react";
import { Avatar, AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import AuthMenu from "./AuthMenu";
import { useAuth } from "../context/AuthContext";

const MENU_ITEMS = ['Profile', 'Likes', 'Collections', 'Downloads', 'Settings'];

const Header = () => {
  const { isLoggedIn, username, handleLogout, setErrorMessage } = useAuth();  // destructure setErrorMessage
  const [authType, setAuthType] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event, type) => {
    console.log('handleMenuClick called');
    setAuthType(type);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setErrorMessage(''); // clear error message when dropdown is closed
  };

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);

  const handleProfileMenuClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

console.log({ isLoggedIn, username });
console.log({ anchorEl, authType, profileMenuAnchorEl });

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Stockie
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleProfileMenuClick}>
                <Avatar />{username}
              </Button>
              <Menu
                anchorEl={profileMenuAnchorEl}
                keepMounted
                open={Boolean(profileMenuAnchorEl)}
                onClose={handleProfileMenuClose}
              >
                {MENU_ITEMS.map(item => (
                  <MenuItem key={item} onClick={handleProfileMenuClose}>{item}</MenuItem>
                ))}
              </Menu>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <div>
              <Button
                aria-controls="auth-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={(event) => handleMenuClick(event, "login")}
              >
                Login
              </Button>
              <Button
                aria-controls="auth-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={(event) => handleMenuClick(event, "register")}
              >
                Register
              </Button>
              <AuthMenu 
                anchorEl={anchorEl}
                handleClose={handleClose}
                authType={authType}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
