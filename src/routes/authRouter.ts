import express from "express";

// created by Nicola
import { authController } from "../controllers/authControllers";
// created by Irham
import { handleLoginJWT, handleLoginWithGoogle, handleRegister, handleLogout } from "../controllers/authControllers";

export const authRouter = express.Router();

// created by Nicola
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.create);
authRouter.get("/login/google", authController.loginWithGoogle);

// created by Irham
authRouter.post("/login", handleLoginJWT);
authRouter.post("/login/google", handleLoginWithGoogle);
authRouter.post("/register", handleRegister);
authRouter.get("/logout", handleLogout);