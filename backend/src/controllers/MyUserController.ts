import express,{ NextFunction, Request,Response} from "express";
import User from "../models/user.model";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser =async(req: Request, res:Response)=>{
  try {
    const { name,roomno,hostel,phone } = req.body;
    const existingUser = await User.findOne({ _id:req.userId });

    if(!existingUser){
      return res.status(404).json({message:"User not found"});
    }

    existingUser.name=name;
    existingUser.roomno=roomno;
    existingUser.hostel=hostel;
    existingUser.phone=phone;

    await existingUser.save();

    res.send(existingUser);    
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
}

const getCurrentUser = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const existingUser = await User.findOne({ _id:req.userId });
    if(!existingUser){
      return res.status(404).json({message:"user not found"});
    }
    res.json(existingUser);

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Something went wrong in getting current user"})
    
  }
}

export default {createCurrentUser,updateCurrentUser,getCurrentUser};