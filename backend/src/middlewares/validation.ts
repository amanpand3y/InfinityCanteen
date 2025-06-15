import { Request, Response, NextFunction } from "express";

export const validateMyUserRequest = (req: Request, res: Response, next: NextFunction) => {
    const { name, hostel, roomno, Phone } = req.body;
    
    const errors: string[] = [];
    if (!name || typeof name !== "string") {
        errors.push("Name must be a string");
    }

    if (!hostel || typeof hostel !== "string") {
        errors.push("Hostel must be a string");
    }

    if (!roomno || !Number.isInteger(roomno)) {
        errors.push("Roomno must be an integer");
    }

    if (!Phone || typeof Phone !== "string") {
        errors.push("Phone must be a string");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};
