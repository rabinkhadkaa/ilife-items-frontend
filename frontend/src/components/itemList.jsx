import { Link } from "react-router-dom";

export default function ItemList({ items }) {
  if (!items.length) return <p>No items available</p>;

  return (
    <div style={{
      display: "grid", gap: "20px",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))"
    }}>
      {items.map(item => (
        <Link 
          to={`/item/${item.id}`} 
          key={item.id} 
          style={{ textDecoration:"none", color:"inherit" }}
        >
          <div style={{
            border:"1px solid #ddd", padding:16, borderRadius:8,
            background:"#fff", boxShadow:"0 2px 4px rgba(0,0,0,0.06)",
            transition:"0.2s", cursor:"pointer"
          }}>
            <h3>{item.name}</h3>
            <p style={{margin:0}}>Price: ${item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
