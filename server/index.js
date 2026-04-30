import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { connectToDatabase } from "./db.js";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookings.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled server error", err);
  res.status(500).json({ message: "Something went wrong on the server." });
});

connectToDatabase()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Movix API listening on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
