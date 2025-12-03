import React, { useEffect, useState } from "react";
import ItemList from "./components/itemList";
import api from "./services/api";
import { toast } from "react-toastify";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      const data = await api.get("/api/items");
      setItems(data);
    } catch (error) {
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Marketplace</h1>

      {loading ? (
        <p style={{ fontSize: "18px" }}>Loading items...</p>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
}

export default App;
