import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get("/:restaurantId",param("restaurantId").isString().trim().notEmpty().withMessage("RestaurantId parameter must be a valid string"),RestaurantController.getRestaurant);

router.get(
  "/search/:collegeCity",
  param("collegeCity")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
    RestaurantController.searchRestaurant
);

export default router;