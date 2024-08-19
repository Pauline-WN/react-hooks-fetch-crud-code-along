// src/components/Item.js
import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Toggle the cart status of the item
  const handleToggleCart = () => {
    onUpdateItem({
      ...item,
      isInCart: !item.isInCart,
    });
  };

  // Delete the item
  const handleDelete = () => {
    onDeleteItem(item);
  };

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleToggleCart}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Item;
