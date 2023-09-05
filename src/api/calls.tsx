import axios from 'axios';
import { Item } from '../objects/Types';

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Replace with your API base URL

export const getObjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hello/test`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const authenticate = async (email: String, password: String) => {
  const requestBody = {
    email: email,
    password: password,
  };

  console.log(email)
  console.log(password)

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