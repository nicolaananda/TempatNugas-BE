import express from "express";
import { handleLoginJWT, handleLoginSession, handleRegister, handleLogout } from "../controllers/authControllers";

const authRouter = express.Router();

authRouter.post("/login", handleLoginSession);
authRouter.post("/register", handleRegister);
authRouter.get("/logout", handleLogout);

export { authRouter };
