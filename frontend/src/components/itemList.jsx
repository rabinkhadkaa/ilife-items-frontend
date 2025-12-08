import React from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = "default-item.png"; // Path to default image
export default function ItemList({ items }) {
  const navigate = useNavigate();

  if (!items.length) return <p>No items available</p>;

  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
            background: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/item/${item.id}`)}
        >
            <img
            src={item.imageUrl || DEFAULT_IMAGE}
            alt={item.name}
            style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "4px",
                marginBottom: "12px",
            }}
            />
          <h3 style={{ marginBottom: "8px" }}>{item.name}</h3>
          <p style={{ margin: 0, fontSize: "14px", color: "#444" }}>
            Price: ${item.price}
          </p>
        </div>
      ))}
    </div>
  );
}
