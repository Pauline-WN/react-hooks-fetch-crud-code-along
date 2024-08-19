// src/components/ItemForm.js
import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const newItem = {
        id: Date.now(), // Unique id for the new item
        name,
        category,
        isInCart: false, // Default value for isInCart
      };
      onAddItem(newItem); // Pass the new item to the parent component
      setName(""); // Clear the name input field
      setCategory("Produce"); // Reset category to default
    }
  };

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required // Ensure a name is provided
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>
      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
