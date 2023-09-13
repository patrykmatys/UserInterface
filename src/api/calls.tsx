import axios from 'axios';
import { Item, CartRequest, CartResponse, OrderHistory } from '../objects/Types';

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Replace with your API base URL

export const authenticate = async (email: String, password: String) => {
  const requestBody = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/users/authenticate`, requestBody);
    console.log('Authentication Successful');
    return response.data;
  } catch (error) {
    console.error('Authentication Error:', error);
    return null;
  }
};

export const getItems = async () => {
  try {
    const response = await axios.get<Item[]>(`${API_BASE_URL}/items`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch items:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    return null;
  }
};

export const addToCart = async (cartRequest: CartRequest) => {
  try {
    const response = await axios.post<ResponseType>(`${API_BASE_URL}/cart/add`, cartRequest, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add to cart:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
};

export const getCart = async (): Promise<CartResponse | null> => {
  try {
    const response = await axios.get<CartResponse>(
      `${API_BASE_URL}/cart/${localStorage.getItem("username")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data as CartResponse;
    } else {
      console.error('Failed to fetch cart:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
};

export const getItemById = async (itemId: String) => {
  try {
    const response = await axios.get<Item>(`${API_BASE_URL}/items/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch item:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
};

export const updateItemInCart = async (cartRequest: CartRequest) => {
  try {
    const response = await axios.post<CartRequest>(`${API_BASE_URL}/cart/update`, cartRequest, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to update in cart:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    return null;
  }
};

export const addOrder = async () => {
  try {
    console.log(localStorage.getItem("username"));
    const response = await axios.post<OrderHistory>(
      `${API_BASE_URL}/order/add/${localStorage.getItem("username")}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to add order:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error adding order:', error);
    return null;
  }
};

export const getOrders = async () => {
  try {
    console.log(localStorage.getItem("username"));
    const response = await axios.get<OrderHistory>(
      `${API_BASE_URL}/order/${localStorage.getItem("username")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to get orders:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting orders:', error);
    return null;
  }
};