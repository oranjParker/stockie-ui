// ./components/AuthMenu.js
import React from 'react';
import { Button, Menu, MenuItem } from "@mui/material";
import Auth from "./Auth";

const AuthMenu = ({ anchorEl, handleClose, authType }) => (
  <Menu
    id="auth-menu"
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem>
      <Auth type={authType} />
    </MenuItem>
  </Menu>
);

export default AuthMenu;
