import React from 'react';
import './ItemList.css'; // optional if you want styling

const sampleItems = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High quality wireless headphones with noise cancellation.',
    price: '$99.99',
    image: 'https://via.placeholder.com/200x150?text=Headphones',
  },
  {
    id: 2,
    name: 'Smartwatch',
    description: 'Fitness smartwatch with heart-rate tracking.',
    price: '$149.99',
    image: 'https://via.placeholder.com/200x150?text=Smartwatch',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with powerful sound.',
    price: '$39.99',
    image: 'https://via.placeholder.com/200x150?text=Speaker',
  },
];

const ItemList = () => {
  return (
    <div className="item-list-container">
      <h1>Our Products</h1>
      <div className="items-grid">
        {sampleItems.map(item => (
          <div className="item-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <strong>{item.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
