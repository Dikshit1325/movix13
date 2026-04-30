import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      default: null,
    },
    picture: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
      default: null,
    },
    providers: {
      type: [String],
      enum: ["local", "google"],
      default: ["local"],
    },
    primaryProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
