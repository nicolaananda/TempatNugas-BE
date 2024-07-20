import { Request, Response, NextFunction } from "express";
import { Session } from "../models/sessionModel";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionId = req.cookies?.session_id;

        if (!sessionId) {
            return res.status(401).json({
                message: "Kamu tidak memiliki session, sehingga tidak memiliki akses!"
            });
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(401).json({
                message: "Kamu tidak memiliki session, sehingga tidak memiliki akses!"
            });
        }

        // Lanjutkan ke middleware berikutnya
        next();
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: err.message,
        });
    }
}
