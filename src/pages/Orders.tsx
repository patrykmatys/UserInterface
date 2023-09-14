import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api/calls';
import { OrderHistory, Order } from '../objects/Types';

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await getOrders();

        if (ordersResponse !== null) {
          setOrders(ordersResponse.orders);
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
        {orders.map((order) => (
          <div key={order.created} className="order-card">
            <div className="order-header">
              <span className="order-date">{formatTimestamp(order.created as unknown as number)} </span>
              <span className="order-total">
                Total: ${order.price.toFixed(2)}
              </span>
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
