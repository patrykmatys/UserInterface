// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authenticate } from '../api/calls';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const LoginInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
`;

const LoginButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await authenticate(username, password)
    if (response !== null) {
        localStorage.setItem('jwtToken', response);
        localStorage.setItem('username', username);
        navigate("/items");
    } else {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        window.alert("Wrong password or username")
    }
  };

  return (
    <LoginContainer>
      <h1>Login Page</h1>
      <LoginForm>
        <LoginInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="button" onClick={handleLogin}>Login</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
