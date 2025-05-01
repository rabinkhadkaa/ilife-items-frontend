import { useEffect, useState } from "react";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/modules/items/list.php")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div>
      <h3>My Items</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
