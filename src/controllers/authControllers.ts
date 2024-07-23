import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel";
import { Session } from "../models/sessionModel";
import { IUser } from "../types/entity"; // Impor interface IUser dari entity

dotenv.config();

// Register
export async function handleRegister(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ status: 400, message: "Please provide all required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: 409, message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ status: 201, message: "User has successfully created a new account" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ status: 500, message: "User registering error", error: err.message });
    }
}

// Login with JWT
export async function handleLoginJWT(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ status: 400, message: "Please provide email and password" });
        }

        const user = await User.findOne({ email }) as IUser | null;

        if (!user) {
            return res.status(404).json({ status: 404, message: "Account not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({ status: 403, message: "Login error due to invalid password" });
        }

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true }).json({
            status: 200,
            message: "User login successfully",
            data: {
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                role: user.role
            }
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ status: 500, message: "User login error", error: err.message });
    }
}

export async function handleLogout(req: Request, res: Response) {
    const session_id = req.cookies?.session_id;

    try {
        if (session_id) {
            await Session.findByIdAndDelete(session_id);
            res.clearCookie("session_id");
        }
        res.json({ status: 200, message: "Logout Success!" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ status: 500, message: "Logout error", error: err.message });
    }
}

// export async function handleLoginWithGoogle(req: Request, res: Response) {
//     const state = generateState(); // SHA256
//     const code = generateCodeVerifier();

//     const url = await google.createAuthorizationURL(state, code, {
//         scopes: ["email", "profile"],
//     });

//     console.log(url.href)
// }