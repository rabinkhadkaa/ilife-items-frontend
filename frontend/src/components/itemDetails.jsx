import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`/api/items/${id}`).then(setItem);
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{padding:"20px"}}>
      <h2>{item.name}</h2>
      <p><b>Price:</b> ${item.price}</p>

      <hr/>
      <h4>Description</h4>
      <p>{item.description || "No description available."}</p>
    </div>
  );
}
