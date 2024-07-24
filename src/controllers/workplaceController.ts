import { Request, Response } from "express";
import { Workplace } from "../models/workplaceSchema";

export const workplaceController = {
  getData: async (req: Request, res: Response) => {
    try {
      const { search } = req.query;

      const CLAUSES = search
        ? {
            $or: [
              { name: { $regex: search as string, $options: "i" } },
              { address: { $regex: search as string, $options: "i" } },
              { city: { $regex: search as string, $options: "i" } },
            ],
          }
        : {};

      const allWorkplaces = await Workplace.find(CLAUSES);
      return res.json(allWorkplaces);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching Workplaces", error });
    }
  },

  createData: async (req: Request, res: Response) => {
    try {
      const { name, description, address, city, authorId } = req.body;

      const createWorkplace = new Workplace({
        name,
        description,
        address,
        city,
        file: req.file?.originalname || "",
        authorId,
        isPublished: false,
        isVerified: false,
      });

      const saved = await createWorkplace.save();
      return res.json({ message: "Workplace added", data: saved });
    } catch (error) {
      return res.status(500).json({ message: "Error adding Workplace", error });
    }
  },

  workplaceSingle: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const workplace = await Workplace.findById(id);
      if (!workplace) {
        return res.status(404).json({ message: "Workplace not found" });
      }
      return res.json(workplace);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching workplace", error });
    }
  },

  deleteData: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const workplace = await Workplace.findByIdAndDelete(id);
      if (!workplace) {
        return res.status(404).json({ message: "Workplace not found" });
      }
      return res.json({ message: "Workplace deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting Workplace", error });
    }
  },
};
