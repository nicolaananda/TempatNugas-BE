import express from "express";
import testRouter from "./routes/test";

const app = express();

app.use("/api/v1/test", testRouter);

app.get("/", (req, res) =>
  res.json({ message: "Pesan dari backend, terimakasih" })
);

app.listen(7000, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:7000`);
});
