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
        type: String,
    },
    phone:{
        type: String,
    },
    college: {
        type: String,
    }
})

const User=mongoose.model("User",userSchema);
export default User;