import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Items from './components/Items';
import './styles/App.css'
import './styles/index.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/items" element={<Items/>} />
      </Routes>
    </Router>
  );
};

export default App;