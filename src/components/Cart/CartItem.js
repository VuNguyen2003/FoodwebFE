// src/components/Cart/CartItem.js
import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{item.product.name}</h5>
        <p className="card-text">Quantity: {item.quantity}</p>
        <p className="card-text">Price: {item.price}</p>
        {/* Add more item details as needed */}
      </div>
    </div>
  );
};

export default CartItem;
