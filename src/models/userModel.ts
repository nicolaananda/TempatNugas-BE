import { Schema, model } from "mongoose";
import { IUser } from "../types/entity";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    role: { type: String, default: 'user' },
}, { timestamps: true });

export const User = model<IUser>("User", userSchema);
