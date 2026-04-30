import mongoose from "mongoose";

const movieSnapshotSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    genre: String,
    language: String,
    duration: String,
    rating: Number,
    votes: String,
    poster: String,
  },
  { _id: false },
);

const theatreSnapshotSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    location: String,
    pricePerSeat: Number,
  },
  { _id: false },
);

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    bookingCode: {
      type: String,
      required: true,
      unique: true,
    },
    movie: {
      type: movieSnapshotSchema,
      required: true,
    },
    theatre: {
      type: theatreSnapshotSchema,
      required: true,
    },
    showTime: {
      type: String,
      required: true,
    },
    seats: {
      type: [String],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model("Booking", bookingSchema);
