import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  content: { type: String, required: true },
  electricity: { type: Number, required: true, min: 0, max: 5 },
  internet: { type: Number, required: true, min: 0, max: 5 },
  userId: { type: String, required: true },
  workplaceId: { type: String },
});

export const Review = mongoose.model("Review", reviewSchema);
