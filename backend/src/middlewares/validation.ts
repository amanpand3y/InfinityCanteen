import { Request, Response, NextFunction } from "express";

export const validateMyUserRequest = (req: Request, res: Response, next: NextFunction) => {
    const { name, hostel, roomno, phone } = req.body;
    
    const errors: string[] = [];
    if (!name || typeof name !== "string") {
        errors.push("Name must be a string");
    }

    if (!hostel || typeof hostel !== "string") {
        errors.push("Hostel must be a string");
    }

    
    if (
        typeof roomno !== "string" ||           
        isNaN(Number(roomno)) ||                
        !Number.isInteger(Number(roomno)) ||      
        Number(roomno) <= 0                       
        ) {
        errors.push("Room number must be a positive integer string");
    }

    // Phone validation
    if (
        !phone ||
        typeof phone !== "string" ||
        !/^\d{10}$/.test(phone)
    ) {
        errors.push("Phone must be a string of exactly 10 digits");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};
