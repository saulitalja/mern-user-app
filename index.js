require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas yhteys
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Käyttäjämalli
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// POST-reitti käyttäjän tallentamiseen
app.post('/api/users', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = new User({ firstName, lastName });
    await user.save();
    res.status(201).json({ message: 'User saved successfully!' });
    console.log('Sauli was here too!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user.' });
  }
});

// GET-reitti käyttäjien hakemiseen
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// Palvelimen käynnistys
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
