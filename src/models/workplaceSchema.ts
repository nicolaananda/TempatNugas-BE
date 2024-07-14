import mongoose from "mongoose";

const workplaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  file: { type: String },
  authorId: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
});

export const Workplace = mongoose.model("Workplace", workplaceSchema);
