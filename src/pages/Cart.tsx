import React, { useState, useEffect } from 'react';
import { getCart, getItemById, updateItemInCart, addOrder } from '../api/calls';
import { CartItem, CartRequest } from '../objects/Types';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState<{ [itemId: string]: number }>({});
  const navigate = useNavigate();

  const fetchCart = async () => {
    const cartResponse = await getCart();
    if (cartResponse !== null) {
      const itemsWithDetails: CartItem[] = await Promise.all(
        Object.keys(cartResponse.items).map(async (itemId) => {
          const item = await getItemById(itemId);
          return {
            id: itemId,
            name: item!.name,
            quantity: cartResponse.items[itemId],
            price: item!.price,
          };
        })
      );

      const filteredItems: CartItem[] = itemsWithDetails.filter((item) => item !== null);
      setCartItems(filteredItems);

      const total = filteredItems.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.price * currentItem.quantity,
        0
      );
      setTotalPrice(total);

      const quantityMap: { [itemId: string]: number } = {};
      itemsWithDetails.forEach((item) => {
        quantityMap[item.id] = item.quantity;
      });
      setQuantities(quantityMap);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateItem = async (itemId: string, quantity: number) => {
    const requestBody: CartRequest = {
        user: localStorage.getItem("username")!,
        itemId: itemId,
        quantity: quantity
      };

    await updateItemInCart(requestBody);
    fetchCart()
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleOrder = async () => {
    await addOrder()
    window.alert("Successfully created new order")
    navigate("/orders");
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="item-list">
        {cartItems.map((item) => (
          <div key={item.id} className="item-card">
            <img
              src={require(`../images/${item.id}.jpg`)}
              alt={item.name}
              className="item-image"
            />
            <div className="item-details">
              <h2 className="item-name">{item.name}</h2>
              <p className="item-price">Price: ${item.price.toFixed(2)}</p>
              <div className="item-quantity">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(item.id, quantities[item.id] - 1)}
                >
                  -
                </button>
                <span>{quantities[item.id]}</span>
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(item.id, quantities[item.id] + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="item-actions">
              <button
                className="cart-button"
                onClick={() => handleUpdateItem(item.id, quantities[item.id])}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="total-price">
        Total: ${calculateTotalPrice().toFixed(2)}
      </div>

      <div className="navigation-buttons">
        <button className="cart-button" onClick={() => navigate('/items')}>
          Continue Shopping
        </button>
        <button className="cart-button" onClick={() => navigate("/orders")}>
          Go to orders
        </button>
        <button className="cart-button" onClick={handleOrder}>
          Place an order
        </button>
      </div>
    </div>
  );
};

export default Cart;
