import express from "express";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { Booking } from "../models/Booking.js";
import { User } from "../models/User.js";
import { config } from "../config.js";
import { requireAuth } from "../middleware/auth.js";
import { createToken, serializeUser } from "../utils/auth.js";

const router = express.Router();
const googleClient = new OAuth2Client(config.googleClientId || undefined);

function normalizeEmail(email = "") {
  return email.trim().toLowerCase();
}

router.post("/register", async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = normalizeEmail(req.body.email);
    const password = req.body.password ?? "";

    if (!name || !email || password.length < 6) {
      return res.status(400).json({ message: "Please provide your name, email, and a password with at least 6 characters." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      providers: ["local"],
      primaryProvider: "local",
    });

    return res.status(201).json({
      token: createToken(user),
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Register error", error);
    return res.status(500).json({ message: "We could not create your account right now." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = req.body.password ?? "";

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({
      token: createToken(user),
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ message: "We could not sign you in right now." });
  }
});

router.post("/google", async (req, res) => {
  try {
    if (!config.googleClientId) {
      return res.status(500).json({ message: "Google auth is not configured yet. Add GOOGLE_CLIENT_ID to your environment." });
    }

    const credential = req.body.credential ?? "";
    if (!credential) {
      return res.status(400).json({ message: "Google credential is required." });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    if (!payload?.email || !payload.sub || !payload.name) {
      return res.status(401).json({ message: "We could not verify your Google account." });
    }

    const email = normalizeEmail(payload.email);
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email,
        picture: payload.picture ?? "",
        googleId: payload.sub,
        providers: ["google"],
        primaryProvider: "google",
      });
    } else {
      const providers = new Set(user.providers ?? []);
      providers.add("google");
      user.name = user.name || payload.name;
      user.picture = payload.picture ?? user.picture;
      user.googleId = payload.sub;
      user.providers = Array.from(providers);
      user.primaryProvider = "google";
      await user.save();
    }

    return res.json({
      token: createToken(user),
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Google auth error", error);
    return res.status(401).json({ message: "Google sign-in failed. Please try again." });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const bookingsCount = await Booking.countDocuments({ user: user._id });

    return res.json({
      user: serializeUser(user, { bookingsCount }),
    });
  } catch (error) {
    console.error("Profile error", error);
    return res.status(500).json({ message: "We could not load your profile right now." });
  }
});

export default router;
