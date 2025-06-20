import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

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