import express from "express";
import { handleLoginJWT, handleLoginWithGoogle, handleRegister, handleLogout } from "../controllers/authControllers";

const authRouter = express.Router();

authRouter.post("/login", handleLoginJWT);
authRouter.post("/login/google", handleLoginWithGoogle);
authRouter.post("/register", handleRegister);
authRouter.get("/logout", handleLogout);

export { authRouter };
