import { Request, Response } from "express";
import { Review } from "../models/reviewSchema";

export const reviewController = {
  getReviews: async (req: Request, res: Response) => {
    try {
      const { id: workplaceId } = req.params;
      const reviews = await Review.find({ workplaceId });
      return res.status(200).json({
        status: 200,
        message: "Successfully delivered reviews",
        data: reviews,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Error fetching reviews", error });
    }
  },

  getReview: async (req: Request, res: Response) => {
    try {
      const { id: workplaceId, reviewId } = req.params;
      const review = await Review.findOne({ _id: reviewId, workplaceId });
      if (!review) {
        return res
          .status(404)
          .json({ status: 404, message: "Review not found" });
      }
      return res.status(200).json({
        status: 200,
        message: "Successfully delivered review",
        data: review,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Error fetching review", error });
    }
  },

  createReview: async (req: Request, res: Response) => {
    try {
      const { workplaceId } = req.params;
      const { content, internet, electricity, userId, workplaceID } = req.body;

      const newReview = new Review({
        workplaceId,
        content,
        internet,
        electricity,
        userId,
        workplaceID,
      });

      const savedReview = await newReview.save();
      return res.status(201).json({
        status: 201,
        message: "User has successfully posted a new review",
        data: savedReview,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Failed to post a new review", error });
    }
  },

  updateReview: async (req: Request, res: Response) => {
    try {
      const { id: workplaceId, reviewId } = req.params;
      const { content, internet, electricity } = req.body;

      const updatedReview = await Review.findOneAndUpdate(
        { _id: reviewId, workplaceId },
        { content, internet, electricity },
        { new: true }
      );

      if (!updatedReview) {
        return res
          .status(404)
          .json({ status: 404, message: "Review not found" });
      }

      return res.status(200).json({
        status: 200,
        message: "Review updated successfully",
        data: updatedReview,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Error updating review", error });
    }
  },

  deleteReview: async (req: Request, res: Response) => {
    try {
      const { id: workplaceId, reviewId } = req.params;

      const deletedReview = await Review.findOneAndDelete({
        _id: reviewId,
        workplaceId,
      });
      if (!deletedReview) {
        return res
          .status(404)
          .json({ status: 404, message: "Review not found" });
      }

      return res
        .status(200)
        .json({ status: 200, message: "Review deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Error deleting review", error });
    }
  },
};
