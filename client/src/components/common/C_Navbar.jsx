import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const C_Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar className="flex justify-between items-center">
        <Typography variant="h6" className="flex-grow">
          Lizaso Laundry Hub
        </Typography>
        <div className="flex-grow flex justify-center space-x-4">
          <Button color="inherit">Select a Service</Button>
          <Button color="inherit">Order Tracking</Button>
          <Button color="inherit">Payment History</Button>
        </div>
        <div className="flex items-center">
          <IconButton color="inherit" onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default C_Navbar;
