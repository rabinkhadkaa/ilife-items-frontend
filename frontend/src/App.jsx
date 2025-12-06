import { Routes, Route } from "react-router-dom";
import ItemList from "./components/itemList";
import ItemDetails from "./components/itemDetails";
import api from "./services/api";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/item/:id" element={<ItemDetails />} />
    </Routes>
  );
}

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/items").then(setItems).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Marketplace</h1>
      {loading ? <p>Loading...</p> : <ItemList items={items} />}
    </div>
  );
}

export default App;
