const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Model
const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json("User already exists");

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash
    });

    await user.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// JWT Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Protected Route
app.get("/dashboard", auth, (req, res) => {
  res.json({ message: "Welcome user", userId: req.user.id });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});