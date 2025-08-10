// Auth controller: register, login (auto-register if user not found), me
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register endpoint (explicit register)
exports.register = async (req, res) => {
  try {
    const { name = '', email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = generateToken(user._id);
    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login endpoint.
// BEHAVIOR: If user not found -> auto-register and return a token.
// If user exists -> verify password and return token.
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    let user = await User.findOne({ email });

    if (!user) {
      // Auto-register
      const hashed = await bcrypt.hash(password, 10);
      user = await User.create({ name: email.split('@')[0], email, password: hashed });

      const token = generateToken(user._id);
      return res.status(201).json({
        message: "User auto-registered and logged in",
        token,
        user: { id: user._id, email: user.email, name: user.name }
      });
    }

    // User exists -> check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Me endpoint -> returns user profile (without password)
exports.me = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: 'Not authenticated' });
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
