import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  content: { type: String, required: true },
  electricity: { type: Number, required: true, min: 0, max: 5 },
  internet: { type: Number, required: true, min: 0, max: 5 },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  workplaceId: { type: Schema.Types.ObjectId, ref: "Workplace" },
});

export const Review = mongoose.model("Review", reviewSchema);
