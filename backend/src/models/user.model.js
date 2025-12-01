import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName :{
        typeof: String
    },
    lastName :{
        typeof: String 
    },
    emailId :{
        typeof: String 
    },
    password :{
        typeof: String 
    },
    age :{
        typeof: Number
    },
    gender :{
        typeof: String 
    }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;