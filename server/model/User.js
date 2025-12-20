import mongoose from "mongoose";


const UserSignup = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    mobile:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
    }
   
}, {timeStamps: true})

export default mongoose.model("User", UserSignup);