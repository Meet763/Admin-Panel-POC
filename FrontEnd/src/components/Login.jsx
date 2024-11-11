import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Use navigate hook at the top level

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the backend login endpoint
      const response = await axios.post(
        'http://localhost:3000/admin/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // This ensures cookies are included in requests
        }
      );

      if (response.status === 200) {
        // Login successful, handle success (e.g., redirect to dashboard)
        console.log('Login successful:', response.data);
        // Use navigate here after the login is successful
        navigate('/dashboard'); // Correct way to use navigate
      } else {
        setError(response.data.error || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
