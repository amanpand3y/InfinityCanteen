import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyRestaurantRequest } from "../middlewares/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits: {
        fileSize: 5*1024*1024 //5mb
    }
})

router.post("/",upload.single("imageFile"),validateMyRestaurantRequest,jwtCheck,jwtParse,MyRestaurantController.createMyRestaurant);

router.get("/",jwtCheck,jwtParse,MyRestaurantController.getMyRestaurant);

router.put("/",upload.single("imageFile"),validateMyRestaurantRequest,jwtCheck,jwtParse,MyRestaurantController.updateMyRestaurant);

export default router;