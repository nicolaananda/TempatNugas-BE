import { reviewController } from "../controllers/reviewControllers";
import express from "express";
export const reviewRouter = express.Router();

reviewRouter.get("/:id/reviews", reviewController.getReviews);
reviewRouter.post("/:id/reviews", reviewController.createReview);
reviewRouter.get("/:id/reviews/:reviewId", reviewController.getReview);
reviewRouter.put("/:id/reviews/:reviewId", reviewController.updateReview);
reviewRouter.delete("/:id/reviews/:reviewId", reviewController.deleteReview);

export const workplaceRouter = express.Router();
