import { Request, Response } from "express";
import { User } from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authController = {
  create: async (req: Request, res: Response) => {
    const { name, email, password, avatarUrl, role } = req.body;

    try {
      console.log("Request to create user:", { name, email });

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatarUrl,
        role: role || "user", // user otomatis menjadi default
      });

      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      console.log("Request to login user:", { email });

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ user: payload, token, message: "Login success" });
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  loginWithGoogle: async (req: Request, res: Response) => {
    const { name, email, avatarUrl } = req.body;

    try {
      // 1. Find user in DB by email
      const existingUser = await User.findOne({ email });

      // 2. If email exists, create JWT token for login
      if (existingUser) {
        const payload = {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          avatarUrl: existingUser.avatarUrl,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
          expiresIn: "1h",
        });

        return res
          .status(200)
          .json({ user: payload, token, message: "Login success" });
      }

      // 3. If email doesn't exist, register
      const newUser = new User({
        name,
        email,
        avatarUrl,
        password: "",
        role: "user",
      });

      // 4. Create user in DB
      const savedUser = await newUser.save();

      // 5. Create JWT token for login
      const payload = {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        avatarUrl: savedUser.avatarUrl,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string);

      return res.status(200).json({
        user: payload,
        token,
        message: "Registration and login success",
      });
    } catch (error) {
      console.error("Error login with Google:", error);
      return res.status(500).json({ message: " error", error });
    }
  },
};
