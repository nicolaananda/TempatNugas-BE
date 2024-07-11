import express from "express";
import { testControllers } from "../controllers/testControllers";

export const testRouter = express.Router();

// Define routes
testRouter.get("/", testControllers.getData);

export default testRouter;
