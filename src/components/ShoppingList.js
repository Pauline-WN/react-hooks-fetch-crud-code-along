// src/components/ShoppingList.js
import React, { useEffect, useState } from "react";
import Item from "./Item"; // Assuming you have an Item component
import ItemForm from "./ItemForm"; // Assuming you have an ItemForm component
import Filter from "./Filter"; // Assuming you have a Filter component

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => {
        if (isMounted) {
          setItems(items);
        }
      });

    return () => {
      isMounted = false; // Cleanup function to set the flag to false
    };
  }, []);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
