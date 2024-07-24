import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRouter";
import { workplaceRouter } from "./routes/workplaceRouter";

dotenv.config();

if (!process.env.MONGODB_URL) {
  console.error("Error: MONGODB_URL is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Mongo connection error:", err.message));

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 7001;

app.use(cors());
app.use(cookieParser());
app.use(express.json()); // read JSON
app.use(express.urlencoded({ extended: true })); // read formData
app.use("/public", express.static("public"));

// Routers
app.use("/auth", authRouter);
app.use("/workplaces", workplaceRouter);

// Root route
app.get("/", (req, res) => res.json({ message: "Hello World!" }));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
