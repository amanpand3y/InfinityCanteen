import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.find({ user: req.userId });

    if (existingRestaurant.length > 0) {
      return res.status(409).json({ message: "User's restaurant already exists" });
    }

    const image = req.file as Express.Multer.File;

    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user= new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated=new Date();
    await restaurant.save();

    res.status(201).json(restaurant);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {createMyRestaurant};
