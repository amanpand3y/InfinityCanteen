import mongoose, { InferSchemaType } from "mongoose";

const menuItemSchema = new mongoose.Schema({
    _Id: {type: mongoose.Schema.Types.ObjectId,required:true,default: ()=> new mongoose.Types.ObjectId(),},
    name: {type:String,required:true},
    price: {type:Number,required:true},
});

export type MenuItemsType = InferSchemaType<typeof menuItemSchema>;

const restaurantSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    restaurantName: {type:String,required:true},
    collegeCity: {type:String,required: true},
    deliveryPrice: {type:Number,required: true},
    estimatedDeliveryTime: {type: Number,required:true},
    dishes: [{type:String,required:true}],
    menuItems: [menuItemSchema],
    imageUrl: {type:String,required:true},
    lastUpdated: {type:Date,required:true},
    phone:{type: String,required:true},
});

const Restaurant= mongoose.model("Restaurant",restaurantSchema);
export default Restaurant;