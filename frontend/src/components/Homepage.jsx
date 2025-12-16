import React from "react";
import Navbar from "./navbar.jsx";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Container,
  Paper,
} from "@mui/material";

const DEFAULT_IMAGE = "default-item.png";

export default function ItemList({ items }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Header */}
      <Navbar />

      {/* Categories + Menu */}
      <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Select defaultValue="all" size="small" sx={{ width: 180 }}>
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="wood">Wood</MenuItem>
          <MenuItem value="electrical">Electrical</MenuItem>
          <MenuItem value="plumbing">Plumbing</MenuItem>
        </Select>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Button>Suppliers</Button>
          <Button>About</Button>
        </Box>
      </Paper>

      {/* Hero Banner */}
      <Box
        sx={{
          width: "100%",
          height: 100,
          background: "#a9b7c2ff",
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Marketplace Offers / Seasonal Deals
      </Box>

      {/* Featured Categories */}
      <Container>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Featured Categories
        </Typography>
        <Grid container spacing={2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Paper sx={{ p: 4, textAlign: "center", fontWeight: "600" }}>
                Category {i + 1}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Slider */}
      <Container>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          🔥 Featured Products / New Arrivals
        </Typography>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
          {items?.map((item) => (
            <Card
              key={item.id}
              sx={{ minWidth: 250, flexShrink: 0, cursor: "pointer" }}
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <CardMedia
                component="img"
                height="150"
                image={item.imageUrl || DEFAULT_IMAGE}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2">${item.price}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Top Suppliers */}
      <Container>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          🏆 Top Suppliers / Verified Sellers
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Paper key={i} sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography fontWeight="600">Supplier {i + 1}</Typography>
              <Typography>⭐⭐⭐⭐☆</Typography>
              <Button variant="contained">Visit Store</Button>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ width: "100%", background: "#263238", color: "white", p: 4, mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>Links</Grid>
          <Grid item xs={6} md={3}>Policies</Grid>
          <Grid item xs={6} md={3}>Contact</Grid>
          <Grid item xs={6} md={3}>Social Media</Grid>
        </Grid>
      </Box>
    </Box>
  );
}