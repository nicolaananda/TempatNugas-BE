import express from "express";
import { eventController } from "../controllers/eventController";

export const eventRouter = express.Router();

// Rute untuk membuat event
eventRouter.post("/create", eventController.createEvent);

// Rute untuk mendapatkan semua event
eventRouter.get("/", eventController.allEvents);

// Rute untuk mendapatkan event tunggal berdasarkan ID
eventRouter.get("/:id", eventController.eventSingle);

// Rute untuk menghapus event tunggal berdasarkan ID
eventRouter.delete("/:id", eventController.deleteEvent);
