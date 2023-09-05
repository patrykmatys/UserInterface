import React, { useState, useEffect } from 'react';
import { Category } from '../objects/Types';
import { Item } from '../objects/Types';
import { getItems } from '../api/calls';

const categories: Category[] = [
  { id: 'b09d3b53-4e54-43da-9131-cab595f9c8d1', name: 'T-shirts' },
  { id: 'd5e9f6ca-0fc4-46f4-8784-e1998c20fc2e', name: 'Jeans' },
  // Add more categories here
];

const Items: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems();
      if (fetchedItems !== null) {
        setItems(fetchedItems);
      }
    };

    fetchItems(); // Call the async function on page load
  }, []); // Empty dependency array ensures this runs only on page load


  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (item: Item) => {
    const items = await getItems()
    console.log(items)
    setCart([...cart, item]);
  };

  return (
    <div>
      <h1>Items Page</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category picker */}
      <select
        value={selectedCategory ? selectedCategory.id : ''}
        onChange={(e) =>
          handleCategoryChange(
            categories.find((category) => category.id === e.target.value) || null
          )
        }
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Item list */}
      <div className="item-list">
        {items
          .filter((item) =>
            selectedCategory ? item.category === selectedCategory.name : true
          )
          .filter((item) =>
            searchTerm
              ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
              : true
          )
          .map((item) => (
            <div key={item.id} className="item">
              <h2>{item.name}</h2>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>id: {item.id}</p>
              <img
                src={require(`../images/${item.id}.jpg`)}
                alt={item.name}
                className="item-image"
              />
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))}
      </div>

      {/* Cart button */}
      <button onClick={() => console.log(cart)}>
        Go to Cart ({cart.length} items)
      </button>
    </div>
  );
};

export default Items;
