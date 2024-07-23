import express from "express";
import { authController } from "../controllers/authControllers";

export const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.create);
authRouter.get("/login/google", authController.loginWithGoogle);
