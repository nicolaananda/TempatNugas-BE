import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { workplaceRouter } from "./routes/workplaceRouter";
import { authRouter } from "./routes/authRouter";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log("connected to mongo"))
  .catch(() => console.error("Monggo connection error"));
console.log(process.env.MONGODB_URL);
const app = express();
const PORT = 7001;
app.use(express.json()); //read json
app.use(express.urlencoded({ extended: true })); //read formData
app.use(express.static("public"));

app.use("/workplaces", workplaceRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => res.json({ message: "Hello World!" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
