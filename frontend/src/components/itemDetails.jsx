import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

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
    <div style={{ padding: "20px" }}>
      <h1>{item.name}</h1>
      <p>Price: ${item.price}</p>
      <p>Description: {item.description || "No description available"}</p>
    </div>
  );
}
