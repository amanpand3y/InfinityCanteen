import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name:{
        type: String,
    },
    hostel:{
        type: String,
    },
    roomno :{
        type: Number,
    },
    phone:{
        type: String,
    }
})

const User=mongoose.model("User",userSchema);
export default User;