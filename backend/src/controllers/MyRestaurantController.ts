import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async (req:Request,res:Response)=> {
  try {
    const restaurant = await Restaurant.findOne({user:req.userId});

    if(!restaurant){
      res.status(404).json({message: "No Restaurant with this User ID"})
      return;
    }
    
    res.json(restaurant);
    
  } catch (error) {
    console.log("error",error);
    res.status(500).json({message: "Error Fetching Restaurant xx"})   
  }
}

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.find({ user: req.userId });

    if (existingRestaurant.length > 0) {
      return res.status(409).json({ message: "User's restaurant already exists" });
    }

    const imageUrl = await uplaodImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user= new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated=new Date();
    await restaurant.save();

    res.status(201).json(restaurant);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyRestaurant = async (req:Request,res:Response)=>{
  try {
    const restaurant = await Restaurant.findOne({user:req.userId});
    
    if(!restaurant){
      return res.status(404).json({message:"restaurant not found"});
    }

    restaurant.restaurantName= req.body.restaurantName;
    restaurant.collegeCity=req.body.collegeCity;
    restaurant.phone=req.body.phone;
    restaurant.deliveryPrice=req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime=req.body.estimatedDeliveryTime;
    restaurant.dishes=req.body.dishes;
    restaurant.menuItems=req.body.menuItems;
    restaurant.lastUpdated=new Date();

    if(req.file){
      const imageUrl = await uplaodImage(req.file as Express.Multer.File);
      restaurant.imageUrl=imageUrl;
    }

    await restaurant.save;
    res.status(200).json(restaurant);

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong updating the Restaurant"})
    
  }
}

const uplaodImage = async(file: Express.Multer.File) => {
  const image=file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI= `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.uploader.upload(dataURI);

  return uploadResponse.url;
}

export default {
  getMyRestaurant,
  createMyRestaurant,
  updateMyRestaurant
};
