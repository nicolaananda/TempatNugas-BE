import { Request, Response } from "express";

export const testControllers = {
  getData: async (req: Request, res: Response) => {
    res.json({ message: "Pesan dari controllers backend, terimakasih" });
  },
};
