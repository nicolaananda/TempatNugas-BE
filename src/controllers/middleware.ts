import { Request, Response, NextFunction } from "express";

// Contoh middleware untuk logging atau pengaturan lain yang diperlukan untuk semua rute
export function generalMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`Request method: ${req.method}, Request URL: ${req.url}`);
    // Logika tambahan lainnya
    next();
}
