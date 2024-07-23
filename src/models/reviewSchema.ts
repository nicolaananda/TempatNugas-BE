import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  foodprices: { type: String },
  file: { type: String },
  authorId: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
});

export const Review = mongoose.model("Review", reviewSchema);
