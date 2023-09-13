import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Items from './pages/Items';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import './styles/App.css'
import './styles/index.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/items" element={<Items/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
    </Router>
  );
};

export default App;