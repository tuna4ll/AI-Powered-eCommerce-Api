const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Tensor } = require('@tensorflow/tfjs-node');
const app = express();
const port = 3000;
const config = require("./config.json")
app.use(express.json());

mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true });

const Product = mongoose.model('Product', {
  name: String,
  price: Number,
  description: String,
  category: String,
});

const Cart = mongoose.model('Cart', {
  userId: String,
  items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
});

const Order = mongoose.model('Order', {
  userId: String,
  items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
});

const UserPurchaseHistory = mongoose.model('UserPurchaseHistory', {
  userId: String,
  purchases: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
});

const SECRET_KEY = config.secretKey;

function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', authenticate, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

app.get('/cart', authenticate, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart);
});

app.post('/cart', authenticate, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  
  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [] });
  }

  const productInCart = cart.items.find(item => item.productId.toString() === productId);
  
  if (productInCart) {
    productInCart.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

app.post('/orders', authenticate, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  let totalAmount = 0;
  const items = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      totalAmount += product.price * item.quantity;
      items.push({ productId: product._id, quantity: item.quantity });
    }
  }

  const order = new Order({
    userId: req.user.id,
    items,
    totalAmount,
    status: 'pending',
  });

  await order.save();
  res.json(order);
});

app.get('/orders', authenticate, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

function recommendProducts(userId) {
  // Placeholder for real recommendation logic (makine öğrenmesi modeli buraya entegre edilebilir)
  return Product.find({ category: 'electronics' }); // Örnek: Tüm elektronik ürünleri öner
}

app.get('/recommendations', authenticate, async (req, res) => {
  const { userId } = req.user;
  const userHistory = await UserPurchaseHistory.findOne({ userId });

  if (!userHistory) {
    return res.status(404).json({ message: 'User purchase history not found' });
  }

  const recommendedProducts = await recommendProducts(userId);
  res.json(recommendedProducts);
});

app.listen(port, () => {
  console.log(`E-commerce API with AI-powered Recommendations running on http://localhost:${port}`);
});
