import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, getItemById } from '../api/calls';
import { Order, FullOrder, CartSimpleItem, CartItemDetails } from '../objects/Types';

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [fullOrders, setFullOrders] = useState<FullOrder[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await getOrders();

        if (ordersResponse !== null) {
          setOrders(ordersResponse.orders);

          const fullOrdersData: FullOrder[] = await Promise.all(
            ordersResponse.orders.map(async (order) => {
              const items: CartSimpleItem[] = [];

              for (const cartDetails of Object.entries(order.cart.items)) {
                const itemId = cartDetails[0];
                const quantity = (cartDetails[1] as unknown as CartItemDetails).amount;

                // Fetch item details for the itemId
                const item = await getItemById(itemId);

                if (item) {
                  items.push({
                    name: item.name,
                    amount: quantity,
                    price: item.price,
                  });
                }
              }

              return {
                created: order.created,
                price: order.price,
                items,
              };
            })
          );

          setFullOrders(fullOrdersData);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="order-page-container">
      <h1>Your Orders</h1>
      <div className="order-list">
        {fullOrders.map((fullOrder) => (
          <div key={fullOrder.created} className="order-card">
            <div className="order-items">
            <div className="order-header">
              <span className="order-date">{formatTimestamp(fullOrder.created as unknown as number)} </span>
              <span className="order-total">
                Total: ${fullOrder.price.toFixed(2)}:
              </span>
            </div>
              <ul>
                {fullOrder.items.map((item, index) => (
                  <li key={index}>
                    Name: {item.name}, Amount: {item.amount}, Price: ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <Link to="/items">
          <button className="cart-button">Go to Items</button>
        </Link>
        <Link to="/cart">
          <button className="cart-button">Go to Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderPage;
