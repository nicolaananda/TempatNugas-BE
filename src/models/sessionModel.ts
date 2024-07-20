import { Schema, model } from "mongoose";
import { ISession } from "../types/entity";

const sessionSchema = new Schema<ISession>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    createdAt: { type: Date, default: Date.now, expires: '1h' }
}, { timestamps: true });

const Session = model<ISession>("Session", sessionSchema);

export { Session, ISession };
