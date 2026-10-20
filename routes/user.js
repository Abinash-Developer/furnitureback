const express = require('express');
const Router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'furniture_secret_key';
const bycrypt = require('bcrypt');

Router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id },JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

Router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
            if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', result: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = Router;