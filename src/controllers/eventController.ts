import { Request, Response } from "express";
import { Event } from "../models/eventModel";

export const eventController = {
    // Buat event baru
    createEvent: async (req: Request, res: Response) => {
        console.log("createEvent function called"); // Logging untuk debugging
        const { title, description, dateTime, eventWorkplace, eventAddress, userId, workplaceId } = req.body;

        try {
            const createEvent = new Event({
                title,
                description,
                dateTime,
                eventWorkplace,
                eventAddress,
                userId,
                workplaceId,
            });

            const savedEvent = await createEvent.save();

            res.status(201).json({
                message: "User has successfully posted a new event",
                data: savedEvent
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to post a new event",
                data: null,
            });
        }
    },

    //  semua event
    allEvents: async (req: Request, res: Response) => {
        console.log("allEvents function called");
        try {
            const { id: workplaceId } = req.params;
            const events = await Event.find({ workplaceId }).populate("userId", "name avatarUrl");
            res.status(200).json({
                message: "Successfully retrieved all events",
                data: events
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve events",
                data: null,
            });
        }
    },

    // event tunggal berdasarkan ID
    eventSingle: async (req: Request, res: Response) => {
        console.log("eventSingle function called");
        const { id } = req.params;

        try {
            const { id: workplaceId, userId } = req.params;
            const event = await Event.findOne({ _id: id, workplaceId, userId }).populate("userId", "name avatarUrl");
            if (event) {
                res.status(200).json({
                    message: "Successfully retrieved the event",
                    data: event
                });
            } else {
                res.status(404).json({
                    message: "Event not found",
                    data: null
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve the event",
                data: null,
            });
        }
    }
};
