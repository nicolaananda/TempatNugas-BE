import express from "express";
import multer, { StorageEngine } from "multer";
import { workplaceController } from "../controllers/workplaceController";
import { authRouter } from "./authRouter";
import { reviewRouter } from "./reviewRouter";

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export const workplaceRouter = express.Router();

workplaceRouter.use("/", reviewRouter);

workplaceRouter.get("/", workplaceController.getData);
workplaceRouter.post("/add", upload.single("file"), workplaceController.createData);
workplaceRouter.get("/:id", workplaceController.workplaceSingle);

workplaceRouter.use("/auth", authRouter);
workplaceRouter.delete("/:id", workplaceController.deleteData);
