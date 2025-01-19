//import logo from './logo.svg';
//import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Käsittele lomakekenttien muutokset
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Lähetä tiedot backendille
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', formData);
      console.log('Sauli was here!');
      setMessage(response.data.message);
      setFormData({ firstName: '', lastName: '' });
      fetchUsers(); // Päivitä käyttäjälista
    } catch (error) {
      setMessage('Error: Could not save user.');
    }
  };

  // Hae kaikki käyttäjät
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Save User</button>
      </form>
      <p>{message}</p>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

