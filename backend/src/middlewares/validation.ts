import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),

  body("hostel").isString().notEmpty().withMessage("Hostel must be a string"),

  body("college").isString().notEmpty().withMessage("College Name must be a string"),

  body("roomno")
    .isString().withMessage("Room number must be a string")
    .custom(value => {
      const num = Number(value);
      if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
        throw new Error("Room number must be a positive integer string");
      }
      return true;
    }),

  body("phone")
    .isString()
    .matches(/^\d{10}$/)
    .withMessage("Phone must be a string of exactly 10 digits"),

  handleValidationErrors,
];


export const validateMyRestaurantRequest = [
  body("restaurantName").isString().notEmpty().withMessage("Restaurant Name is required"),

  body("collegeCity").isString().notEmpty().withMessage("College City is required"),

  body("phone")
    .isString()
    .matches(/^\d{10}$/)
    .withMessage("Phone must be a string of exactly 10 digits"),

  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price must be a non-negative number"),

  body("estimatedDeliveryTime")
    .isFloat({ min: 1 })
    .withMessage("Estimated Delivery Time must be a positive number"),

  body("dishes")
    .isArray({ min: 1 })
    .withMessage("Dishes must be a non-empty array"),

  body("menuItems")
    .isArray({ min: 1 })
    .withMessage("Menu Items must be a non-empty array"),

  body("menuItems.*.name")
    .isString()
    .notEmpty()
    .withMessage("Each menu item must have a name"),

  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Each menu item must have a non-negative price"),

  handleValidationErrors,
];
