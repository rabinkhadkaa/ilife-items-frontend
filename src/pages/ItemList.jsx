import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemList.css';

const ItemCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm fixed-card">
        <img
          src={item.image || "https://via.placeholder.com/200x150?text=No+Image"}
          className="card-img-top fixed-card-img"
          alt={item.title}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{item.title}</h5>
          <p className={`card-text ${expanded ? 'expanded' : 'collapsed'}`}>
            {item.description}
          </p>
          {item.description.length > 80 && (
            <button
              className="btn btn-link p-0 mt-auto"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'See less' : 'See more'}
            </button>
          )}
          <strong className="mt-auto">${item.price}</strong>
        </div>
      </div>
    </div>
  );
};

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")   // TEMP TEST API
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">Marketplace Products</h1>

      {items.length === 0 && <p className="text-center">Loading items…</p>}

      <div className="row">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
