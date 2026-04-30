import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function createToken(user) {
  return jwt.sign({ userId: user._id.toString() }, config.jwtSecret, {
    expiresIn: "7d",
  });
}

export function serializeUser(user, extra = {}) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    picture: user.picture ?? "",
    providers: user.providers ?? [],
    primaryProvider: user.primaryProvider ?? "local",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    ...extra,
  };
}

export function serializeBooking(booking) {
  return {
    id: booking._id.toString(),
    bookingCode: booking.bookingCode,
    movie: booking.movie,
    theatre: booking.theatre,
    showTime: booking.showTime,
    seats: booking.seats,
    totalPrice: booking.totalPrice,
    bookedAt: booking.bookedAt,
    createdAt: booking.createdAt,
  };
}
