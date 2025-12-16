import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/Logo-BP.png"
            alt="Logo"
            style={{ height: 42 }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#1a73e8" }}
          >
            BuildProcure
          </Typography>
        </Box>

        {/* Search */}
        <TextField
          placeholder="Search products..."
          variant="outlined"
          size="small"
          sx={{ width: "40%", background: "white", borderRadius: 1 }}
        />

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="text">Login</Button>
          <Button variant="contained">Cart</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
