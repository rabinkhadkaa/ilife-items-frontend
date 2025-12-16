import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import Navbar from "./navbar.jsx";
import { Box, Container, Typography } from "@mui/material";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await api.get(`/api/item/${id}`);
        setItem(data);
      } catch (error) {
        toast.error("Failed to load item details");
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

 return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {item.name}
        </Typography>
        <Typography variant="h6">Price: ${item.price}</Typography>
        <Typography sx={{ mt: 2 }}>
          Description: {item.description || "No description available"}
        </Typography>
      </Container>
    </>
  );
}
