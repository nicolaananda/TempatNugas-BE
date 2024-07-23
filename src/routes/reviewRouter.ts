import { reviewController } from "../controllers/reviewControllers";
import express from "express";
export const reviewRouter = express.Router();

reviewRouter.get("/", reviewController.getReviews);
reviewRouter.post("/", reviewController.createReview);
reviewRouter.get("/:reviewId", reviewController.getReview);
reviewRouter.put("/:reviewId", reviewController.updateReview);
reviewRouter.delete("/:reviewId", reviewController.deleteReview);

export const workplaceRouter = express.Router();
