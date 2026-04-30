import express from "express";
import { Booking } from "../models/Booking.js";
import { requireAuth } from "../middleware/auth.js";
import { serializeBooking } from "../utils/auth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).sort({ bookedAt: -1, createdAt: -1 });
    return res.json({
      bookings: bookings.map(serializeBooking),
    });
  } catch (error) {
    console.error("Fetch bookings error", error);
    return res.status(500).json({ message: "We could not load your bookings right now." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { movie, theatre, showTime, seats, totalPrice } = req.body;

    if (!movie?.title || !theatre?.name || !showTime || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "Please choose a movie, theatre, showtime, and at least one seat." });
    }

    const booking = await Booking.create({
      user: req.userId,
      bookingCode: `MVX${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`,
      movie: {
        id: movie.id,
        title: movie.title,
        genre: movie.genre,
        language: movie.language,
        duration: movie.duration,
        rating: movie.rating,
        votes: movie.votes,
        poster: movie.poster,
      },
      theatre: {
        id: theatre.id,
        name: theatre.name,
        location: theatre.location,
        pricePerSeat: theatre.pricePerSeat,
      },
      showTime,
      seats,
      totalPrice,
      bookedAt: new Date(),
    });

    return res.status(201).json({
      booking: serializeBooking(booking),
    });
  } catch (error) {
    console.error("Create booking error", error);
    return res.status(500).json({ message: "We could not confirm your booking right now." });
  }
});

export default router;
