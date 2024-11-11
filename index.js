// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import models from the consolidated fruits.js file
const { Fruit, Vegetable, Cart } = require('./backend/fruits');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from the React frontend
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form submissions
app.set('view engine', 'ejs'); // Set EJS as templating engine
app.set('views', path.join(__dirname, 'views')); // Set views directory



// Fetch all fruits
app.get('/api/fruits', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json(fruits);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fruits' });
  }
});

// Fetch all vegetables
app.get('/api/vegetables', async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.json(vegetables);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vegetables' });
  }
});

// Add item to cart
app.post('/api/add-to-cart', async (req, res) => {
  const { name, img, price } = req.body;

  try {
    // Check if the item already exists in the cart
    let cartItem = await Cart.findOne({ name });

    if (cartItem) {
      // If it exists, increment the quantity
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // If it doesn't exist, add it as a new entry
      cartItem = new Cart({ name, img, price, quantity: 1 });
      await cartItem.save();
    }

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// Render the cart page with items
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.render('cart', { cartItems });
  } catch (error) {
    res.status(500).send('Error loading cart');
  }
});

// Delete item from the cart by ID
app.get('/delete-cart-item/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.redirect('/cart');
  } catch (error) {
    res.status(500).send('Error deleting item from cart');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
