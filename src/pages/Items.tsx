import React, { useState, useEffect } from 'react';
import { CartRequest, Category } from '../objects/Types';
import { Item } from '../objects/Types';
import { addToCart, getItems, getCart } from '../api/calls';
import { useNavigate } from 'react-router-dom';
import '../styles/Items.css';

const categories: Category[] = [
  { id: 'b09d3b53-4e54-43da-9131-cab595f9c8d1', name: 'T-shirts' },
  { id: 'd5e9f6ca-0fc4-46f4-8784-e1998c20fc2e', name: 'Jeans' },
  { id: 'f57e5b5f-9bfc-4006-89f9-38aa8e9c0e9f', name: 'Dresses'},
  { id: 'b69e4c97-18c1-4a9f-9e8a-890374d26f69', name: 'Sweaters'},
  { id: '73ab51b3-11c4-4135-b8c0-43be41b31904', name: 'Athletic Wear'},
  { id: 'f5c84744-7162-416b-96e6-7c65c0e496f3', name: 'Outerwear'},
  { id: '0cafd2d7-7d10-4ab5-8eeb-2fb32bf779b3', name: 'Formal Wear'},
  { id: '9e19ee58-3633-4e3e-aae3-8287b101d8e2', name: 'Lingerie'},
  { id: '179cd0a7-1347-4f5b-9bc0-13c53630d00e', name: 'Swimwear'},
  { id: 'ced2ce1a-0cde-4da0-8315-93a17f38386e', name: 'Active Wear'}
];

const Items: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [quantities, setQuantities] = useState<{ [itemId: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems();
      if (fetchedItems !== null) {
        setItems(fetchedItems);
      }
    };

    fetchItems();
  }, []);

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (item: Item) => {
    const cnt = quantities[item.id] || 1
    const requestBody: CartRequest = {
      user: localStorage.getItem("username")!,
      itemId: item.id,
      quantity: cnt
    };

    const response = await addToCart(requestBody);

    if (response !== null) {
      window.alert(`Sucessfuly added ${cnt} ${item.name} to cart.`)
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  return (
    <div className="items-container">
      <h1 className="title">Items List</h1>

      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="category-select"
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
      </div>

      <div className="item-list">
  {items
    .filter((item) =>
      selectedCategory ? item.category.some((category) => category.id === selectedCategory.id) : true
    )
    .filter((item) =>
      searchTerm
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .map((item) => (
      <div key={item.id} className="item-card">
        <img
          src={require(`../images/${item.id}.jpg`)}
          alt={item.name}
          className="item-image"
        />
        <div className="item-details">
          <h2 className="item-name">{item.name}</h2>
          <p className="item-price">Price: ${item.price.toFixed(2)}</p>
        </div>
        <div className="add-to-cart">
          <div className="quantity-container">
            <button
              className="quantity-button"
              onClick={() =>
                handleQuantityChange(item.id, (quantities[item.id] || 1) - 1)
              }
            >
              -
            </button>
            <span className="quantity-input">{quantities[item.id] || 1}</span>
            <button
              className="quantity-button"
              onClick={() =>
                handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)
              }
            >
              +
            </button>
          </div>
          <button
            className="add-to-cart-button"
            onClick={() => handleAddToCart(item)}
          >
            Add
          </button>
        </div>
      </div>
    ))}
</div>

      <button className="cart-button" onClick={() => navigate("/cart")}>
        Go to Cart
      </button>
      <button className="orders-button" onClick={() => navigate("/orders")}>
        Go to Order History
      </button>
    </div>
  );
};

export default Items;