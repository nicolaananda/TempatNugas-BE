import { Schema, model } from "mongoose";
import { IEvent } from "../types/entity";

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateTime: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  workplaceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Workplace",
  },
});

export const Event = model<IEvent>("Event", eventSchema);
