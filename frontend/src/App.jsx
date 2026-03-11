import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ItemList from "./components/Homepage";
import ItemDetails from "./components/itemDetails"; // We'll create this
//import Navbar from "./components/navbar"; // import the Navbar
import api from "./services/api";
import { toast } from "react-toastify";
import { checkAuth } from "./services/authService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // track logged-in user

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

    const initializeApp = async () => {
      try {

        // Step 1: Check login
        const auth = await checkAuth();
        setUser(auth.user);

        // Step 2: Load items if logged in
        await loadItems();

      } catch (err) {

        // Not logged in → redirect to ProcureX login
        window.location.href = "https://buildprocure.com/login.php";

      }
    };

    initializeApp();

  }, []);

  if (!user) {
    return <p style={{ padding: "20px" }}>Checking login...</p>;
  }

  return (
    <div>
      {/* Navbar */}
      {/* <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} /> */}

    <Routes>
      <Route
        path="/"
        element={
          <div style={{ padding: "20px" }}>
            {loading ? (
              <p style={{ fontSize: "18px" }}>Loading items...</p>
            ) : (
              <ItemList items={items} />
            )}
          </div>
        }
      />
      <Route path="/item/:id" element={<ItemDetails />} />
    </Routes>
    </div>
  );
}

export default App;
