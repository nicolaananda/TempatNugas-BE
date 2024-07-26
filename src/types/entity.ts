import { Schema, Document } from "mongoose";

// Tipe untuk User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  role: string;
}

// Tipe untuk Session
export interface ISession extends Document {
  userId: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipe untuk Event
export interface IEvent extends Document {
  title: string;
  description: string;
  dateTime: string;
  userId: Schema.Types.ObjectId;
  workplaceId: Schema.Types.ObjectId;
}
