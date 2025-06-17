import { Request, Response, NextFunction } from "express";

export const validateMyUserRequest = (req: Request, res: Response, next: NextFunction) => {
    const { name, hostel, roomno, phone,college } = req.body;
    
    const errors: string[] = [];
    if (!name || typeof name !== "string") {
        errors.push("Name must be a string");
    }

    if (!hostel || typeof hostel !== "string") {
        errors.push("Hostel must be a string");
    }
    if (!college || typeof college !== "string") {
        errors.push("College Name must be a string");
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

export const validateMyRestaurantRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {restaurantName,collegeCity,deliveryPrice,estimatedDeliveryTime,imageUrl,dishes,menuItems,} = req.body;

  const errors: string[] = [];

  if (!restaurantName || typeof restaurantName !== "string") {
    errors.push("Restaurant Name must be a string");
  }

  if (!collegeCity || typeof collegeCity !== "string") {
    errors.push("College City must be a string");
  }

  if (
    deliveryPrice === undefined ||
    typeof deliveryPrice !== "number" ||
    deliveryPrice < 0
  ) {
    errors.push("Delivery Price must be a non-negative number");
  }

  if (
    estimatedDeliveryTime === undefined ||
    typeof estimatedDeliveryTime !== "number" ||
    estimatedDeliveryTime <= 0
  ) {
    errors.push("Estimated Delivery Time must be a positive number");
  }

  if (!imageUrl || typeof imageUrl !== "string") {
    errors.push("Image URL must be a string");
  }

  if (!Array.isArray(dishes) || dishes.length === 0) {
    errors.push("Dishes must be a non-empty array");
  }

  if (!Array.isArray(menuItems) || menuItems.length === 0) {
    errors.push("Menu Items must be a non-empty array");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};
