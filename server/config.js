import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/movix",
  jwtSecret: process.env.JWT_SECRET ?? "movix-dev-secret",
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? process.env.VITE_GOOGLE_CLIENT_ID ?? "",
};
