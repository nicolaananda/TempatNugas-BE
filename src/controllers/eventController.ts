import { Request, Response } from "express";
import { Event } from "../models/eventModel";

export const eventController = {
  // Buat event baru
  createEvent: async (req: Request, res: Response) => {
    try {
      console.log("createEvent function called"); // Logging untuk debugging
      const { title, description, dateTime, userId, workplaceId } = req.body;
      console.log(title, description, dateTime, userId, workplaceId);

      const createEvent = new Event({
        title,
        description,
        dateTime,
        userId,
        workplaceId,
      });

      const savedEvent = await createEvent.save();
      console.log(savedEvent);

      return res.status(201).json({
        message: "User has successfully posted a new event",
        data: savedEvent,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to post a new event",
        data: null,
      });
    }
  },

  //  semua event
  allEvents: async (req: Request, res: Response) => {
    console.log("allEvents function called");
    try {
      const events = await Event.find()
        .populate("userId", "name avatarUrl")
        .populate("workplaceId", "name address");

      res.status(200).json({
        message: "Successfully retrieved all events",
        data: events,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to retrieve events",
        data: null,
      });
    }
  },

  // delete single event
  deleteEvent: async (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;

      const deletedEvent = await Event.findOneAndDelete({
        _id: eventId,
      });
      if (!deletedEvent) {
        return res
          .status(404)
          .json({ status: 404, message: "Event not found" });
      }

      return res
        .status(200)
        .json({ status: 200, message: "Event deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Event deleting review", error });
    }
  },

  //   event tunggal berdasarkan ID
  eventSingle: async (req: Request, res: Response) => {
    console.log("eventSingle function called");

    try {
      const { id: eventId } = req.params;
      const event = await Event.findById({ _id: eventId })
        .populate("userId", "name avatarUrl")
        .populate("workplaceId", "name address");
      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
      }
      return res.json(event);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve the event",
        data: null,
      });
    }
  },
};
